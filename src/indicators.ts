import type { TExtendedFormulaFilterValue } from "./filtration";
import type {
  ColumnIndicatorValueSchema,
  MarkdownMeasureSchema,
  ProcessIndicatorSchema,
  ProcessIndicatorValueSchema,
  WidgetColumnIndicatorSchema,
  WidgetDimensionHierarchySchema,
  WidgetDimensionInHierarchySchema,
  WidgetDimensionSchema,
  WidgetIndicatorAggregationValueSchema,
  WidgetIndicatorConversionValue,
  WidgetIndicatorDurationValue,
  WidgetIndicatorSchema,
  WidgetIndicatorTimeValueSchema,
  WidgetMeasureSchema,
  WidgetSortingIndicatorSchema,
} from "./indicators.schema";
import type { TNullable } from "./utilityTypes";
import type { TSchemaType } from ".";

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

export interface IWidgetIndicator extends TSchemaType<typeof WidgetIndicatorSchema> {}

export type TProcessIndicatorValue = TSchemaType<typeof ProcessIndicatorValueSchema>;

export interface IProcessIndicator extends TSchemaType<typeof ProcessIndicatorSchema> {}

export interface IProcessEventIndicator extends IProcessIndicator {}

export interface IProcessTransitionIndicator extends IProcessIndicator {}

export interface IWidgetSortingIndicator extends TSchemaType<typeof WidgetSortingIndicatorSchema> {}

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
}

export interface ICommonMeasures {
  name: string;
  formula: string;
}

export interface ICommonDimensions {
  name: string;
  formula: string;
}

export type TColumnIndicatorValue = TSchemaType<typeof ColumnIndicatorValueSchema>;

export enum EFormatOrFormattingMode {
  BASE = "BASE",
  TEMPLATE = "TEMPLATE",
}

/** Общий интерфейс разреза и меры */
export interface IWidgetColumnIndicator extends TSchemaType<typeof WidgetColumnIndicatorSchema> {}

export interface IWidgetDimensionHierarchy<
  D extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
> extends TSchemaType<typeof WidgetDimensionHierarchySchema<D>> {}

export type TDisplayedDimensionInHierarchy<
  T extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
> = T & {
  displayCondition: IWidgetDimensionHierarchy["displayCondition"];
};

export function getDisplayedDimensionInHierarchy<
  D extends IWidgetDimensionInHierarchy,
  H extends IWidgetDimensionHierarchy,
>(dimension: D, hierarchy: H): TDisplayedDimensionInHierarchy<D> {
  return {
    ...dimension,
    displayCondition: hierarchy.displayCondition,
  };
}

export interface IWidgetDimension extends TSchemaType<typeof WidgetDimensionSchema> {}

export type TWidgetDimensionUnion = IWidgetDimension | IWidgetDimensionInHierarchy;

export interface IWidgetDimensionInHierarchy
  extends TSchemaType<typeof WidgetDimensionInHierarchySchema> {}

export interface IWidgetMeasure extends TSchemaType<typeof WidgetMeasureSchema> {}

export interface IMarkdownMeasure extends TSchemaType<typeof MarkdownMeasureSchema> {}

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
  indicator: IWidgetColumnIndicator | IWidgetDimensionHierarchy | IWidgetDimensionInHierarchy
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

export type TWidgetIndicatorAggregationValue = TSchemaType<
  typeof WidgetIndicatorAggregationValueSchema
>;

export enum EEventAppearances {
  FIRST = "FIRST",
  LAST = "LAST",
}

export type TWidgetIndicatorConversionValue = TSchemaType<typeof WidgetIndicatorConversionValue>;

export type TWidgetIndicatorDurationValue = TSchemaType<typeof WidgetIndicatorDurationValue>;

export type TWidgetIndicatorTimeValue = TSchemaType<typeof WidgetIndicatorTimeValueSchema>;
