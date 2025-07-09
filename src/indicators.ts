import type { TActionsOnClick } from "./actions";
import type { TExtendedFormulaFilterValue } from "./filtration";
import type { EFormatTypes, EFormattingPresets } from "./formatting";
import type { IAutoIdentifiedArrayItem } from "./settings/baseWidget";
import type { EMarkdownDisplayMode, TDisplayCondition } from "./settings/values";
import type { TSortDirection, TWidgetSortingValue } from "./sorting";
import type { TNullable } from "./utilityTypes";

export enum EWidgetIndicatorType {
  MEASURE = "MEASURE",
  EVENT_INDICATOR = "EVENT_INDICATOR",
  TRANSITION_INDICATOR = "TRANSITION_INDICATOR",
  DIMENSION = "DIMENSION",
  SORTING = "SORTING",
}

export enum EOuterAggregation {
  avg = "avg",
  median = "median",
  count = "count",
  countDistinct = "countDistinct",
  min = "min",
  max = "max",
  sum = "sum",
  top = "top",
}

export interface IWidgetIndicator extends IAutoIdentifiedArrayItem {
  name: string;
}

export type TProcessIndicatorValue =
  | { mode: EWidgetIndicatorValueModes.FORMULA; formula: string }
  | {
      mode: EWidgetIndicatorValueModes.TEMPLATE;
      /** Имя шаблонной формулы, использующей колонку таблицы */
      templateName: string;
    };

export interface IProcessIndicator extends IWidgetIndicator {
  value?: TProcessIndicatorValue;
  dbDataType?: string;

  format?: EFormatTypes;
  formatting?: EFormattingPresets;
  formattingTemplate?: string;

  displayCondition?: TDisplayCondition;
}

export interface IProcessEventIndicator extends IProcessIndicator {}

export interface IProcessTransitionIndicator extends IProcessIndicator {}

/** Индикатор для сортировки */
export interface IWidgetSortingIndicator extends IWidgetIndicator {
  direction: TSortDirection;
  value: TWidgetSortingValue;
}

/** Режимы значения показателя (на основе чего генерируется формула) */
export enum EWidgetIndicatorValueModes {
  /** Готовая формула (как правило, введенная пользователем через редактор формул) */
  FORMULA = "FORMULA",
  /** Шаблон формулы, предоставляемый системой */
  TEMPLATE = "TEMPLATE",
  AGGREGATION = "AGGREGATION",
  DURATION = "DURATION",
  CONVERSION = "CONVERSION",
  START_TIME = "START_TIME",
  END_TIME = "END_TIME",
}

/** Режимы сортировки (на что ссылается сортировка) */
export enum ESortingValueModes {
  /** Сортировка по формуле */
  FORMULA = "FORMULA",
  /** Сортировка по показателю(разрезу или мере) виджета */
  IN_WIDGET = "IN_WIDGET",
}

export interface ICommonState {
  name: string;
  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated */
  guid: string;
}

export interface ICommonMeasures {
  name: string;
  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated */
  guid: string;
  formula: string;
}

export interface ICommonDimensions {
  name: string;
  formula: string;
}

export type TColumnIndicatorValue =
  | { mode: EWidgetIndicatorValueModes.FORMULA; formula?: string }
  | {
      mode: EWidgetIndicatorValueModes.TEMPLATE;
      /** Имя шаблонной формулы, использующей колонку таблицы */
      templateName?: string;
      /** Имя таблицы */
      tableName?: string;
      /** Имя колонки */
      columnName?: string;
    };

/** Общий интерфейс разреза и меры */
export interface IWidgetColumnIndicator extends IWidgetIndicator {
  dbDataType?: string;

  format?: EFormatTypes;
  formatting?: EFormattingPresets;
  formattingTemplate?: string;
  displayCondition?: TDisplayCondition;
  onClick?: TActionsOnClick[];
}

export interface IWidgetDimensionHierarchy<D extends IWidgetDimension = IWidgetDimension>
  extends IAutoIdentifiedArrayItem {
  name: string;
  hierarchyDimensions: D[];
  displayCondition?: TDisplayCondition;
}

export interface IWidgetDimension extends Omit<IWidgetColumnIndicator, "value"> {
  value?:
    | TColumnIndicatorValue
    | (TWidgetIndicatorAggregationValue & {
        innerTemplateName?: string;
      })
    | TWidgetIndicatorTimeValue;
  hideEmptyValues: boolean;
}

export interface IWidgetMeasure extends Omit<IWidgetColumnIndicator, "value"> {
  value?:
    | TColumnIndicatorValue
    | (TWidgetIndicatorAggregationValue & {
        outerAggregation: EOuterAggregation;
      })
    | TWidgetIndicatorConversionValue
    | TWidgetIndicatorDurationValue;
}

export interface IMarkdownMeasure extends IWidgetMeasure {
  format: EFormatTypes;
  displaySign: EMarkdownDisplayMode;
}

/** Тип показателя */
export enum EIndicatorType {
  /** Показатели процесса */
  PROCESS_MEASURE = "PROCESS_MEASURE",
  /** Вводимое значение */
  STATIC = "STATIC",
  /** Статический список */
  STATIC_LIST = "STATIC_LIST",
  /** Динамический список */
  DYNAMIC_LIST = "DYNAMIC_LIST",
  /** Список колонок */
  COLUMN_LIST = "COLUMN_LIST",
  /** Разрез */
  DIMENSION = "DIMENSION",
  /** Мера */
  MEASURE = "MEASURE",
  /** Иерархия */
  DYNAMIC_DIMENSION = "DYNAMIC_DIMENSION",
  /** Пользовательская сортировка */
  USER_SORTING = "USER_SORTING",
}

interface IBaseWidgetVariable {
  /** Имя переменной */
  name: string;
  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated */
  guid: string;
}

/** Обобщенные типы значений переменных */
export enum ESimpleInputType {
  /** Число (точность Float64) */
  NUMBER = "FLOAT",
  /** Целое число (точность Int64) */
  INTEGER_NUMBER = "INTEGER",
  /** Текст */
  TEXT = "STRING",
  /** Дата (точность Date) */
  DATE = "DATE",
  /** Дата и время (точность DateTime64) */
  DATE_AND_TIME = "DATETIME",
  /** Логический тип */
  BOOLEAN = "BOOLEAN",
}

export interface IWidgetStaticVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.STATIC;
  /** Значение */
  value: string | null;
  /** Обобщенный тип данных */
  simpleInputType: ESimpleInputType;
}
export interface IStaticListLabeledOption {
  value: string;
  label: string;
}

export interface IWidgetStaticListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.STATIC_LIST;
  /** Значение */
  value: string | string[] | null;
  /** Элементы статического списка */
  /** @deprecated поле будет удалено, необходимо использовать labeledOptions */
  options: string[];
  /** Объект ключ значение для статического списка  */
  labeledOptions: IStaticListLabeledOption[];
  /** Множественный выбор */
  multipleChoice: boolean;
}

export interface IWidgetDynamicListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.DYNAMIC_LIST;
  /** Значение */
  value: string | (string | null)[] | null;
  /** Формула для отображения списка */
  listFormula: TNullable<string>;
  /** Тип данных */
  dbDataType: string;
  /** Множественный выбор */
  multipleChoice: boolean;
  /** Фильтры */
  filters: TExtendedFormulaFilterValue[];
  /** Флаг применения фильтров отчета для отображаемого списка */
  considerFilters: boolean;
}

export interface IWidgetColumnListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.COLUMN_LIST;
  /** Имя таблицы */
  tableName: string;
  /** Значение (имя колонки) */
  value: string | null;
}

export type TWidgetVariable =
  | IWidgetStaticVariable
  | IWidgetStaticListVariable
  | IWidgetDynamicListVariable
  | IWidgetColumnListVariable;

export function isDimensionsHierarchy(
  indicator: IWidgetColumnIndicator
): indicator is IWidgetDimensionHierarchy {
  return "hierarchyDimensions" in indicator;
}

export enum OuterAggregation {
  avg = "avgIf",
  median = "medianIf",
  count = "countIf",
  countDistinct = "countIfDistinct",
  min = "minIf",
  max = "maxIf",
  sum = "sumIf",
}

export enum EDurationTemplateName {
  avg = "avg",
  median = "median",
}

export type TWidgetIndicatorAggregationValue = {
  mode: EWidgetIndicatorValueModes.AGGREGATION;
  templateName: string;
  processKey: string | null;
  eventName: string | null;
  caseCaseIdFormula: string | null;
  eventNameFormula: string | null;
  filters: TExtendedFormulaFilterValue[];

  tableName?: string;
  columnName?: string;
  eventTimeFormula?: string | null;
};

export enum EEventAppearances {
  FIRST = "FIRST",
  LAST = "LAST",
}

export type TWidgetIndicatorConversionValue = {
  mode: EWidgetIndicatorValueModes.CONVERSION;

  startEventNameFormula: string | null;
  startEventProcessKey: string | null;
  startEventName: string | null;
  startEventFilters: TExtendedFormulaFilterValue[];
  startEventTimeFormula: string | null;

  endEventNameFormula: string | null;
  endEventProcessKey: string | null;
  endEventName: string | null;
  endEventFilters: TExtendedFormulaFilterValue[];
  endCaseCaseIdFormula: string | null;
  endEventTimeFormula: string | null;
};

export type TWidgetIndicatorDurationValue = {
  mode: EWidgetIndicatorValueModes.DURATION;
  templateName: string;
  startEventAppearances: EEventAppearances;
  endEventAppearances: EEventAppearances;
} & Omit<TWidgetIndicatorConversionValue, "mode">;

export type TWidgetIndicatorTimeValue = {
  templateName: string;
  mode: EWidgetIndicatorValueModes.START_TIME | EWidgetIndicatorValueModes.END_TIME;
  processKey: string;
  eventName: string;
  eventTimeFormula: string;
  caseCaseIdFormula: string;
  eventNameFormula: string;
  filters: TExtendedFormulaFilterValue[];
};
