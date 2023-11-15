import type { ESimpleDataType } from "./data";
import type { EFormatTypes } from "./formatting";
import type { TNullable } from "./utilityTypes";
import type { EFilteringMethodValues } from "@infomaximum/base-filter";

// todo: переименовать
export enum EDashboardFilteringMethodValues {
  EQUAL_TO = "EQUAL_TO",
  NOT_EQUAL_TO = "NOT_EQUAL_TO",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL_TO = "GREATER_THAN_OR_EQUAL_TO",
  LESS_THAN_OR_EQUAL_TO = "LESS_THAN_OR_EQUAL_TO",
  STARTS_WITH = "STARTS_WITH",
  ENDS_WITH = "ENDS_WITH",
  CONTAINS = "CONTAINS",
  NOT_CONTAINS = "NOT_CONTAINS",
  IN_RANGE = "IN_RANGE",
  NOT_IN_RANGE = "NOT_IN_RANGE",
}

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

export interface ICalculatorFilter {
  /** Формула фильтра */
  formula: string;
  /** Тип данных для формулы фильтра */
  dataType: ESimpleDataType;
  /** Значения фильтра */
  values: string[];
  /** Метод фильтрации */
  filteringMethod: EFilteringMethodValues | EDashboardFilteringMethodValues;
}

export interface IWidgetFormulaFilterValue extends ICalculatorFilter {
  /**
   * Название фильтра
   * @deprecated необходимо использовать @see {@link IWidgetFormulaFilterValue.name}
   */
  caption?: TNullable<string>;
  /** Название фильтра */
  name: TNullable<string>;
  /** Формат */
  format?: EFormatTypes;
}

interface IProcessFilterValue {
  /**
   * События, доступные при выборе процесса.
   * Если параметр не передан, используются все события процесса на основе запроса к вычислителю.
   */
  eventsNamesByProcessGuidMap?: Map<string, string[]>;
}

export interface IProcessEventFilterValue extends IProcessFilterValue {
  processGuid: string;
  eventName: string;
}

export interface IProcessTransitionFilterValue extends IProcessFilterValue {
  startEventProcessGuid: string;
  startEventName: string;

  endEventProcessGuid: string;
  endEventName: string;
}

export interface IAddPresenceOfEventFilter {
  (
    name: EProcessFilterNames.presenceOfEvent,
    value: IProcessEventFilterValue
  ): void;
}

export interface IAddRepetitionOfEventFilter {
  (
    name: EProcessFilterNames.repetitionOfEvent,
    value: IProcessEventFilterValue
  ): void;
}

export interface IAddPresenceOfTransitionFilter {
  (
    name: EProcessFilterNames.presenceOfTransition,
    value: IProcessTransitionFilterValue
  ): void;
}

export interface IAddDurationOfTransitionFilter {
  (
    name: EProcessFilterNames.durationOfTransition,
    value: IProcessTransitionFilterValue
  ): void;
}

export interface IWidgetFiltration {
  /** Значения фильтров, подготовленные для передачи в вычислитель */
  preparedFilterValues: ICalculatorFilter[];

  // Formula filters

  /** Добавить фильтр по формуле */
  addFormulaFilter(value: IWidgetFormulaFilterValue): void;
  /** Удалить фильтр по формуле */
  removeFormulaFilter(formula: string): void;

  // Process filters

  addProcessFilter(
    ...args:
      | Parameters<IAddPresenceOfEventFilter>
      | Parameters<IAddRepetitionOfEventFilter>
      | Parameters<IAddPresenceOfTransitionFilter>
      | Parameters<IAddDurationOfTransitionFilter>
  ): void;
}

export enum EFormulaFilterFieldKeys {
  date = "date",
  dateRange = "dateRange",
  duration = "duration",
  number = "number",
  numberRange = "numberRange",
  string = "string",
}

export interface IFormulaFilterValue {
  /** Заголовок фильтра */
  name: TNullable<string>;
  /** Формула */
  formula: string;
  /** Тип данных формулы */
  dataType: ESimpleDataType;
  /** Формат */
  format: EFormatTypes;
  /** Метод фильтрации */
  filteringMethod: EFilteringMethodValues | EDashboardFilteringMethodValues;
  /** Выбранные в списке значения в виде моделей */
  checkedValues: string[];
  /** Значения полей формы редактора */
  formValues: Partial<{
    [EFormulaFilterFieldKeys.date]: string | null;
    [EFormulaFilterFieldKeys.dateRange]: [string, string];
    [EFormulaFilterFieldKeys.duration]: string;
    [EFormulaFilterFieldKeys.number]: number;
    [EFormulaFilterFieldKeys.numberRange]: [number, number];
    [EFormulaFilterFieldKeys.string]: string;
  }>;
}
