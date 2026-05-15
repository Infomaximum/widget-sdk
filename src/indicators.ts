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
  WidgetIndicatorConversionValueSchema,
  WidgetIndicatorDurationValueSchema,
  WidgetIndicatorSchema,
  WidgetIndicatorTimeValueSchema,
  WidgetMeasureSchema,
  WidgetSortingIndicatorSchema,
} from "./indicators.schema";
import type { TNullable } from "./utilityTypes";
import type { TSchemaType, TSortingValue } from ".";
import { VersionedEnum } from "./versionedEnum";

export const EWidgetIndicatorType = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      MEASURE: "MEASURE",
      EVENT_INDICATOR: "EVENT_INDICATOR",
      TRANSITION_INDICATOR: "TRANSITION_INDICATOR",
      DIMENSION: "DIMENSION",
      SORTING: "SORTING",
    } as const,
  },
});

export type TWidgetIndicatorType = Extract<
  (typeof EWidgetIndicatorType)[keyof typeof EWidgetIndicatorType],
  string
>;

export const EOuterAggregation = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      avg: "avg",
      median: "median",
      count: "count",
      countDistinct: "countDistinct",
      min: "min",
      max: "max",
      sum: "sum",
      top: "top",
    } as const,
  },
});

export type TOuterAggregation = Extract<
  (typeof EOuterAggregation)[keyof typeof EOuterAggregation],
  string
>;

export interface IWidgetIndicator extends TSchemaType<typeof WidgetIndicatorSchema> {}

export type TProcessIndicatorValue = TSchemaType<typeof ProcessIndicatorValueSchema>;

export interface IProcessIndicator extends TSchemaType<typeof ProcessIndicatorSchema> {}

export interface IProcessEventIndicator extends IProcessIndicator {}

export interface IProcessTransitionIndicator extends IProcessIndicator {}

export interface IWidgetSortingIndicator extends TSchemaType<typeof WidgetSortingIndicatorSchema> {}

/** Режимы значения показателя (на основе чего генерируется формула) */
export const EWidgetIndicatorValueModes = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      /** Готовая формула (как правило, введенная пользователем через редактор формул) */
      FORMULA: "FORMULA",
      /** Шаблон формулы, предоставляемый системой */
      TEMPLATE: "TEMPLATE",
      AGGREGATION: "AGGREGATION",
      DURATION: "DURATION",
      CONVERSION: "CONVERSION",
      START_TIME: "START_TIME",
      END_TIME: "END_TIME",
    } as const,
  },
});

export type TWidgetIndicatorValueModes = Extract<
  (typeof EWidgetIndicatorValueModes)[keyof typeof EWidgetIndicatorValueModes],
  string
>;

/** Режимы сортировки (на что ссылается сортировка) */
export const ESortingValueModes = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      /** Сортировка по формуле */
      FORMULA: "FORMULA",
      /** Сортировка по показателю(разрезу или мере) виджета */
      IN_WIDGET: "IN_WIDGET",
    } as const,
  },
});

export type TSortingValueModes = Extract<
  (typeof ESortingValueModes)[keyof typeof ESortingValueModes],
  string
>;

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

export const EFormatOrFormattingMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      BASE: "BASE",
      TEMPLATE: "TEMPLATE",
    } as const,
  },
});

export type TFormatOrFormattingMode = Extract<
  (typeof EFormatOrFormattingMode)[keyof typeof EFormatOrFormattingMode],
  string
>;

/** Общий интерфейс разреза и меры */
export interface IWidgetColumnIndicator extends TSchemaType<typeof WidgetColumnIndicatorSchema> {}

export interface IWidgetDimensionHierarchy<
  D extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
> extends TSchemaType<typeof WidgetDimensionHierarchySchema<D>> {}

export type TConditionalDimensionInHierarchy<
  T extends IWidgetDimensionInHierarchy = IWidgetDimensionInHierarchy,
> = T & {
  displayCondition: IWidgetDimensionHierarchy["displayCondition"];
};

export function inheritDisplayConditionFromHierarchy<
  D extends IWidgetDimensionInHierarchy,
  H extends IWidgetDimensionHierarchy,
>(dimension: D, hierarchy: H): TConditionalDimensionInHierarchy<D> {
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
export const EIndicatorType = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      /** Показатели процесса */
      PROCESS_MEASURE: "PROCESS_MEASURE",
      /** Вводимое значение */
      STATIC: "STATIC",
      /** Статический список */
      STATIC_LIST: "STATIC_LIST",
      /** Динамический список */
      DYNAMIC_LIST: "DYNAMIC_LIST",
      /** Список колонок */
      COLUMN_LIST: "COLUMN_LIST",
      /** Разрез */
      DIMENSION: "DIMENSION",
      /** Мера */
      MEASURE: "MEASURE",
      /** Иерархия */
      DYNAMIC_DIMENSION: "DYNAMIC_DIMENSION",
      /** Пользовательская сортировка */
      USER_SORTING: "USER_SORTING",
    } as const,
  },
});

export type TIndicatorType = Extract<(typeof EIndicatorType)[keyof typeof EIndicatorType], string>;

interface IBaseWidgetVariable {
  /** Имя переменной */
  name: string;
}

/** Обобщенные типы значений переменных */
export const ESimpleInputType = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      /** Число (точность Float64) */
      NUMBER: "FLOAT",
      /** Целое число (точность Int64) */
      INTEGER_NUMBER: "INTEGER",
      /** Текст */
      TEXT: "STRING",
      /** Дата (точность Date) */
      DATE: "DATE",
      /** Дата и время (точность DateTime64) */
      DATE_AND_TIME: "DATETIME",
      /** Логический тип */
      BOOLEAN: "BOOLEAN",
    } as const,
  },
});

export type TSimpleInputType = Extract<
  (typeof ESimpleInputType)[keyof typeof ESimpleInputType],
  string
>;

export interface IWidgetStaticVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: typeof EIndicatorType.STATIC;
  /** Значение */
  value: string | null;
  /** Обобщенный тип данных */
  simpleInputType: TSimpleInputType;
}
export interface IStaticListLabeledOption {
  value: string;
  label: string;
}

export interface IWidgetStaticListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: typeof EIndicatorType.STATIC_LIST;
  /** Значение */
  value: string | string[] | null;
  /** Объект ключ значение для статического списка  */
  labeledOptions: IStaticListLabeledOption[];
  /** Множественный выбор */
  multipleChoice: boolean;
}

export interface IWidgetDynamicListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: typeof EIndicatorType.DYNAMIC_LIST;
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
  /** Сортировка для `listFormula` */
  sorting?: TSortingValue;
}

export interface IWidgetColumnListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: typeof EIndicatorType.COLUMN_LIST;
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

export const OuterAggregation = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      avg: "avgIf",
      median: "medianIf",
      count: "countIf",
      countDistinct: "countIfDistinct",
      min: "minIf",
      max: "maxIf",
      sum: "sumIf",
    } as const,
  },
});

export type TOuterAggregationIf = Extract<
  (typeof OuterAggregation)[keyof typeof OuterAggregation],
  string
>;

export const EDurationTemplateName = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      avg: "avg",
      median: "median",
    } as const,
  },
});

export type TDurationTemplateName = Extract<
  (typeof EDurationTemplateName)[keyof typeof EDurationTemplateName],
  string
>;

export type TWidgetIndicatorAggregationValue = TSchemaType<
  typeof WidgetIndicatorAggregationValueSchema
>;

export const EEventAppearances = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      FIRST: "FIRST",
      LAST: "LAST",
    } as const,
  },
});

export type TEventAppearances = Extract<
  (typeof EEventAppearances)[keyof typeof EEventAppearances],
  string
>;

export type TWidgetIndicatorConversionValue = TSchemaType<
  typeof WidgetIndicatorConversionValueSchema
>;

export type TWidgetIndicatorDurationValue = TSchemaType<typeof WidgetIndicatorDurationValueSchema>;

export type TWidgetIndicatorTimeValue = TSchemaType<typeof WidgetIndicatorTimeValueSchema>;
