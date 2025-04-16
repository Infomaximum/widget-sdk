# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.13.0](https://github.com/Infomaximum/widget-sdk/compare/v5.12.1...v5.13.0) (2025-04-16)


### Features

* удалены интефейсы расширенных настроек, добавлено поле paddings в интерфейс базовых настроек виджетов ([d704c81](https://github.com/Infomaximum/widget-sdk/commit/d704c81aa3dbf21d62b74580c654ffd08de17907))

### [5.12.1](https://github.com/Infomaximum/widget-sdk/compare/v5.12.0...v5.12.1) (2025-04-11)

## [5.12.0](https://github.com/Infomaximum/widget-sdk/compare/v5.11.1...v5.12.0) (2025-04-11)


### Features

* добавлена возможность кастомизировать набор форматов для разрезов и мер ([3451242](https://github.com/Infomaximum/widget-sdk/commit/345124227c09b53d824b9cb632b47e850ac85913))

### [5.11.1](https://github.com/Infomaximum/widget-sdk/compare/v5.11.0...v5.11.1) (2025-04-01)


### Bug Fixes

* для фильтра в режиме в/не в диапозоне, реализована подмена dataType c INTEGER на FLOAT ([5cccb69](https://github.com/Infomaximum/widget-sdk/commit/5cccb695c72a39bb594b0c5899fb92aa387b080c))
* поведение строкового фильтра по формуле приведено к поведению условия отображения ([72611bc](https://github.com/Infomaximum/widget-sdk/commit/72611bc54ebecc1402160cc876aa3252800ad218))

## [5.11.0](https://github.com/Infomaximum/widget-sdk/compare/v5.10.1...v5.11.0) (2025-03-28)


### Features

* в EFormatTypes добавлен новый тип PERCENT, удалено подкапотное умножение меры конверсия на 100 ([21a8f98](https://github.com/Infomaximum/widget-sdk/commit/21a8f9847d54992771f47abd792bd394cd013841))
* в getDefaultSortOrders добавлена проверка на наличии формулы ([85b2b59](https://github.com/Infomaximum/widget-sdk/commit/85b2b590c2e28e0cb52ceb473200c3ee5a1b6d6b))
* добавлена outerAggregation top ([0550463](https://github.com/Infomaximum/widget-sdk/commit/0550463375bc0e5b1abb2559a6da41a43cc2adb0))

### [5.10.1](https://github.com/Infomaximum/widget-sdk/compare/v5.10.0...v5.10.1) (2025-03-21)

## [5.10.0](https://github.com/Infomaximum/widget-sdk/compare/v5.9.1...v5.10.0) (2025-03-14)


### Features

* поле updateDashboard для запуска скрипта изменено с boolean на ERefreshAfterExecutionMode ([812fc42](https://github.com/Infomaximum/widget-sdk/commit/812fc423f999d89b899ff15abc6bc0c5153e6d5c))
* режим фильтрации MULTI помечен как deprecated ([ca06f1a](https://github.com/Infomaximum/widget-sdk/commit/ca06f1a45f09ecfe363a945d8c5961d9888f65ef))

### [5.9.1](https://github.com/Infomaximum/widget-sdk/compare/v5.9.0...v5.9.1) (2025-03-11)


### Bug Fixes

* исправлена генерация формулы меры для шаблона "Длительность" ([002562f](https://github.com/Infomaximum/widget-sdk/commit/002562f6714009464cda884b54cec97f99a0a038))

## [5.9.0](https://github.com/Infomaximum/widget-sdk/compare/v5.8.0...v5.9.0) (2025-03-03)


### Features

* добавлены шаблоны для процессных разрезов ([452af57](https://github.com/Infomaximum/widget-sdk/commit/452af57627cb34a92a6354f562d878926f443d0e))

## [5.8.0](https://github.com/Infomaximum/widget-sdk/compare/v5.7.1...v5.8.0) (2025-02-28)


### Features

* реализована возможность использовать фильтры событий для влияния на отображаемый контент в окне процессного фильтра. ([d2ccaca](https://github.com/Infomaximum/widget-sdk/commit/d2ccaca4d3a72a82f38e5773d96797b86e328527))

### [5.7.1](https://github.com/Infomaximum/widget-sdk/compare/v5.7.0...v5.7.1) (2025-02-25)


### Bug Fixes

* изменен передаваемый элемент для контекстного меню ([0edb142](https://github.com/Infomaximum/widget-sdk/commit/0edb142dc1641165a17f1ed52c7efa56801b05fc))

## [5.7.0](https://github.com/Infomaximum/widget-sdk/compare/v5.6.0...v5.7.0) (2025-02-20)


### Features

* изменено название поля с caseIdFormula в caseCaseIdFormula в режиме AGGREGATION ([44f9b9d](https://github.com/Infomaximum/widget-sdk/commit/44f9b9d965bc9548864938a2f399174de5412932))

## [5.6.0](https://github.com/Infomaximum/widget-sdk/compare/v5.5.0...v5.6.0) (2025-02-20)


### Features

* добавлен интерфейс ICollapseRecord ([3f4f926](https://github.com/Infomaximum/widget-sdk/commit/3f4f926b0ddb544b91a19b8e55ea4349f1e5c16c))

## [5.5.0](https://github.com/Infomaximum/widget-sdk/compare/v5.4.16...v5.5.0) (2025-02-20)


### Features

* во ViewContext добавлены фильтры образа ([b916db7](https://github.com/Infomaximum/widget-sdk/commit/b916db74921f7f46ca71e7984c30483e463a37c8))

### [5.4.16](https://github.com/Infomaximum/widget-sdk/compare/v5.4.15...v5.4.16) (2025-02-19)

### [5.4.15](https://github.com/Infomaximum/widget-sdk/compare/v5.4.14...v5.4.15) (2025-02-19)

### [5.4.14](https://github.com/Infomaximum/widget-sdk/compare/v5.4.13...v5.4.14) (2025-02-19)

### [5.4.13](https://github.com/Infomaximum/widget-sdk/compare/v5.4.12...v5.4.13) (2025-02-19)

### [5.4.12](https://github.com/Infomaximum/widget-sdk/compare/v5.4.11...v5.4.12) (2025-02-19)

### [5.4.11](https://github.com/Infomaximum/widget-sdk/compare/v5.4.10...v5.4.11) (2025-02-19)

### [5.4.10](https://github.com/Infomaximum/widget-sdk/compare/v5.4.9...v5.4.10) (2025-02-19)

### [5.4.9](https://github.com/Infomaximum/widget-sdk/compare/v5.4.8...v5.4.9) (2025-02-19)

### [5.4.8](https://github.com/Infomaximum/widget-sdk/compare/v5.4.7...v5.4.8) (2025-02-19)

### [5.4.7](https://github.com/Infomaximum/widget-sdk/compare/v5.4.6...v5.4.7) (2025-02-19)

### [5.4.6](https://github.com/Infomaximum/widget-sdk/compare/v5.4.5...v5.4.6) (2025-02-19)

### [5.4.5](https://github.com/Infomaximum/widget-sdk/compare/v5.4.4...v5.4.5) (2025-02-19)

### [5.4.4](https://github.com/Infomaximum/widget-sdk/compare/v5.4.3...v5.4.4) (2025-02-19)

### [5.4.3](https://github.com/Infomaximum/widget-sdk/compare/v5.4.2...v5.4.3) (2025-02-19)

### [5.4.2](https://github.com/Infomaximum/widget-sdk/compare/v5.4.1...v5.4.2) (2025-02-19)

### [5.4.1](https://github.com/Infomaximum/widget-sdk/compare/v5.4.0...v5.4.1) (2025-02-19)

## [5.4.0](https://github.com/Infomaximum/widget-sdk/compare/v5.3.0...v5.4.0) (2025-02-18)


### Features

* Добавлены типы и интерфейсы для процессных мер, добавлена функция конвертации фильтров в строку, добавлены утилитарные функции для формул ([9a3a6ed](https://github.com/Infomaximum/widget-sdk/commit/9a3a6edaf16f65fcd16c1e82fb1f387328848967))

## [5.3.0](https://github.com/Infomaximum/widget-sdk/compare/v5.2.0...v5.3.0) (2025-02-14)


### Features

* поле options переменной статический список помечено deprecated, добавлено поле labeledOptions ([264cff2](https://github.com/Infomaximum/widget-sdk/commit/264cff22c42819ff5829d6f53484d9df58993443))

## [5.2.0](https://github.com/Infomaximum/widget-sdk/compare/v5.1.0...v5.2.0) (2025-02-11)


### Features

* поле blockingCondition расширено модом по формуле и по переменной ([47fee53](https://github.com/Infomaximum/widget-sdk/commit/47fee53602c5c14efd5a3caeebeec1673aedce9d))
* TActionOnClickParameter расширен новыми способами ввода ([3216938](https://github.com/Infomaximum/widget-sdk/commit/3216938ebd29a35e59ae83688e1829d94a7236b3))

## [5.1.0](https://github.com/Infomaximum/widget-sdk/compare/v5.0.0...v5.1.0) (2025-01-24)


### Features

* Добавлен новый способ ввода по агрегации ([b4bffeb](https://github.com/Infomaximum/widget-sdk/commit/b4bffeb1a43029daac1d957781ee97ec83a8f578))


### Bug Fixes

* исправлено соответствие версии sdk и версии системы ([a2fc9e7](https://github.com/Infomaximum/widget-sdk/commit/a2fc9e78398f5abb4515cbeb311f44f682c6c233))

## [5.0.0](https://github.com/Infomaximum/widget-sdk/compare/v4.13.0...v5.0.0) (2025-01-16)


### ⚠ BREAKING CHANGES

* перемещены поля displayMode и filtrationMode из IGlobalContext на уровень IWidgetProps и переименованы filtrationMode в filtrationAccessibility, т.к. именование filtrationMode внутри IGlobalContext и внутри IPanelDescription обозначает разные вещи
* удален deprecated интерфейс TSelectFetchOptions
* удалены из EFormulaFilterFieldKeys поля number и duration
* удалены isConfigured и setConfigured из плейсхолдера виджета, вместо него нужно использовать isDisplay
* удалены условия отображения
* типы ESimpleDataType заменены на точные типы ClickHouse

### Features

* добавлен 3-й аргумент в IFillSettings с предыдущими настройками ([4e3c966](https://github.com/Infomaximum/widget-sdk/commit/4e3c966ff1c639fa3fe450c852cf1501b35cf5d5))
* добавлен необязательный метод getInitialSettings в интерфейс IDefinition, позволяющий получить шаблон настроек виджета, заданный пользователем ([81dba40](https://github.com/Infomaximum/widget-sdk/commit/81dba40b0eb731c1fa484e8852628356d5250838))
* добавлен новый тип переменной отчета "Список колонок" ([1feed0d](https://github.com/Infomaximum/widget-sdk/commit/1feed0df64570d10f2f724f48ae88dd71ce42844))
* добавлен экспорт типа TColorBase ([8603d04](https://github.com/Infomaximum/widget-sdk/commit/8603d047f2aee955a5a636e20d26f140f040c696))
* добавлено 2-й параметр с индексом индикатора ([ca23b79](https://github.com/Infomaximum/widget-sdk/commit/ca23b79307b5a973939f00f426e165c098bcc1e3))
* добавлено поле dbDataType в сортировки ([9ae797e](https://github.com/Infomaximum/widget-sdk/commit/9ae797e16af0caa40cc138fa5c8c4bba3fbbd74c))
* значения в TColumnIndicatorValue сделаны не обязательными ([a765774](https://github.com/Infomaximum/widget-sdk/commit/a765774ad0ee3e42ea4bc787ca286cf08bef6060))
* изменена типизация ISelectLeafOption.onSelect ([61bfbab](https://github.com/Infomaximum/widget-sdk/commit/61bfbabb4595039c05b5a196fd940cd41a773cf3))
* обобщенные типы ESimpleDataType заменены на точные типы ClickHouse ([8a8dc85](https://github.com/Infomaximum/widget-sdk/commit/8a8dc8547002c6562e6bb31bc92b142a6b60b93a))
* перемещены поля в IWidgetProps ([eba535d](https://github.com/Infomaximum/widget-sdk/commit/eba535df7545998b39c0fe4eb4442e30e17c0675))
* произведен отказ от условия отображения виджетов ([dc80e70](https://github.com/Infomaximum/widget-sdk/commit/dc80e701dc772388f664f07567d43a849f2368d6))
* расширен тип значения фильтров по формуле, получаемых виджетом, с IFormulaFilterValue до TExtendedFormulaFilterValue ([56608d3](https://github.com/Infomaximum/widget-sdk/commit/56608d3a534adc561bad77ce814d7123769c4f96))
* удален deprecated интерфейс ([f5d1d04](https://github.com/Infomaximum/widget-sdk/commit/f5d1d043768603c84fd70e3a511ffcd61c017b31))
* удалено ставшее избыточным состояние isConfigured из плейсхолдера виджета ([e105b8b](https://github.com/Infomaximum/widget-sdk/commit/e105b8b74892100d40d80745aacd3077801e7350))
* удалены number и duration ([8fca4cc](https://github.com/Infomaximum/widget-sdk/commit/8fca4ccd041e86ae9f64394122b903e3980ab33b))

## [4.13.0](https://github.com/Infomaximum/widget-sdk/compare/v4.11.1...v4.13.0) (2024-12-16)

## [4.12.0](https://github.com/Infomaximum/widget-sdk/compare/v4.11.0...v4.12.0) (2024-12-12)


### Features

* добавлены системные и локальные миграции виджетов ([6f2a1ec](https://github.com/Infomaximum/widget-sdk/commit/6f2a1ecd4bb04a425454699af05363e49e56f68f))

## [4.12.0](https://github.com/Infomaximum/widget-sdk/compare/v4.11.0...v4.12.0) (2024-12-12)


### Features

* добавлены системные и локальные миграции виджетов ([6f2a1ec](https://github.com/Infomaximum/widget-sdk/commit/6f2a1ecd4bb04a425454699af05363e49e56f68f))

## [4.11.0](https://github.com/Infomaximum/widget-sdk/compare/v4.10.0...v4.11.0) (2024-12-04)


### Features

* formValues и checkedValues сделаны не обязательными параметрами, убрано поле filters из настроек actions ([82e4757](https://github.com/Infomaximum/widget-sdk/commit/82e4757e68389e669e9d7afe71f32c66766966c4))

## [4.10.0](https://github.com/Infomaximum/widget-sdk/compare/v4.9.0...v4.10.0) (2024-11-27)


### Features

* TLaunchActionParams расширен методом resetAndHandleModalData ([9ef080e](https://github.com/Infomaximum/widget-sdk/commit/9ef080e1c33829ce1e593ca8b2d44bdd74e176a5))

## [4.9.0](https://github.com/Infomaximum/widget-sdk/compare/v4.8.0...v4.9.0) (2024-11-27)


### Features

* добавлено значение по умолчанию для способа ввода "Ввести вручную", переделано формирование Статического списка на yaml, добавлено поле "Отображаемый список" для способа ввода "Динамический список" ([79dda0e](https://github.com/Infomaximum/widget-sdk/commit/79dda0e7bb2269fa1390a7366cf66b2ac35f4772))

## [4.8.0](https://github.com/Infomaximum/widget-sdk/compare/v4.7.0...v4.8.0) (2024-11-22)


### Features

* добавлена возможность поиска по опциям селекта ([fa2f8d2](https://github.com/Infomaximum/widget-sdk/commit/fa2f8d2def24c8b177769a7da3b4b2f59fd0aabd))

## [4.7.0](https://github.com/Infomaximum/widget-sdk/compare/v4.6.0...v4.7.0) (2024-11-21)


### Features

* добавлена возможность фильтровать разрезы и их шаблоны по типу данных ([aa83999](https://github.com/Infomaximum/widget-sdk/commit/aa839990eb02367b7a8382c2d6ba8e2992b68d9c))

## [4.6.0](https://github.com/Infomaximum/widget-sdk/compare/v4.5.0...v4.6.0) (2024-11-20)


### Features

* Добавлено поле isValueShared для типа пользовательских переменных ([6e9137d](https://github.com/Infomaximum/widget-sdk/commit/6e9137d1962e60b573e86f9ae49ec0183fefa58f))

## [4.5.0](https://github.com/Infomaximum/widget-sdk/compare/v4.4.1...v4.5.0) (2024-11-14)


### Features

* добавлена палитра системных цветов и метод получения цвета. В IWidgetAction добавлены поля для окрашивания кнопок запуска ([f0fdedd](https://github.com/Infomaximum/widget-sdk/commit/f0fdedd0a1e8651737f0661c1637e990eac90e65))

### [4.4.1](https://github.com/Infomaximum/widget-sdk/compare/v4.4.0...v4.4.1) (2024-11-13)

## [4.4.0](https://github.com/Infomaximum/widget-sdk/compare/v4.3.1...v4.4.0) (2024-11-12)


### Features

* переработан интерфейс расширенных настроек виджетов ([cd82b1f](https://github.com/Infomaximum/widget-sdk/commit/cd82b1f17ac56bf39eb04e43f98c531c8eeaf083))

### [4.3.1](https://github.com/Infomaximum/widget-sdk/compare/v4.3.0...v4.3.1) (2024-11-05)


### Bug Fixes

* sdk_version не обязательно может быть указан в манифесте ([1d7c0a9](https://github.com/Infomaximum/widget-sdk/commit/1d7c0a976bef736ff98be2c07f457edd3bc6d46d))

## [4.3.0](https://github.com/Infomaximum/widget-sdk/compare/v4.2.1...v4.3.0) (2024-11-05)


### Features

* добавлено поле blockingCondition для IWidgetAction ([bbc05ef](https://github.com/Infomaximum/widget-sdk/commit/bbc05ef0eb14eb9612498abc29d587928b2dbbc8))
* упрощен метод mapSortingToInputs, добавлен фасад prepareSortOrders ([0fb7a2a](https://github.com/Infomaximum/widget-sdk/commit/0fb7a2ae04ab3da1ecfb96876aeaa5fe9ee116d0))

### [4.2.1](https://github.com/Infomaximum/widget-sdk/compare/v4.2.0...v4.2.1) (2024-11-02)

## [4.2.0](https://github.com/Infomaximum/widget-sdk/compare/v4.1.0...v4.2.0) (2024-10-29)


### Features

* добавлен новый mode "EMPTY" для открытия образа в плейсхолдере ([acfbe2d](https://github.com/Infomaximum/widget-sdk/commit/acfbe2dd63f508652ae5069572cf5207c87c5156))
* isExecuteScriptActionValid вынесена в систему. Функция валидации действий по клику добавлена в пропсы виджет ([0edc460](https://github.com/Infomaximum/widget-sdk/commit/0edc46014f65a4637bb7fac49f62f996f9ed4f5e))

## [4.1.0](https://github.com/Infomaximum/widget-sdk/compare/v4.0.0...v4.1.0) (2024-10-17)


### Features

*  добавлен новый контрол "formatting", добавлен конфиг с форматированием "formattingConfig", вынесен ключ системного поля "formatting" в ESystemRecordKey ([89ee974](https://github.com/Infomaximum/widget-sdk/commit/89ee974f786232ad30b0bf73b6f13289c153afdf))

## [4.0.0](https://github.com/Infomaximum/widget-sdk/compare/v3.40.2...v4.0.0) (2024-10-03)


### ⚠ BREAKING CHANGES

* изменено поле интерфейса
* требуется поддержка в виджетах
* изменена структура настроек виджетов
* изменена структура настроек виджетов
* изменена структура настроек виджетов
* изменена структура настроек виджетов
* изменена структура настроек виджетов
* удален VARIABLE из EWidgetIndicatorType
* переименованы поля в настройках отвечающие за отображение хедера
* старая версия функции mapFormulaFiltersToInputs не сможет работать с новым форматом фильтров
* функция isActionValid заменена на isExecuteScriptActionValid
* изменен порядок аргументов
* переименовано поле имени переменной (name -> sourceVariable)

### Features

*  добавлено поле tooltip для кастомной кнопки в контекстном меню ([af1dfa6](https://github.com/Infomaximum/widget-sdk/commit/af1dfa610673a68f47b3491dd3729f7bb877f4fe))
*  добавлено поле tooltip для кастомной кнопки в контекстном меню ([1d7d3f2](https://github.com/Infomaximum/widget-sdk/commit/1d7d3f272fdb97a19bd7ca0a3157bd01233e2295))
*  убрано поле onClose из корня конфига меню ([47148e3](https://github.com/Infomaximum/widget-sdk/commit/47148e38c0f7a5d5c6165be8c8ad4ba5d637961b))
* в интерфейс фильтра добавлен флаг isReadonly ([f928d47](https://github.com/Infomaximum/widget-sdk/commit/f928d470260df98222723bf9f3d42b3ac485d8e7))
* в интерфейс IWidgetColumnIndicator добавлено поле 'onclick' ([ce67458](https://github.com/Infomaximum/widget-sdk/commit/ce674580a110b089adb00474f8f9066818891d21))
* в ответ вычислителей добавлен тип данных показателей ([a6fbcd2](https://github.com/Infomaximum/widget-sdk/commit/a6fbcd216da9e1ef021c7b372123211656a7c983))
* в переменные временно добавлен guid для работы миграций ([768fbe6](https://github.com/Infomaximum/widget-sdk/commit/768fbe6e36fe728a00bb2651fae9ba15e1a85db4))
* в скрипт добавлен guid для работы миграций ([db9c8f3](https://github.com/Infomaximum/widget-sdk/commit/db9c8f39ff426ae707b2d1a3492042e9d17434ca))
* В IPanelDescription добавлены поля filtrationRecords и filtrationModes ([fe0f1e6](https://github.com/Infomaximum/widget-sdk/commit/fe0f1e626ab4d01e86998ce5d21fe00087d0bad1))
* в IStagesFilterItem добавлено поле id ([4e84bad](https://github.com/Infomaximum/widget-sdk/commit/4e84bad4987bcc076db05d08debdfceb63058b86))
* в widgetsContext добавлена информация о guid состояний и общих мер ([6b4ccac](https://github.com/Infomaximum/widget-sdk/commit/6b4ccac54820972f20d736f8a0251a43472ee899))
* внесены изменения по итогам ревизии системы перед выпуском 2408 ([b6a48ab](https://github.com/Infomaximum/widget-sdk/commit/b6a48ab7c949f0d1d32678d8bd838a067d8ffdca))
* добавлен метод для установки минимальной высоты рабочей области ([54e0967](https://github.com/Infomaximum/widget-sdk/commit/54e0967fdfa3e70eb991bdba6810963aa4ba50e6))
* добавлен мод EMPTY для плейсхолдеров ([f263e77](https://github.com/Infomaximum/widget-sdk/commit/f263e7798a47fb38147112a9aa9ec7fdb851b2da))
* добавлен параметр formatting для метода getFormattedValue ([b457240](https://github.com/Infomaximum/widget-sdk/commit/b45724048f58c011200a7b03374d5de4b100b888))
* добавлен core-js для запуска тестов при линковке к проекту ([958f1ac](https://github.com/Infomaximum/widget-sdk/commit/958f1aca99312d1f20ef76966e5f752fce91957f))
* добавлен EControlType -> size ([df2408d](https://github.com/Infomaximum/widget-sdk/commit/df2408d664ee4e9697f98167f42d7040c52e2e7a))
* добавлен enum EUnitType ([5cdfac9](https://github.com/Infomaximum/widget-sdk/commit/5cdfac9e0a5b192a7d21267aa1a5a429691fe6f1))
* добавлен viewContext в пропсы виджета ([a4402e3](https://github.com/Infomaximum/widget-sdk/commit/a4402e32fb484e6dbccacd9f3d4a2fa4f9b388de))
* добавлена настройка цвета и жирности заголовка ([c574704](https://github.com/Infomaximum/widget-sdk/commit/c57470443d72febdca3a48b18d411dfc511c5d1c))
* добавлено необязательное поле classCount для типа TColor в режиме градиент ([4b06961](https://github.com/Infomaximum/widget-sdk/commit/4b06961e0411a51647877f49ebe903dd61cfc51b))
* добавлено поле filtrationMode и соответствующий тип в интерфейс IWidgetComntext ([bd5fb42](https://github.com/Infomaximum/widget-sdk/commit/bd5fb426af400769002c74687d658377b67de997))
* добавлено поле marginTop ([496c341](https://github.com/Infomaximum/widget-sdk/commit/496c34158b2dc02d18c99da649bba461793a3703))
* добавлено поле offset для ITwoLimitsCalculatorInput ([a6ce920](https://github.com/Infomaximum/widget-sdk/commit/a6ce9204b2adf1dad036489167321633b4c0ef39))
* добавлены интерфейсы для расширенных настроек ([23bef51](https://github.com/Infomaximum/widget-sdk/commit/23bef51b1d475e1ac4693789720e3d2a357d9fc9))
* добавлены общие разрезы в IWidgetsContext ([d9b537a](https://github.com/Infomaximum/widget-sdk/commit/d9b537a830a4b2f6bef914ec2a0977679354ce5f))
* добавлены ожидаемые поля для действия 'Открытие образа' ([9b9f84d](https://github.com/Infomaximum/widget-sdk/commit/9b9f84decfb89604176a5c260c551a842fafb117))
* добавлены параметры кастомных контейнеров для контекстного меню ([adab413](https://github.com/Infomaximum/widget-sdk/commit/adab41383b7ace396732474c13ccadf695d9914f))
* добавлены системные переменные в GlobalContext и удалены не актуальные интерфейсы ICalculatorVariable, ICalculatorVariablesValues ([a6f43d9](https://github.com/Infomaximum/widget-sdk/commit/a6f43d97e175fe0239b2cf5c7d0a152387ed88ca))
* добавлены системные переменные в GlobalContext и удалены не актуальные интерфейсы ICalculatorVariable, ICalculatorVariablesValues ([8005a3f](https://github.com/Infomaximum/widget-sdk/commit/8005a3fb211a1528526db49b1c74ed4b96ef8d62))
* добавлены типы для контекстного меню виджета ([b7261d8](https://github.com/Infomaximum/widget-sdk/commit/b7261d8f901ad4fc61f9b520a24676bb90a0e93f))
* из вычислителей удален параметр inputVariables ([9f8e2e8](https://github.com/Infomaximum/widget-sdk/commit/9f8e2e81ee856684c33f083327f44e39ebe27e04))
* из settings виджета удалены поля type и apiVersion ([f526c3a](https://github.com/Infomaximum/widget-sdk/commit/f526c3a45d8cb77aa2e9b66ddfae647fae8e70f5))
* изменена структура действий ([92e60ff](https://github.com/Infomaximum/widget-sdk/commit/92e60ff86437f9312d10957dffb2f06a36b08630))
* изменена структура действия, чтобы избежать конфликта поля имени переменной с полем имени входящего значения ([92923f4](https://github.com/Infomaximum/widget-sdk/commit/92923f4a3c61ed27e375e7f9a4f71a9c962cc48f))
* изменена структура yaml для "Действия" и "Запуска действия по клику" ([dac352c](https://github.com/Infomaximum/widget-sdk/commit/dac352c74ee2c3fa52c02aa71840993830b408e6))
* отказ от ILaunchActionSubscribers ([5b91ffd](https://github.com/Infomaximum/widget-sdk/commit/5b91ffd4d6ac77626bd0027046f262ef62e54225))
* переименован заголовок виджета в мета-описании с header на title ([ea080c1](https://github.com/Infomaximum/widget-sdk/commit/ea080c155b40673c321548b1c40ca2b2c517ae70))
* переименована настройка заголовка виджета ([00c1351](https://github.com/Infomaximum/widget-sdk/commit/00c1351ccbc83ea22b3be066e8a0a2542df17992))
* поле viewKeyByName заменено на viewNameByKey в IWidgetsContext ([dd5215a](https://github.com/Infomaximum/widget-sdk/commit/dd5215a916d89e15cda8dcfc591fd59194e0774d))
* расширен интерфейсIGroupSetDescription полями isRemovable isDraggable marginTop ([6defb62](https://github.com/Infomaximum/widget-sdk/commit/6defb62db6ac572a39a202209be7e5bd56a75da4))
* расширен метод launchAction. Теперь он возвращает объект  ILaunchActionSubscribers ([3136e82](https://github.com/Infomaximum/widget-sdk/commit/3136e82f55a8c50cff3039397e305f5a7fc686ad))
* расширен IMeasureMenuConfig ([9b1352c](https://github.com/Infomaximum/widget-sdk/commit/9b1352cda10f701b727316139a9ea62d6c89185b))
* расширена логика валидации необязательных полей скриптов ([db2ef22](https://github.com/Infomaximum/widget-sdk/commit/db2ef22bfeebab792f45f3361505ce0ddfb669fd))
* строковый фильтр переделан в объект ([f5bea85](https://github.com/Infomaximum/widget-sdk/commit/f5bea851b4a3e972972d93e7e914894bb66b2f99))
* удален VARIABLE из EWidgetIndicatorType ([e648405](https://github.com/Infomaximum/widget-sdk/commit/e648405bcb4bfcdeb5d734348681a84d92d8301b))


### Bug Fixes

* исправлен тип для options в IMeasureMenuConfig ([884c900](https://github.com/Infomaximum/widget-sdk/commit/884c9005956be2fc793914ecec1fc1b468e098d7))
* исправлен типы TSelectChildOptions и TSelectFetchOptions ([944e074](https://github.com/Infomaximum/widget-sdk/commit/944e0743b0e7ae096ab82854efdaff0d90e9eefb))
* переименовано поле onclick на onClick ([d222d35](https://github.com/Infomaximum/widget-sdk/commit/d222d35d033b94eba4a880efb97c651db0aa47a9))
* поле placeholderValues сделано обязательным ([97e53a1](https://github.com/Infomaximum/widget-sdk/commit/97e53a1512edf634920f30d076edc9610ea257a6))
* circular dependency ([9f2cc5a](https://github.com/Infomaximum/widget-sdk/commit/9f2cc5ae42a215616ac2ee11b966e3b7d6d62e04))
* **IGlobalContext:** исправлена стуктура мер пространства ([2e20966](https://github.com/Infomaximum/widget-sdk/commit/2e2096668cad2b6053215297e46d892ab6108f6e))
* **parseIndicatorLink:** поддержано удаление экранов из имен показателей ([584318d](https://github.com/Infomaximum/widget-sdk/commit/584318da3515338328326c60fc2ba672c3d566ae))


* изменен формат сортировок. ([8a0b8cd](https://github.com/Infomaximum/widget-sdk/commit/8a0b8cdada2b25541122b6da39df3c30bc7168ed))
* изменена структура настроек цвета ([96f9990](https://github.com/Infomaximum/widget-sdk/commit/96f9990661d337834889f8c0608ca4d58c75e3f5))
* изменены значения count у ETransitionMeasureTemplateNames и EEventMeasureTemplateNames ([fe3f5e7](https://github.com/Infomaximum/widget-sdk/commit/fe3f5e70e48bee300c4c8b498178b8de41a8d496))
* поле TUNE переименовано на CUSTOM в EFormattingPresets ([d38edc6](https://github.com/Infomaximum/widget-sdk/commit/d38edc6f34b6c9920c23ef753b0f5c37643d402b))
* удалено поле type у показателей и заменено поле dimensions на hierarchyDimensions у иерархий ([a5a22a7](https://github.com/Infomaximum/widget-sdk/commit/a5a22a75f46a37ada0dd8526077362c84a63d990))

## [4.0.0-beta16](https://github.com/Infomaximum/widget-sdk/compare/v4.0.0-beta14...v4.0.0-beta16) (2024-04-25)


### Features

* добавлены поля isOpenInCurrentWindow и viewKeyByName ([a9e6e77](https://github.com/Infomaximum/widget-sdk/commit/a9e6e77edd53fa15c36917fcf8e0733143aa47c5))

## [4.0.0-beta14](https://github.com/Infomaximum/widget-sdk/compare/v3.28.0...v4.0.0-beta14) (2024-04-19)


### Features

* изменена типизация для запуска действий ([1378579](https://github.com/Infomaximum/widget-sdk/commit/13785792b97f965dabf3c0771d09dba16dfd7309))
* поддержана завязка на name у сущностей ([a8053bd](https://github.com/Infomaximum/widget-sdk/commit/a8053bd4d1512239863428d7ea0247c6d240778a))
* произведен отказ от placement виджетов в пользу позиционирования на layout. ([119f7d8](https://github.com/Infomaximum/widget-sdk/commit/119f7d80ddf4100b8810a22f333474827e132390))

### [3.40.2](https://github.com/Infomaximum/widget-sdk/compare/v3.40.1...v3.40.2) (2024-09-18)

### [3.40.1](https://github.com/Infomaximum/widget-sdk/compare/v3.40.0...v3.40.1) (2024-09-18)

## [3.40.0](https://github.com/Infomaximum/widget-sdk/compare/v3.39.0...v3.40.0) (2024-09-06)


### Features

* добавлен core-js для запуска тестов при линковке к проекту ([1d29cf7](https://github.com/Infomaximum/widget-sdk/commit/1d29cf7dab9e478a91c6f553c2a474a609ddd016))
* добавлена логика по автосортировкам ([934123d](https://github.com/Infomaximum/widget-sdk/commit/934123d13ce57c41ed3bc9bdc846960e8055cd8a))

## [3.39.0](https://github.com/Infomaximum/widget-sdk/compare/v3.38.0...v3.39.0) (2024-07-30)


### Features

* добавлен 3-й параметр в createPanelDescription ([4fa7485](https://github.com/Infomaximum/widget-sdk/commit/4fa74856814200d30fc0d62a3775230920280504))


### Bug Fixes

* изменен тип onSelect ([bbcba71](https://github.com/Infomaximum/widget-sdk/commit/bbcba71f1ebef5ab90a54dfb8c36d1e0e05fcf8f))

## [3.38.0](https://github.com/Infomaximum/widget-sdk/compare/v3.37.1...v3.38.0) (2024-07-09)


### Features

* расширены интерфейсы процессных фильтров ([5d40ffe](https://github.com/Infomaximum/widget-sdk/commit/5d40ffe21fd474d39a21119722218976c5e21749))

### [3.37.1](https://github.com/Infomaximum/widget-sdk/compare/v3.37.0...v3.37.1) (2024-06-20)


### Bug Fixes

* поле placeholderValues сделано обязательным ([f66884b](https://github.com/Infomaximum/widget-sdk/commit/f66884bcb0be309038e48c59faa8d6bda36c6663))

## [3.37.0](https://github.com/Infomaximum/widget-sdk/compare/v3.36.0...v3.37.0) (2024-06-11)


### Features

* Добавлена типизация для кастомного показателя ([09f8a29](https://github.com/Infomaximum/widget-sdk/commit/09f8a293afdea68e28d277e733a54bf2d35ded75))

## [3.36.0](https://github.com/Infomaximum/widget-sdk/compare/v3.35.0...v3.36.0) (2024-06-07)


### Features

* добавлены фильтры для ввода из динамического списка, наименование полей действия и возможность их скрывать ([377df22](https://github.com/Infomaximum/widget-sdk/commit/377df22605c12a144e6729f21d6b3422563cf276))

## [3.35.0](https://github.com/Infomaximum/widget-sdk/compare/v3.34.2...v3.35.0) (2024-06-05)


### Features

* добавлены параметр overlay для placeholder и placeholderValues для IWidgetProps ([9b66e8f](https://github.com/Infomaximum/widget-sdk/commit/9b66e8f394469b94836e1f5d3ff607ed2ebab819))

### [3.34.2](https://github.com/Infomaximum/widget-sdk/compare/v3.34.0...v3.34.2) (2024-05-30)

## [3.34.0](https://github.com/Infomaximum/widget-sdk/compare/v3.33.0...v3.34.0) (2024-05-23)


### Features

* добавлен метод для запроса колонок по имени таблицы в widgetsContext ([dac9cd1](https://github.com/Infomaximum/widget-sdk/commit/dac9cd1a9713d9f995f98149e7111180eae4c240))

## [3.33.0](https://github.com/Infomaximum/widget-sdk/compare/v3.32.0...v3.33.0) (2024-05-16)


### Features

* в ISelectOption добавлено поле disabled ([8920d7a](https://github.com/Infomaximum/widget-sdk/commit/8920d7a5edfa968d264f3d322361ab8fecb4ddb2))

## [3.32.0](https://github.com/Infomaximum/widget-sdk/compare/v3.31.0...v3.32.0) (2024-05-15)


### Features

* в props виджета добавлен persistValue ([50b4704](https://github.com/Infomaximum/widget-sdk/commit/50b4704cfca20d40419f6d056fab4588547cc0bf))

## [3.31.0](https://github.com/Infomaximum/widget-sdk/compare/v3.30.0...v3.31.0) (2024-05-02)


### Features

* изменен интерфейс для вычислителя типа ([f6462f2](https://github.com/Infomaximum/widget-sdk/commit/f6462f2c24f970e7e194244a8af467b622e9f56a))

## [3.30.0](https://github.com/Infomaximum/widget-sdk/compare/v3.29.0...v3.30.0) (2024-04-27)


### Features

* добавлен параметр для конфигурации выпадающего меню ([369660e](https://github.com/Infomaximum/widget-sdk/commit/369660e5ca4ff05fdb2ce2eee161c6693361c0db))

## [3.29.0](https://github.com/Infomaximum/widget-sdk/compare/v3.28.0...v3.29.0) (2024-04-27)


### Features

* убрано экранирование тире в функции escapeSpecialCharacters ([b8864a1](https://github.com/Infomaximum/widget-sdk/commit/b8864a16f62cae7ebc494d0a5204fb3b3d727809))

## [3.28.0](https://github.com/Infomaximum/widget-sdk/compare/v3.27.1...v3.28.0) (2024-04-19)


### Features

* Добавлены типы для правил отображения ([fd1198f](https://github.com/Infomaximum/widget-sdk/commit/fd1198f73815ec5309468cbbaf806a76908af2e3))

### [3.27.1](https://github.com/Infomaximum/widget-sdk/compare/v3.27.0...v3.27.1) (2024-04-18)

## [3.27.0](https://github.com/Infomaximum/widget-sdk/compare/v3.26.0...v3.27.0) (2024-04-18)


### Features

* добавлена типизация для markdown виджетов ([b1de8e0](https://github.com/Infomaximum/widget-sdk/commit/b1de8e0c0cde294d0f8c1b4dcc5b61357d9f7b4e))
* Добавлены типы для правил отображения ([dcfe405](https://github.com/Infomaximum/widget-sdk/commit/dcfe405ee4072fad25df24d66f74e1ef01b2377c))
* повышена версия пакета ([382d51b](https://github.com/Infomaximum/widget-sdk/commit/382d51b34d4cb0e21e89e9e0b1864e77b174d1e9))

## [3.26.0](https://github.com/Infomaximum/widget-sdk/compare/v3.24.1...v3.26.0) (2024-04-18)


### Features

* добавлен новый EControlType ([3730334](https://github.com/Infomaximum/widget-sdk/commit/3730334a3a496d671a2636d703fe74f0fb97deb5))
* поддержано условие отображения сортировок для пункта "в компоненте" ([4289043](https://github.com/Infomaximum/widget-sdk/commit/4289043b5aa9388a7611e20ab6f1c84c4e9fe2ff))


### Bug Fixes

* изменена вилидация запуска скрипта со способом ввода "Из переменной" ([53b8cfb](https://github.com/Infomaximum/widget-sdk/commit/53b8cfbc23898a52d8944e87bb0542b6d571439f))

### [3.25.1](https://github.com/Infomaximum/widget-sdk/compare/v3.25.0...v3.25.1) (2024-04-11)


### Bug Fixes

* изменена вилидация запуска скрипта со способом ввода "Из переменной" ([53b8cfb](https://github.com/Infomaximum/widget-sdk/commit/53b8cfbc23898a52d8944e87bb0542b6d571439f))

## [3.25.0](https://github.com/Infomaximum/widget-sdk/compare/v3.24.1...v3.25.0) (2024-04-03)


### Features

* добавлен новый EControlType ([3730334](https://github.com/Infomaximum/widget-sdk/commit/3730334a3a496d671a2636d703fe74f0fb97deb5))

### [3.24.1](https://github.com/Infomaximum/widget-sdk/compare/v3.24.0...v3.24.1) (2024-04-02)

## [3.24.0](https://github.com/Infomaximum/widget-sdk/compare/v3.23.0...v3.24.0) (2024-04-02)


### Features

* добавлена фильтрация по этапам ([deb1d75](https://github.com/Infomaximum/widget-sdk/commit/deb1d7577b433e560713ee91a6a1d0909d295192))
* поддержаны значения null для checkedValues в фильтре ([1c856dd](https://github.com/Infomaximum/widget-sdk/commit/1c856ddaee1d8fba2301d00be18471e91444c4ed))

## [3.23.0](https://github.com/Infomaximum/widget-sdk/compare/v3.22.0...v3.23.0) (2024-03-28)


### Features

* Добавлен новый EControlType ([35ccdb2](https://github.com/Infomaximum/widget-sdk/commit/35ccdb27c57b21a189eabe07c2587d99d2e21264))
* добавлен параметр функции launchAction ([d97a8c8](https://github.com/Infomaximum/widget-sdk/commit/d97a8c895719ba1077ec6d7b9cd63570da9a4fea))


### Bug Fixes

* путь импорта ([6d945e1](https://github.com/Infomaximum/widget-sdk/commit/6d945e1c93353eefddb89a3bf86b031caf3e2eca))

## [3.22.0](https://github.com/Infomaximum/widget-sdk/compare/v3.21.0...v3.22.0) (2024-03-27)


### Features

* в ICalculatorIndicatorInput добавлено поле dataType ([3929406](https://github.com/Infomaximum/widget-sdk/commit/3929406e2bed4c6fca9b80a70367a037b824e926))


### Bug Fixes

* добавлено экранирование специальных символов при генерации формулы колонки ([a7c9b06](https://github.com/Infomaximum/widget-sdk/commit/a7c9b061a689fcd8fad289e0b22feec23b8838d4))

## [3.21.0](https://github.com/Infomaximum/widget-sdk/compare/v3.20.1...v3.21.0) (2024-03-25)


### Features

* добавлена возможность передать опции при объявлении виджета ([2f77623](https://github.com/Infomaximum/widget-sdk/commit/2f776235f8637d5f389983d5177855cfa9139f41))
* добавлено поле icon в интерфейс IDefinition ([e8b191c](https://github.com/Infomaximum/widget-sdk/commit/e8b191c8adb65c1e053d6cc668f48fae875c20d4))

### [3.20.1](https://github.com/Infomaximum/widget-sdk/compare/v3.20.0...v3.20.1) (2024-03-22)

## [3.20.0](https://github.com/Infomaximum/widget-sdk/compare/v3.19.1...v3.20.0) (2024-03-19)


### Features

* новый тип контрола ([2f7e7a4](https://github.com/Infomaximum/widget-sdk/commit/2f7e7a43b389c7a90764045280bb5b4ef9058e99))

### [3.19.1](https://github.com/Infomaximum/widget-sdk/compare/v3.19.0...v3.19.1) (2024-03-11)


### Bug Fixes

* исправлены условия отображения для двух и более виджетов ([0320a14](https://github.com/Infomaximum/widget-sdk/commit/0320a1432579ee6c461077530eed01a69a4085cf))

## [3.19.0](https://github.com/Infomaximum/widget-sdk/compare/v3.18.0...v3.19.0) (2024-03-07)


### Features

* добавлены новые способы форматирования для дат ([13745a3](https://github.com/Infomaximum/widget-sdk/commit/13745a38ba19926f73a0692647bc9aa7aee1cc15))
* поддержана фильтрация по null значениям ([f9990e4](https://github.com/Infomaximum/widget-sdk/commit/f9990e43d74335c38937e57b01d0300ffd46799f))

## [3.18.0](https://github.com/Infomaximum/widget-sdk/compare/v3.17.0...v3.18.0) (2024-03-05)


### Features

* добавлено поле currentSDKVersion, window.im.defineWidget - устарело ([11c01a2](https://github.com/Infomaximum/widget-sdk/commit/11c01a266dce54f939d270d315409f0398813194))

## [3.17.0](https://github.com/Infomaximum/widget-sdk/compare/v3.16.0...v3.17.0) (2024-03-01)


### Features

* поддержан новый тип данных Boolean ([6a10220](https://github.com/Infomaximum/widget-sdk/commit/6a10220cc662b24aaab4a042c3050fc70a696335))

## [3.16.0](https://github.com/Infomaximum/widget-sdk/compare/v3.15.1...v3.16.0) (2024-03-01)


### Features

* добавлен alias разреза в HistogramCalculatorOutput ([b635a17](https://github.com/Infomaximum/widget-sdk/commit/b635a1761171f648edf1d840c15bf2101afa5a92))


### Bug Fixes

* реэкспорт TLocalizationDescription ([dcd4c1e](https://github.com/Infomaximum/widget-sdk/commit/dcd4c1e13ddae20d4d3186728c046f80a2e69a14))

### [3.15.1](https://github.com/Infomaximum/widget-sdk/compare/v3.15.0...v3.15.1) (2024-02-22)


### Bug Fixes

* исправлено наименование функции ([7e7bb60](https://github.com/Infomaximum/widget-sdk/commit/7e7bb6056bf01871fcbba659f41345fc56dd26f8))

## [3.15.0](https://github.com/Infomaximum/widget-sdk/compare/v3.14.0...v3.15.0) (2024-02-22)


### Features

* добавлена функция getLocalized для безопасной работы с локализацией ([62ff93c](https://github.com/Infomaximum/widget-sdk/commit/62ff93c93094063bae7dcc97b2c7f317f3d878df))

## [3.13.0](https://github.com/Infomaximum/custom-widget/compare/v3.12.1...v3.13.0) (2024-02-13)


### Features

* экспорт данных для General и TwoLimits калькуляторов ([e19332a](https://github.com/Infomaximum/custom-widget/commit/e19332a72254a71ecb8f3a29c7dc5a31c06f765f))


### Bug Fixes

* изменена структура данных  для таблиц в WidgetsContext ([f32c97f](https://github.com/Infomaximum/custom-widget/commit/f32c97fff1dbb4c6fc3c9d8e88512c8afed811b1))
* Partial<WidgetSettings> у настроек в fillSettings ([81b4631](https://github.com/Infomaximum/custom-widget/commit/81b4631beff3cc1ccae9454f7641b9d305356a69))

### [3.12.1](https://github.com/Infomaximum/custom-widget/compare/v3.12.0...v3.12.1) (2024-02-07)


### Bug Fixes

* номера версий в которых deprecated ([2d2e8df](https://github.com/Infomaximum/custom-widget/commit/2d2e8dfc4b73caaf63a087a8841ffdecc5fdf236))

## [3.12.0](https://github.com/Infomaximum/custom-widget/compare/v3.11.1...v3.12.0) (2024-02-06)


### Features

* добавлен displayMode ([a04ae93](https://github.com/Infomaximum/custom-widget/commit/a04ae936ad79003f168c1b487f108f9651f408e3))

### [3.11.1](https://github.com/Infomaximum/custom-widget/compare/v3.11.0...v3.11.1) (2024-02-05)


### Bug Fixes

* options не обязательный пропс ([2bdaa6b](https://github.com/Infomaximum/custom-widget/commit/2bdaa6b6fe0b5361ac5947499e91ea2b8df1365e))

## [3.11.0](https://github.com/Infomaximum/custom-widget/compare/v3.10.1...v3.11.0) (2024-02-02)


### Features

* добавлена поддержка запросов options ([2296030](https://github.com/Infomaximum/custom-widget/commit/22960304c57f1e104cf86575fd513f46adf80054))

### [3.10.1](https://github.com/Infomaximum/custom-widget/compare/v3.10.0...v3.10.1) (2024-02-01)


### Bug Fixes

* EControlType.filterMode -> deprecated ([c6e7b6f](https://github.com/Infomaximum/custom-widget/commit/c6e7b6f765703d3b9fa16bfe78f833b95ba8a934))

## [3.10.0](https://github.com/Infomaximum/custom-widget/compare/v3.9.0...v3.10.0) (2024-01-15)


### Features

* добавлен EControlType ->  inputMarkdown ([0846695](https://github.com/Infomaximum/custom-widget/commit/0846695c8c69ede4cbffea49e14b1b62f2205182))

## [3.9.0](https://github.com/Infomaximum/custom-widget/compare/v3.8.0...v3.9.0) (2023-12-29)


### Features

* добавлен новый режим фильтрации "Отключено" ([2ff2be3](https://github.com/Infomaximum/custom-widget/commit/2ff2be377e643dc22a009f62644ff9c088b5c7db))
* добавлены утилиты для работы с выделением значений разрезов ([996d01f](https://github.com/Infomaximum/custom-widget/commit/996d01f56f15c356e71e5826eae199927a2a8731))

## [3.8.0](https://github.com/Infomaximum/custom-widget/compare/v3.7.0...v3.8.0) (2023-12-25)


### Features

* в базовые настройки виджета добавлены новый режим условия отображения и комментарий условия отображения ([1195de2](https://github.com/Infomaximum/custom-widget/commit/1195de24b41d0c9e77419958e1155638cc557a17))

## [3.7.0](https://github.com/Infomaximum/custom-widget/compare/v3.6.0...v3.7.0) (2023-12-22)


### Features

* добавлена функция mapSortingToInputs ([13a4e99](https://github.com/Infomaximum/custom-widget/commit/13a4e99a24c1dd5f478c94753cfbf03d7be75b03))

## [3.6.0](https://github.com/Infomaximum/custom-widget/compare/v3.5.1...v3.6.0) (2023-12-20)


### Features

* добавлены фильтры для переменной с типом 'Динамический список' ([17c9a30](https://github.com/Infomaximum/custom-widget/commit/17c9a3028902d98d4facd8074b19c92d32193bed))

### [3.5.1](https://github.com/Infomaximum/custom-widget/compare/v3.5.0...v3.5.1) (2023-12-18)


### Bug Fixes

* userLogin - deprecated ([addacb6](https://github.com/Infomaximum/custom-widget/commit/addacb682e7ff1befa3d31ac2cc516cc3fbecadd))

## [3.5.0](https://github.com/Infomaximum/custom-widget/compare/v3.3.1...v3.5.0) (2023-12-13)

## [3.4.0](https://github.com/Infomaximum/custom-widget/compare/v3.3.0...v3.4.0) (2023-12-13)


### Features

* Добавлены утилитарные функции для работы с разрезами и мерами ([ae4c396](https://github.com/Infomaximum/custom-widget/commit/ae4c3961a1a1362edf322a917138d5a3a49b9880))

## [3.4.0](https://github.com/Infomaximum/custom-widget/compare/v3.3.0...v3.4.0) (2023-12-13)


### Features

* Добавлены утилитарные функции для работы с разрезами и мерами ([ae4c396](https://github.com/Infomaximum/custom-widget/commit/ae4c3961a1a1362edf322a917138d5a3a49b9880))

## [3.3.0](https://github.com/Infomaximum/custom-widget/compare/v3.2.0...v3.3.0) (2023-12-08)


### Features

* поддержано условие отображения для разрезов ([2825a4d](https://github.com/Infomaximum/custom-widget/commit/2825a4d630d50fef41f2edeffab9baa07f1f8db6))

## [3.2.0](https://github.com/Infomaximum/custom-widget/compare/v3.1.0...v3.2.0) (2023-12-07)


### Features

* поддержаны открытые диапазоны чисел в фильтре по формуле ([0a26a41](https://github.com/Infomaximum/custom-widget/commit/0a26a416aa6c5b24483b4f28788eb8ef73c3cc5d))

## [3.1.0](https://github.com/Infomaximum/custom-widget/compare/v3.0.0...v3.1.0) (2023-12-05)


### Features

* выделен интерфейс для метода fillSettings ([66eeb9e](https://github.com/Infomaximum/custom-widget/commit/66eeb9ed5242d870a2fb3ad10a7dcc5f12f781b8))
* Добавлена валидация для оставшихся способов ввода ([04ba720](https://github.com/Infomaximum/custom-widget/commit/04ba7202db5ff66628f33ce7e3ff063610338220))


### Bug Fixes

* исправлен тип для статического типа ([ce5adaa](https://github.com/Infomaximum/custom-widget/commit/ce5adaad97c5483ff367f837a240808ea984b92d))

## [3.0.0](https://github.com/Infomaximum/custom-widget/compare/v2.1.0...v3.0.0) (2023-11-30)


### ⚠ BREAKING CHANGES

* удален енам EDashboardFilteringMethodValues

### Features

* добавлен режим фильтрации "Последнее время", изменены интерфейсы ([ed4eafe](https://github.com/Infomaximum/custom-widget/commit/ed4eafe47290ac117f9da9e5af04a10a277372a5))

## [1.11.0](https://github.com/Infomaximum/custom-widget/compare/v1.10.2...v1.11.0) (2023-11-15)


### Features

* добавлен интерфейс ICalculatorVariable ([848b02e](https://github.com/Infomaximum/custom-widget/commit/848b02e502ca4c5cd207624791a52e1226cdd5d9))
