import type { ELanguages } from "@infomaximum/localization";
import type { IWidgetProcess } from "./metaDescription";
import type { TNullable } from "./utilityTypes";
import type {
  ICommonDimensions,
  ICommonMeasures,
  ICommonState,
  TWidgetVariable,
} from "./indicators";
import type { TColor } from "./color";

export interface IWidgetTableColumn {
  /** Имя колонки */
  name: string;
  /** Тип данных колонки */
  dbDataType: string;
}

interface IScriptField {
  name: string;
  isRequired: boolean;
  isArray: boolean;
}

export interface IActionScript {
  key: string;
  name: string;
  fields: IScriptField[];
}

export interface IWidgetTable {
  /** Имя таблицы */
  name: string;
  /** Колонки таблицы */
  columns: Map<string, IWidgetTableColumn>;
}

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
  setVariableValue(name: string, value: TWidgetVariable["value"]): TWidgetVariable["value"];
  /** Метод очистки значения пользовательской переменной уровня отчета */
  unsetVariableValue(name: string): TWidgetVariable["value"];

  /** Состояния(название сущности) отчета */
  states: Map<string, ICommonState>;
  /** @deprecated Процессы из модели данных (по имени) */
  processes: Map<string, IWidgetProcess>;
  /** Процессы из модели данных (по ключу) */
  processByKey: Map<string, IWidgetProcess>;
  /** Имена таблиц из модели данных */
  tables: Set<string>;
  /** Функция для запроса информации о колонках таблицы из модели данных */
  fetchColumnsByTableName(tableName: string): Promise<IWidgetTableColumn[] | undefined>;
  /** Скрипты, доступные для запуска из отчета */
  scripts: Map<string, IActionScript>;
}
