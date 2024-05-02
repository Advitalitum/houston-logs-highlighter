# houston-logs-highlighter

## Что делает

Браузерное расширение которое раскрашивает логи в Хьюстоне и LogSearchApi с помощью регулярных выражений.

<a href="https://staff.skbkontur.ru/api/images/uurcynp7/houston-logs-highlighter.png" target="_blank">Пример раскраски</a> (нужен доступ в  Стафф)

Работает только для страниц
- `https://houston.kontur.host/api/logs/*`
- `https://api.kontur.ru/logsearchapi/*out=plain*`
- `https://api.testkontur.ru/logsearchapi/*out=plain*`

## Установка

1. Скачать [src.zip](https://github.com/Advitalitum/houston-logs-highlighter/releases/download/v0.0.0.1/src.7z) или репозиторий себе на компьютер
2. Распаковать архив если качали src.zip
3. Зайти в расширения браузера
4. Включить режим разработчика
5. Нажать "Загрузить распакованное расширение" и выбрать папку (src) внутри которой лежит файл manifest.json и другие файлы
6. Выключить режим разработчика если хочется
7. Вы великолепны
   
## Настройка

Настройка регулярок и цветов происходит в опциях расширения.

<img src="options_button.png" alt="Кнопка настроек расширения" width="600">


На странице настроек можно добавлять новые регулярки и цвет в который будет окрашен текст соответствующий регулярке.

При изменении настроек расширение будет их автоматически сохранены (сохранение раз в секунду), расширение подхватит их и перекрасит логи заново.

Невалидные регулярки будут подсвечены, для раскраски они не будут использоваться.

<img src="options.png" alt="Настройка регулярок" width="1200">
