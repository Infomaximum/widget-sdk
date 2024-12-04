import type { TActionsOnClick } from "./actions";
import type { ESimpleDataType } from "./data";
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
  value?: TColumnIndicatorValue;
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

export interface IWidgetDimension extends IWidgetColumnIndicator {
  hideEmptyValues: boolean;
}

export interface IWidgetMeasure extends IWidgetColumnIndicator {}

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
}

export interface IWidgetStaticVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.STATIC;
  /** Значение */
  value: string;
  /** Обобщенный тип данных */
  simpleInputType: ESimpleInputType;
}

export interface IWidgetStaticListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.STATIC_LIST;
  /** Значение */
  value: string | string[];
  /** Элементы статического списка */
  options: string[];
  /** Множественный выбор */
  multipleChoice: boolean;
}

export interface IWidgetDynamicListVariable extends IBaseWidgetVariable {
  /** Тип переменной */
  type: EIndicatorType.DYNAMIC_LIST;
  /** Значение */
  value: string | string[];
  /** Формула для отображения списка */
  listFormula: TNullable<string>;
  /** Тип данных */
  dbDataType: string;
  /** Множественный выбор */
  multipleChoice: boolean;
  /** Фильтры */
  filters: TExtendedFormulaFilterValue[];
}

export type TWidgetVariable =
  | IWidgetStaticVariable
  | IWidgetStaticListVariable
  | IWidgetDynamicListVariable;

export function isDimensionsHierarchy(
  indicator: IWidgetColumnIndicator
): indicator is IWidgetDimensionHierarchy {
  return "hierarchyDimensions" in indicator;
}
