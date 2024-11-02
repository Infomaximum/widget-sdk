import type { IDisplayPredicate, IDivePanelDescription, TRecordAccessor } from "./metaDescription";

export enum EUnitMode {
  PIXEL = "PIXEL",
  PERCENT = "PERCENT",
}

export enum EControlType {
  inputNumber = "inputNumber",
  switch = "switch",
  input = "input",
  formattingTemplate = "formattingTemplate",
  radioIconGroup = "radioIconGroup",
  select = "select",
  tagSet = "tagSet",
  formula = "formula",
  typedFormula = "typedFormula",
  inputRange = "inputRange",
  colorPicker = "colorPicker",
  displayCondition = "displayCondition",
  eventsColor = "eventsColor",
  inputMarkdown = "inputMarkdown",
  filter = "filter",
  actionOnClick = "actionOnClick",
  eventsPicker = "eventsPicker",
  size = "size",
  formatting = "formatting",
}

/** Конфигурация элемента управления настройкой */
export interface IControlRecord<Settings extends object, Value, ControlType = EControlType> {
  /** Ключ, должен быть уникальным в рамках одного уровня вложенности */
  key: string;
  /** Локализация заголовка */
  title?: string;
  /** Тип используемого элемента управления из предложенных системой */
  type: ControlType | string;
  /** Кастомный верхний отступ */
  marginTop?: number;
  /** Объект дополнительных параметров элемента управления */
  props?: object | ((settings: Settings) => object);
  /** Описание доступа к значению настройки */
  accessor: TRecordAccessor<Settings, Value>;
  /**
   * Рекурсивное определение мета-описания, в элемент управления будет передана функция dive
   * для перехода в указанное мета-описание.
   *
   * Возможность работает только для элемента управления EControlType.tagSet.
   */
  description?: IDivePanelDescription<Settings>;
  /**
   * Предикат, позволяющий скрыть элемент управления.
   * Предоставлен для удобства разработки. Скрыть элемент можно и условно добавляя его в мета-описание.
   */
  shouldDisplay?: IDisplayPredicate<Settings>;
}
