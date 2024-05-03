const slightlyVisibleColor = '#404040';
const storage = chrome.storage && (chrome.storage.sync || chrome.storage.local);
const storageKey = "houston_highlighter_options";

export const defaultOptions = {
    "connection_info": [/\[ConnectionId[^\]]*\]/gm, slightlyVisibleColor],
    "debug": [/\s(DEBUG)\s/gm, "#808080"],
    "error": [/\s(ERROR|FATAL)\s/gm, "#FF0000"],
    "instance_info": [/^\[[^\]]*\]/gm, "#808080"],
    "request_id": [/RequestId:[^\]]+/gm, slightlyVisibleColor],
    "request_path": [/\[RequestPath:[^\]]*\]/gm, "#7C4493"],
    "timestamp": [/\s*\d{4}\-\d{2}\-\d{2}\s\d{2}\:\d{2}\:\d{2}\,\d{3}/gm, "#7bb9b9"],
    "trace-id": [/\[T\-[^\]]*\]/gm, "#407fbf"],
    "warn": [/\s(WARN)\s/gm, "#FFFF00"],
    "line": [/\w+\.cs\:line\s\d+/gm, "#006EFF"],
    "at_skbkontur": [/at\sSKBKontur.*/gm, "#5FB979"],
    "200": [/200\s\(\'Ok\'\)/gm, "#04FF00"],
    "500": [/500\s\(\'InternalServerError\'\)/gm, "#FF0000"],
    "400": [/400\s\(\'BadRequest\'\)/gm, "#FFFF00"],
    "sending_request" : [/Sending request.*$/gm, "#4E94B7"],
    "request_result" : [/Result: replica.*$/gm, "#3DBDAE"],
};

export async function getOptionsFromStorage() {
    const obj = await storage.get();
    return obj[storageKey];
}

export async function saveOptionsToStorage(options) {
    const obj = {};
    obj[storageKey] = options;

    await storage.set(obj);
};

export function stringToRegex(regExpString) {
    const pattern = regExpString.slice(1, regExpString.lastIndexOf('/'));
    const flags = regExpString.slice(regExpString.lastIndexOf('/') + 1);
    return new RegExp(pattern, flags);
};

export function getFixedRegExp(regExpString) {
    let result = regExpString;
    // if (!regExpString || !(typeof regExpString === 'string' || regExpString instanceof String)) {
    //     return '//g';
    // }

    // if (!regExpString.startsWith('/')) {
    //     result = '/' + result;
    // }

    // if (result.lastIndexOf('/') < 1) {
    //     result = result + '/';
    // }

    // let flags = result.slice(result.lastIndexOf('/') + 1);
    // if (!flags.includes('g')) {
    //     result = result + 'g';
    // }

    return result;
};

export function validateRegExpString(regExpString) {
    if (!regExpString || !(typeof regExpString === 'string' || regExpString instanceof String)) {
        return [false, 'Input value is not string'];
    }

    if (!regExpString.startsWith('/')) {
        return [false, 'RegExp must start with \/'];
    }

    const pattern = regExpString.slice(1, regExpString.lastIndexOf('/'));
    const flags = regExpString.slice(regExpString.lastIndexOf('/') + 1);

    if (!flags.includes('g')) {
        return [false, 'RegExp must have g flag'];
    }

    if (regExpString == '//g') {
        return [false, 'Empty RegExp'];
    }

    let isValid = true;
    let errorMessage = '';

    try {
        new RegExp(pattern, flags);
    } catch (e) {
        isValid = false;
        errorMessage = e.name + ': ' + e.message;
    }
    return [isValid, errorMessage];
}