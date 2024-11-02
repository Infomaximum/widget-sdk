import type { ELanguages } from "@infomaximum/localization";
import type { IWidgetProcess } from "./metaDescription";
import type { TNullable } from "./utilityTypes";
import type {
  ICommonDimensions,
  ICommonMeasures,
  ICommonState,
  TSystemVariable,
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

interface IScriptField {
  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated */
  guid: string;
  name: string;
  dataType: ESimpleDataType;
  isRequired: boolean;
}

export interface IActionScript {
  key: string;
  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated */
  guid: string;
  name: string;
  fields: IScriptField[];
}

export interface IWidgetTable {
  /** Имя таблицы */
  name: string;
  /** Колонки таблицы */
  columns: Map<string, IWidgetTableColumn>;
}

/**
 * simplified - упрощенный (для работы фильтрации в образах, открытых в модальном/боковом окне)
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
  /** Используемый язык системы */
  language: ELanguages;
  /** Имя отчета */
  reportName: string;
  /** Имена образов по их ключу(в текущем отчете) */
  viewNameByKey: Map<string, string>;

  /** Режим отображения виджетов */
  displayMode: TDisplayMode;
  /** Режим фильтрации виджетов */
  filtrationMode: TFiltrationMode;

  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated имя группы пространства по ее id */
  workspaceGroupNameById: Map<number, string>;

  /** Меры уровня отчета */
  reportMeasures: TNullable<Map<string, ICommonMeasures>>;
  /** Меры уровня пространства(из модели данных) */
  workspaceMeasures: TNullable<Map<string, Map<string, ICommonMeasures>>>;

  /** Разрезы уровня отчета */
  reportDimensions: TNullable<Map<string, ICommonDimensions>>;
  /** Разрезы уровня пространства(из модели данных) */
  workspaceDimensions: TNullable<Map<string, Map<string, ICommonDimensions>>>;

  /** Правила отображения уровня */
  reportDisplayRules: Map<string, IDisplayRule>;
  /** Правила отображения уровня пространства(из модели данных) */
  workspaceDisplayRules: Map<string, Map<string, IDisplayRule>>;

  /** Пользовательские переменные уровня отчета */
  variables: Map<string, TWidgetVariable>;
  /** Метод установки значения пользовательской переменной уровня отчета */
  setVariableValue(name: string, value: TNullable<string> | string[]): void;
  /** Системные переменные */
  systemVariables: Map<string, TSystemVariable>;

  /** Состояния(название сущности) отчета */
  states: Map<string, ICommonState>;
  /** Процессы из модели данных */
  processes: Map<string, IWidgetProcess>;
  /** Имена таблиц из модели данных */
  tables: Set<string>;
  /** Функция для запроса информации о колонках таблицы из модели данных */
  fetchColumnsByTableName(tableName: string): Promise<IWidgetTableColumn[] | undefined>;
  /** Скрипты, доступные для запуска из отчета */
  scripts: Map<string, IActionScript>;
}
