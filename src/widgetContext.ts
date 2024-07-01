import type { ELanguages } from "@infomaximum/localization";
import type { IWidgetProcess } from "./metaDescription";
import type { TNullable } from "./utilityTypes";
import type { ICommonColumnIndicator, TWidgetVariable } from "./indicators";
import type { ESimpleDataType } from "./data";
import type { TColor } from "./settings/values";

export interface IWidgetTableColumn {
  /** Имя колонки */
  name: string;
  /** Тип данных колонки */
  dataType: ESimpleDataType;
}

export interface IActionScript {
  name: string | undefined;
  fieldsNames: Set<string>;
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

export interface IWidgetsContext {
  /** используемый язык в системе */
  language: ELanguages;
  processes: Map<string, IWidgetProcess>;
  reportMeasures: TNullable<Map<string, ICommonColumnIndicator>>;
  workspaceMeasures: TNullable<Map<string, ICommonColumnIndicator>>;
  /** Переменные отчета */
  variables: Map<string, TWidgetVariable>;
  /** Метод установки значения переменной отчета */
  setVariableValue(name: string, value: TNullable<string> | string[]): void;
  statesNames: Set<string>;
  reportName: string;
  /**
   * режим дашборда
   * @deprecated 2401 - необходимо использовать displayMode */
  isViewMode: boolean;
  /** Режим отображения виджета */
  displayMode: TDisplayMode;
  /** @deprecated необходимо получать из системной переменной "Login" */
  userLogin: string;
  scripts: Map<string, IActionScript>;
  tables: Set<string>;
  filtrationMode: TFiltrationMode;
  reportDisplayRules: Map<string, IDisplayRule>;
  workspaceDisplayRules: Map<number, Map<string, IDisplayRule>>;
  viewKeyByName: Map<string, string>;
  fetchColumnsByTableName(tableName: string): Promise<IWidgetTableColumn[] | undefined>;
}
