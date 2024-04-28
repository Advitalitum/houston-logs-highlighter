import * as utils from '/utils.js';
const marginElement = element => element.style.margin = '10px';
const form = document.querySelector('form');
const list = document.querySelector('div');

const resetButton = document.getElementById('resetButton');
resetButton.class = "reset-button";
resetButton.style.fontSize = 'medium';

resetButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (confirm('Reset to defaults?')) {
        const list = document.querySelector('div');
        list.textContent = '';
        RenderOptions(utils.defaultOptions);
    }

});

marginElement(list);

const saveOptions = async () => {
    const list = document.querySelector('div');
    const options = {};

    list.childNodes.forEach(listItem => {
        const name = listItem.getElementsByTagName("input")[0].value;
        const regEx = listItem.getElementsByTagName("input")[1].value;
        const color = listItem.getElementsByTagName("input")[2].value;

        options[name] = [regEx, color];
    });

    await utils.saveOptionsToStorage(options);
};

const defaultOptions = utils.defaultOptions;

Object.keys(defaultOptions).forEach(function (key, index) {
    const current = defaultOptions[key];
    const regExpString = current[0];

    defaultOptions[key] = ['/' + regExpString.source + '/' + regExpString.flags, current[1]];
});

const optionsFromStorage = await utils.getOptionsFromStorage();

const options = optionsFromStorage || defaultOptions;

RenderOptions(options);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.querySelector('form');
    const name = form.getElementsByTagName("input")[0].value;
    const regExString = form.getElementsByTagName("input")[1].value;
    const color = form.getElementsByTagName("input")[2].value;

    addToList(name, regExString, color);
});

setInterval(async function () {
    try {
        await saveOptions();
    } catch (e) {
        console.log(e);
    }
}, 1000);

function RenderOptions(options) {
    for (var optionName of Object.keys(options).sort()) {
        const optionData = options[optionName];
        const regExpString = optionData[0];
        const color = optionData[1];

        addToList(optionName, regExpString, color);
    };
}

function addToList(optionName, regExp, color) {
    const list = document.querySelector('div');
    const li = document.createElement('div');
    marginElement(li);

    const nameInput = document.createElement('input');
    nameInput.value = optionName;
    nameInput.required = true;
    nameInput.class = 'name';
    nameInput.style.fontSize = 'medium';
    nameInput.style.width = '20%';
    nameInput.style.color = color;

    const regExLabel = document.createElement('label');
    const [isValid, errorMessage] = utils.validateRegExpString(regExp);
    setRegExpLabelTextAndColor(isValid);

    const regExpInput = document.createElement('input');
    regExpInput.value = regExp;
    regExpInput.required = true;
    regExpInput.class = 'regex';
    regExpInput.style.fontSize = 'medium';
    regExpInput.style.width = '50%';
    regExpInput.style.color = color;
    regExpInput.setCustomValidity(errorMessage);
    regExpInput.oninput = async () => {
        regExpInput.value = utils.getFixedRegExp(regExpInput.value);
        const [isValid, errorMessage] = utils.validateRegExpString(regExpInput.value);        
        setRegExpLabelTextAndColor(isValid);
        regExpInput.setCustomValidity(errorMessage);
        regExpInput.reportValidity();
    };

    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Color:';

    const colorInput = document.createElement('input');
    colorInput.required = true;
    colorInput.type = 'color';
    colorInput.class = 'color';
    colorInput.value = color;
    colorInput.oninput = async event => {
        event.preventDefault();
        regExpInput.style.color = event.target.value;
        nameInput.style.color = event.target.value;
    };

    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode("Delete"))
    deleteButton.class = "delete-button";
    deleteButton.style.fontSize = 'medium';


    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const li = event.target.parentElement;

        if (confirm('Delete element?')) {
            li.remove();
        }
    });

    marginElement(nameInput);
    marginElement(regExLabel);
    marginElement(regExpInput);
    marginElement(colorLabel);
    marginElement(colorInput);
    marginElement(deleteButton);

    li.appendChild(nameInput);
    li.appendChild(regExLabel);
    li.appendChild(regExpInput);
    li.appendChild(colorLabel);
    li.appendChild(colorInput);
    li.appendChild(deleteButton);

    list.appendChild(li);
    regExpInput.reportValidity();

    function setRegExpLabelTextAndColor(isValid) {
        regExLabel.textContent = isValid ? 'RegEx (valid):' : 'RegEx (invalid)';
        regExLabel.style.color = isValid ? '' : 'red';
    }
}