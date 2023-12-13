import type { ESimpleDataType } from "./data";
import type { EFormatTypes, EFormattingPresets } from "./formatting";
import type { TDisplayCondition } from "./settings/values";
import type { TSortDirection, TWidgetSortingValue } from "./sorting";
import type { TNullable } from "./utilityTypes";

export enum EWidgetIndicatorType {
  MEASURE = "MEASURE",
  EVENT_INDICATOR = "EVENT_INDICATOR",
  TRANSITION_INDICATOR = "TRANSITION_INDICATOR",
  DIMENSION = "DIMENSION",
  DIMENSION_HIERARCHY = "DIMENSION_HIERARCHY",
  VARIABLE = "VARIABLE",
  SORTING = "SORTING",
  CUSTOM = "CUSTOM",
}

export enum EDbType {
  CH = "CH",
  HADOOP = "HADOOP",
}

export interface IWidgetIndicator {
  /** Идентификатор, генерируемый на основе текущего времени */
  id: number;
  type: EWidgetIndicatorType;
  name: string;
}

export type TProcessIndicatorValue =
  | { mode: EWidgetIndicatorValueModes.FORMULA; formula: string }
  | {
      mode: EWidgetIndicatorValueModes.TEMPLATE;
      /** Тип базы данных */
      dbType: EDbType;
      /** Имя шаблонной формулы, использующей колонку таблицы */
      templateName: string;
    };

/** Общий интерфейс разреза и меры */
export interface IProcessIndicator extends IWidgetIndicator {
  value?: TProcessIndicatorValue;
  /**
   * Тип данных. Добавляется в показатель автоматически
   * (нужен только для определения доступных форматов)
   */
  dataType?: ESimpleDataType;

  format?: EFormatTypes;
  formatting?: EFormattingPresets;
  formattingTemplate?: string;

  displayCondition?: TDisplayCondition;
}

export interface IProcessEventIndicator extends IProcessIndicator {
  type: EWidgetIndicatorType.EVENT_INDICATOR;
}

export interface IProcessTransitionIndicator extends IProcessIndicator {
  type: EWidgetIndicatorType.TRANSITION_INDICATOR;
}

/** Индикатор для сортировки */
export interface IWidgetSortingIndicator extends IWidgetIndicator {
  direction: TSortDirection;
  value: TWidgetSortingValue;
}

export enum EWidgetIndicatorValueModes {
  /** Готовая формула (как правило, введенная пользователем через редактор формул) */
  FORMULA = "FORMULA",
  /** Шаблон формулы, предоставляемый системой */
  TEMPLATE = "TEMPLATE",
  /** Id иерархии, необходимо для сортировки */
  HIERARCHY = "HIERARCHY",
  /** Id существующего в виджете меры, необходимо для сортировки */
  MEASURE_IN_WIDGET = "MEASURE_IN_WIDGET",
  /** Id существующего в виджете разреза, необходимо для сортировки */
  DIMENSION_IN_WIDGET = "DIMENSION_IN_WIDGET",
  /** Id существующего в дашборде разреза/меры, необходимо для сортировки */
  IN_DASHBOARD = "IN_DASHBOARD",
  /** Id существующего в пространстве разреза/меры, необходимо для сортировки */
  IN_WORKSPACE = "IN_WORKSPACE",
  /** Пункт количество */
  QUANTITY = "QUANTITY",
}

export interface ICommonColumnIndicator {
  guid: string;
  name: string;
  formula: string;
}
export type TColumnIndicatorValue =
  | { mode: EWidgetIndicatorValueModes.FORMULA; formula: string }
  | {
      mode: EWidgetIndicatorValueModes.TEMPLATE;
      /** Тип базы данных */
      dbType: EDbType;
      /** Имя шаблонной формулы, использующей колонку таблицы */
      templateName: string;
      /** Имя таблицы */
      tableName: string;
      /** Имя колонки */
      columnName: string;
    };

/** Общий интерфейс разреза и меры */
export interface IWidgetColumnIndicator extends IWidgetIndicator {
  value?: TColumnIndicatorValue;
  /**
   * Тип данных. Добавляется в показатель автоматически
   * (нужен только для определения доступных форматов)
   */
  dataType?: ESimpleDataType;

  format?: EFormatTypes;
  formatting?: EFormattingPresets;
  formattingTemplate?: string;
  displayCondition?: TDisplayCondition;
}

export interface IWidgetDimensionHierarchy<
  D extends IWidgetDimension = IWidgetDimension,
> {
  /** Идентификатор, генерируемый на основе текущего времени */
  id: number;
  type: EWidgetIndicatorType.DIMENSION_HIERARCHY;
  name: string;
  dimensions: D[];
  displayCondition?: TDisplayCondition;
}

export interface IWidgetDimension extends IWidgetColumnIndicator {
  type: EWidgetIndicatorType.DIMENSION;
  hideEmptyValues: boolean;
}

export interface IWidgetMeasure extends IWidgetColumnIndicator {
  type: EWidgetIndicatorType.MEASURE;
}

/** Тип показателя */
export enum EIndicatorType {
  /** Показатели процесса */
  PROCESS_MEASURE = "PROCESS_MEASURE",
  /** Статичное значение */
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

export type TWidgetVariable =
  | {
      /** Тип переменной */
      type: EIndicatorType.STATIC;
      /** Имя переменной */
      name: string;
      /** Значение */
      value: string;
      /** Дефолтное значение */
      defaultValue: string;
      /** Тип данных */
      dataType: ESimpleDataType;
    }
  | {
      /** Тип переменной */
      type: EIndicatorType.STATIC_LIST;
      /** Имя переменной */
      name: string;
      /** Значение */
      value: TNullable<string> | string[];
      /** Дефолтное значение */
      defaultValue: TNullable<string>;
      /** Элементы статического списка */
      options: TNullable<string>[];
      /** Тип данных */
      dataType: ESimpleDataType.STRING;
      /** Множественный выбор */
      multipleChoice: boolean;
    }
  | {
      /** Тип переменной */
      type: EIndicatorType.DYNAMIC_LIST;
      /** Имя переменной */
      name: string;
      /** Значение */
      value: string | string[];
      /** Дефолтное значение */
      defaultValue: string;
      /** Формула для отображения списка */
      listFormula: TNullable<string>;
      /** Тип данных */
      dataType: ESimpleDataType;
      /** Множественный выбор */
      multipleChoice: boolean;
    };

export function isHierarchy(
  indicator: IWidgetColumnIndicator
): indicator is IWidgetDimensionHierarchy {
  return indicator.type === EWidgetIndicatorType.DIMENSION_HIERARCHY;
}
