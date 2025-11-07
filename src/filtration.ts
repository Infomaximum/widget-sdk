import type { ICalculatorFilter } from "./calculators/calculator/calculator";
import type { TNullable } from "./utilityTypes";
import { ECalculatorFilterMethods } from "./calculators/calculator";
import type { TSchemaType } from ".";
import type {
  DimensionProcessFilterSchema,
  ExtendedFormulaFilterValueSchema,
  FormulaFilterValueSchema,
  SettingsFilterSchema,
} from "./filtration.schema";

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

/**
 * Параметры, которые влияют на отображаемый контент в окне настройки процессного фильтра,
 * но не учитываются при применении фильтра.
 */
export interface IProcessFilterPreviewParams {
  /**
   * События, доступные при выборе процесса.
   * Если параметр не передан, используются все события процесса на основе запроса к вычислителю.
   */
  eventsNamesByProcessKey?: Map<string, (string | null)[]>;
  /** Фильтры событий */
  eventFilters?: TExtendedFormulaFilterValue[];
}

export interface IProcessEventFilterValue {
  processKey: string;
  eventName: string;
}

export interface IProcessTransitionFilterValue {
  startEventProcessKey: string;
  startEventName: string;

  endEventProcessKey: string;
  endEventName: string;
}

interface IClickPosition {
  x: number;
  y: number;
  elementWidth?: number;
  elementHeight?: number;
}

interface IPositionConfig extends IClickPosition {
  offsetX?: number;
  offsetY?: number;
}

export interface IAddPresenceOfEventFilter {
  (
    name: EProcessFilterNames.presenceOfEvent,
    value: IProcessEventFilterValue,
    positionConfig?: IPositionConfig,
    previewParams?: IProcessFilterPreviewParams
  ): void;
}

export interface IAddRepetitionOfEventFilter {
  (
    name: EProcessFilterNames.repetitionOfEvent,
    value: IProcessEventFilterValue,
    positionConfig?: IPositionConfig,
    previewParams?: IProcessFilterPreviewParams
  ): void;
}

export interface IAddPresenceOfTransitionFilter {
  (
    name: EProcessFilterNames.presenceOfTransition,
    value: IProcessTransitionFilterValue,
    positionConfig?: IPositionConfig,
    previewParams?: IProcessFilterPreviewParams
  ): void;
}

export interface IAddDurationOfTransitionFilter {
  (
    name: EProcessFilterNames.durationOfTransition,
    value: IProcessTransitionFilterValue,
    positionConfig?: IPositionConfig,
    previewParams?: IProcessFilterPreviewParams
  ): void;
}

export enum EFormulaFilterFieldKeys {
  date = "date",
  dateRange = "dateRange",
  numberRange = "numberRange",
  string = "string",
  lastTimeValue = "lastTimeValue",
  lastTimeUnit = "lastTimeUnit",
  durationUnit = "durationUnit",
}

export interface IFormulaFilterValue extends TSchemaType<typeof FormulaFilterValueSchema> {}

export enum EDimensionProcessFilterTimeUnit {
  YEARS = "YEARS",
  MONTHS = "MONTHS",
  HOURS = "HOURS",
  DAYS = "DAYS",
  MINUTES = "MINUTES",
}
export interface IDimensionProcessFilter extends TSchemaType<typeof DimensionProcessFilterSchema> {}

export type TExtendedFormulaFilterValue = TSchemaType<typeof ExtendedFormulaFilterValueSchema>;

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
  | TExtendedFormulaFilterValue
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
  /**
   * Удалить фильтр, заданный формулой, из текущего набора фильтров
   *
   * @param formula Формула фильтра, который необходимо удалить. Должна точно соответствовать
   * формуле ранее добавленного фильтра (с учетом регистра и пробелов).
   * @param [sliceIndex] Опциональный индекс элемента массива. См. {@link IFormulaFilterValue.sliceIndex}.
   *
   * @remarks
   * - Если фильтр был добавлен без указания индекса, его нужно удалять без указания индекса.
   * - Если фильтр был добавлен с индексом, тот же индекс должен быть указан при удалении.
   * - Удаление происходит по точному совпадению формулы и индекса (если он был указан).
   */
  removeFormulaFilter(formula: string, sliceIndex?: number): void;

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

export type TSettingsFilter = TSchemaType<typeof SettingsFilterSchema>;

export const isFormulaFilterValue = (
  value: TExtendedFormulaFilterValue
): value is IFormulaFilterValue => {
  return "filteringMethod" in value;
};

export const isDimensionProcessFilter = (
  filter: TSettingsFilter
): filter is IDimensionProcessFilter => "value" in filter && "condition" in filter;
