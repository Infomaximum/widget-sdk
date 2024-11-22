import type { ICalculatorFilter } from "./calculators/calculator/calculator";
import type { EFormatTypes } from "./formatting";
import type { TNullable, valueof } from "./utilityTypes";
import { ECalculatorFilterMethods } from "./calculators/calculator";
import type { EDurationUnit, ELastTimeUnit } from "./calculators/utils/mapFormulaFiltersToInputs";

export type TSelectivePartial<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;

export const formulaFilterMethods = {
  ...ECalculatorFilterMethods,
  LAST_TIME: "LAST_TIME",
} as const;

export enum EProcessFilterNames {
  /** Наличие события */
  presenceOfEvent = "presenceOfEvent",
  /** Количество повторов события */
  repetitionOfEvent = "repetitionOfEvent",
  /** Наличие перехода */
  presenceOfTransition = "presenceOfTransition",
  /** Длительность перехода */
  durationOfTransition = "durationOfTransition",
}

interface IProcessFilterValue {
  /**
   * События, доступные при выборе процесса.
   * Если параметр не передан, используются все события процесса на основе запроса к вычислителю.
   */
  eventsNamesByProcessNameMap?: Map<string, (string | null)[]>;
}

export interface IProcessEventFilterValue extends IProcessFilterValue {
  processName: string;
  eventName: string;
}

export interface IProcessTransitionFilterValue extends IProcessFilterValue {
  startEventProcessName: string;
  startEventName: string;

  endEventProcessName: string;
  endEventName: string;
}

interface IClickPosition {
  x: number;
  y: number;
  elementWidth: number;
  elementHeight: number;
}

interface IPositionConfig extends IClickPosition {
  type: string;
}

export interface IAddPresenceOfEventFilter {
  (
    name: EProcessFilterNames.presenceOfEvent,
    value: IProcessEventFilterValue,
    positionConfig?: IPositionConfig
  ): void;
}

export interface IAddRepetitionOfEventFilter {
  (
    name: EProcessFilterNames.repetitionOfEvent,
    value: IProcessEventFilterValue,
    positionConfig?: IPositionConfig
  ): void;
}

export interface IAddPresenceOfTransitionFilter {
  (
    name: EProcessFilterNames.presenceOfTransition,
    value: IProcessTransitionFilterValue,
    positionConfig?: IPositionConfig
  ): void;
}

export interface IAddDurationOfTransitionFilter {
  (
    name: EProcessFilterNames.durationOfTransition,
    value: IProcessTransitionFilterValue,
    positionConfig?: IPositionConfig
  ): void;
}

export enum EFormulaFilterFieldKeys {
  date = "date",
  dateRange = "dateRange",
  duration = "duration",
  number = "number",
  numberRange = "numberRange",
  string = "string",
  lastTimeValue = "lastTimeValue",
  lastTimeUnit = "lastTimeUnit",
  durationUnit = "durationUnit",
}

export interface IFormulaFilterValue {
  /** Заголовок фильтра */
  name: TNullable<string>;
  /** Формула */
  formula: string;
  /** Тип данных формулы */
  dbDataType: string;
  /** Формат */
  format: EFormatTypes;
  /** Метод фильтрации */
  filteringMethod: valueof<typeof formulaFilterMethods>;
  /** Выбранные в списке значения в виде моделей */
  checkedValues: (string | null)[];
  /** Значения полей формы редактора */
  formValues: Partial<{
    [EFormulaFilterFieldKeys.date]: string | null;
    [EFormulaFilterFieldKeys.dateRange]: [string, string];
    // todo: пока не удаляется для обратной совместимости
    [EFormulaFilterFieldKeys.duration]: string;
    // todo: пока не удаляется для обратной совместимости
    [EFormulaFilterFieldKeys.number]: number;
    [EFormulaFilterFieldKeys.numberRange]: Partial<[number, number]>;
    [EFormulaFilterFieldKeys.string]: string;
    [EFormulaFilterFieldKeys.lastTimeValue]: number;
    [EFormulaFilterFieldKeys.lastTimeUnit]: ELastTimeUnit;
    [EFormulaFilterFieldKeys.durationUnit]: EDurationUnit;
  }>;
}

export type TExtendedFormulaFilterValue = { formula: string } | IFormulaFilterValue;

interface IStagesFilterItem {
  id: number;
  /** Название этапа */
  name: string;
  /** Формула фильтра этапа */
  formula: string;
  isSelected: boolean;
}

export interface IStagesFilterValue {
  /** Ключ виджета */
  widgetKey: string;
  /** Заголовок фильтра */
  name: TNullable<string>;
  /** Этапы */
  stages: IStagesFilterItem[];
}

export type TWidgetFilterValue =
  | IFormulaFilterValue
  | IStagesFilterValue
  | IProcessEventFilterValue
  | IProcessTransitionFilterValue;

export interface IWidgetFilter {
  /** Значение фильтра */
  filterValue: TWidgetFilterValue;
  /** Значение фильтра, подготовленное для передачи в вычислитель */
  preparedFilterValue: ICalculatorFilter;
  /** Информация о возможности менять фильтр из виджета */
  isReadonly: boolean;
}

export interface IWidgetFiltration {
  /** Информация о внешних фильтрах виджета */
  filters: IWidgetFilter[];
  /**
   * Значения внешних фильтров виджета, подготовленные для передачи в вычислитель.
   * Использует данные из filters, но предоставлено отдельным полем для удобства разработки.
   */
  preparedFilterValues: ICalculatorFilter[];

  // Formula filters

  /** Добавить фильтр по формуле */
  addFormulaFilter(value: TSelectivePartial<IFormulaFilterValue, "format" | "formValues">): void;
  /** Удалить фильтр по формуле */
  removeFormulaFilter(formula: string): void;

  // Process filters

  /** Добавить процессный фильтр */
  addProcessFilter(
    ...args:
      | Parameters<IAddPresenceOfEventFilter>
      | Parameters<IAddRepetitionOfEventFilter>
      | Parameters<IAddPresenceOfTransitionFilter>
      | Parameters<IAddDurationOfTransitionFilter>
  ): void;

  // Stages filters

  /** Добавить фильтр по этапам */
  addStagesFilter(value: Omit<IStagesFilterValue, "widgetKey">): void;
  /** Удалить фильтр по этапам */
  removeStagesFilter(widgetKey: string): void;
}

export const isFormulaFilterValue = (
  value: TExtendedFormulaFilterValue
): value is IFormulaFilterValue => {
  return "filteringMethod" in value;
};
