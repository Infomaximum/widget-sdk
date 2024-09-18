import type { ELanguages } from "@infomaximum/localization";
import type { IWidgetProcess } from "./metaDescription";
import type { TNullable } from "./utilityTypes";
import type {
  ICommonDimensions,
  ICommonMeasures,
  ICommonState,
  TWidgetVariable,
} from "./indicators";
import type { ESimpleDataType } from "./data";
import type { TColor } from "./color";

export interface IWidgetTableColumn {
  /** Имя колонки */
  name: string;
  /** Тип данных колонки */
  dataType: ESimpleDataType;
}

interface IScripField {
  guid: string;
  name: string;
  dataType: ESimpleDataType;
}

export interface IActionScript {
  key: string;
  /** @deprecated удалить после выполнения BI-13602, задача BI-13650 */
  guid: string;
  name: string;
  fields: IScripField[];
}

export interface IWidgetTable {
  /** Имя таблицы */
  name: string;
  /** Колонки таблицы */
  columns: Map<string, IWidgetTableColumn>;
}

/**
 * simplified - упрощенный для работы фильтрации в образах открытых в дровере/модальном окне
 *
 * full - полный
 */
export type TFiltrationMode = "simplified" | "full";

/**
 * preview - упрощенный
 *
 * full - полный
 */
export type TDisplayMode = "preview" | "full";

export interface IDisplayRule {
  color: TColor;
}

export interface IGlobalContext {
  /** используемый язык в системе */
  language: ELanguages;
  processes: Map<string, IWidgetProcess>;
  reportMeasures: TNullable<Map<string, ICommonMeasures>>;
  workspaceMeasures: TNullable<Map<string, Map<string, ICommonMeasures>>>;
  reportDimensions: TNullable<Map<string, ICommonDimensions>>;
  workspaceDimensions: TNullable<Map<string, Map<string, ICommonDimensions>>>;
  /** @deprecated удалить после окончания поддержки миграций BI-13650 */
  workspaceGroupNameById: Map<number, string>;
  /** Переменные отчета */
  variables: Map<string, TWidgetVariable>;
  /** Метод установки значения переменной отчета */
  setVariableValue(name: string, value: TNullable<string> | string[]): void;
  states: Map<string, ICommonState>;
  reportName: string;
  /** Режим отображения виджета */
  displayMode: TDisplayMode;
  scripts: Map<string, IActionScript>;
  tables: Set<string>;
  filtrationMode: TFiltrationMode;
  reportDisplayRules: Map<string, IDisplayRule>;
  workspaceDisplayRules: Map<string, Map<string, IDisplayRule>>;
  viewNameByKey: Map<string, string>;
  fetchColumnsByTableName(tableName: string): Promise<IWidgetTableColumn[] | undefined>;
}
