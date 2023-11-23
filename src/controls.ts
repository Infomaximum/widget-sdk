import type {
  IDisplayPredicate,
  IDivePanelDescription,
  TRecordAccessor,
} from "./metaDescription";

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
  filterMode = "filterMode",
  displayCondition = "displayCondition",
  eventsColor = "eventsColor",
}

/** Конфигурация элемента управления настройкой */
export interface IControlRecord<
  Settings extends object,
  Value,
  ControlType = EControlType,
> {
  key: string;
  /** Локализация заголовка настройки */
  title?: string;
  /** Тип используемого элемента управления настройкой из предложенных нашей системой */
  type: ControlType | string;
  /** Объект дополнительных параметров элемента управления */
  props?: object | ((settings: Settings) => object);
  /** Описание доступа к значению настройки */
  accessor: TRecordAccessor<Settings, Value>;
  /**
   * Рекурсивное определение мета-описания, в элемент управления будет передана функция dive
   * для погружения на уровень ниже.
   */
  description?: IDivePanelDescription<Settings>;
  shouldDisplay?: IDisplayPredicate<Settings>;
}
