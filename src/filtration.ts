import type { ICalculatorFilter } from "./calculators/calculator/calculator";
import type { ESimpleDataType } from "./data";
import type { EFormatTypes } from "./formatting";
import type { TNullable, valueof } from "./utilityTypes";
import { ECalculatorFilterMethods } from "./calculators/calculator";
import type {
  EDurationUnit,
  ELastTimeUnit,
} from "./calculators/utils/mapFormulaFiltersToInputs";

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
  eventsNamesByProcessGuidMap?: Map<string, (string | null)[]>;
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
  dataType: ESimpleDataType;
  /** Формат */
  format: EFormatTypes;
  /** Метод фильтрации */
  filteringMethod: valueof<typeof formulaFilterMethods>;
  /** Выбранные в списке значения в виде моделей */
  checkedValues: string[];
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
