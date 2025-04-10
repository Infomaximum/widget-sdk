import type { TNullable } from "./utilityTypes";
import type { TControlUnion } from "./controls";
import type { EWidgetIndicatorType } from "./indicators";
import type { IGlobalContext } from "./widgetContext";
import type { IAutoIdentifiedArrayItem, IBaseWidgetSettings } from "./settings/baseWidget";
import type { ICalculatorFactory } from "./calculators";
import type { EWidgetFilterMode } from "./settings/values";
import type { EDimensionTemplateNames } from "./indicatorsFormulas";
import type { ESimpleDataType } from "./data";
import type { EFormatTypes } from "./formatting";

export interface ILens<T extends TNullable<object>, Value> {
  get(obj: T): TNullable<Value>;
  set(obj: T, value: Value): void;
}

/**
 * Линза, которая может вернуть Partial значение из get (будет обработано на стороне control'а),
 * но требует передачи в set полного значения
 */
interface IPartialLens<T extends TNullable<object>, Value> {
  get(obj: T): TNullable<Partial<Value>>;
  set(obj: T, value: Value): void;
}

export type TValuePath = string | string[];

export type TRecordAccessor<Settings extends object, Value> =
  | TValuePath
  | IPartialLens<Settings, Value>;

export interface IDisplayPredicate<Settings> {
  (s: Settings): boolean;
}

/** Конфигурация разделителя */
export interface IDividerRecord<Settings extends object = object> {
  type: "divider";
  shouldDisplay?: IDisplayPredicate<Settings>;
}

/** Конфигурация набора групп */
export interface IGroupSetRecord {
  type: "groupSet";
  groupSetKey: string;
}

/** Конфигурация коллапса */
export interface ICollapseRecord<Settings extends object = object> {
  key: string;
  type: "collapse";
  title?: string;
  records: TGroupLevelRecord<Settings>[];
}

export type TEmptyRecord = boolean | null | undefined;

/** Набор конфигураций, которые могут встречаться на уровне виджета */
export type TWidgetLevelRecord<Settings extends object> =
  | ICollapseRecord<Settings>
  | IDividerRecord<Settings>
  | IGroupSetRecord
  | TControlUnion<Settings>
  | TEmptyRecord;

/** Набор конфигураций, которые могут встречаться на уровне группы */
export type TGroupLevelRecord<LevelGroupSettings extends object> =
  | ICollapseRecord<LevelGroupSettings>
  | IDividerRecord<LevelGroupSettings>
  | TControlUnion<LevelGroupSettings>
  | TEmptyRecord;

export interface ISelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  rightIcon?: "fx" | string;
}

export enum ESelectOptionTypes {
  DIVIDER = "DIVIDER",
  SYSTEM = "SYSTEM",
  GROUP = "GROUP",
  BRANCH = "BRANCH",
  LEAF = "LEAF",
}
export enum ECustomSelectTemplates {
  FORMULA = "FORMULA",
  DIMENSION_GROUPS = "DIMENSION_GROUPS",
}

export interface ISelectDividerOption {
  type: ESelectOptionTypes.DIVIDER;
}

export interface ISelectSystemOption<T extends string = string> {
  type: ESelectOptionTypes.SYSTEM;
  template: T;
}

export interface ISelectGroupOption {
  type: ESelectOptionTypes.GROUP;
  label: string;
  options: IAddButtonSelectOption[];
  icon: string;
}

export interface ISelectNode {
  options: TCustomAddButtonSelectOption[];
  isAllRequested: boolean;
}

export type TSelectFetchNodes = (searchText?: string) => Promise<ISelectNode>;
export type TSelectChildOptions = TCustomAddButtonSelectOption[] | TSelectFetchNodes;

export interface ISelectBranchOption {
  type: ESelectOptionTypes.BRANCH;
  label: string;
  options: TSelectChildOptions;
  icon?: string;
  disabled?: boolean;
}

export interface ISelectLeafOption<U extends object> {
  type: ESelectOptionTypes.LEAF;
  label: string;
  value: string;
  onSelect: (value: string, update: (f: (prevItems: U) => U) => void) => void;
  /** Строка в формате base64 */
  icon?: string;
  disabled?: boolean;
}

export type IAddButtonSelectOption =
  | ISelectDividerOption
  | ISelectGroupOption
  | ISelectBranchOption
  | ISelectLeafOption<object[]>;

export type TCustomAddButtonSelectOption =
  | ISelectSystemOption<ECustomSelectTemplates>
  | IAddButtonSelectOption;

export type TMeasureAddButtonSelectOption = IAddButtonSelectOption;
export interface ICustomAddButtonProps {
  options: TSelectChildOptions;
  hasDropdown?: boolean;
  onClick?: ISelectLeafOption<object[]>["onSelect"];
}

export interface IWidgetIndicatorAddButtonProps {
  hideTablesColumnsOptions?: boolean;
  hideCommonOptions?: boolean;
  hideQuantityOption?: boolean;
}

export interface IMeasureAddButtonProps extends IWidgetIndicatorAddButtonProps {
  options?: TMeasureAddButtonSelectOption[];
}

export interface ISortingAddButtonProps extends IWidgetIndicatorAddButtonProps {}

export interface IInitialSettings extends Record<string, any> {}

/** Кнопка добавления группы в набор */
export type TAddButton = {
  title: string;
  props?: ICustomAddButtonProps | IMeasureAddButtonProps | ISortingAddButtonProps;
  /**
   * Начальные настройки, которые получит показатель при создании через кнопку добавления.
   * Возможность не поддерживается для иерархии разрезов.
   *
   * Кейс использования:
   * - Добавление поля type разрезам и мерам виджета "Таблица", т.к. разрезы и меры хранятся в одном массиве.
   */
  initialSettings?: IInitialSettings;
};

export interface IGroupSettings extends IAutoIdentifiedArrayItem, Record<string, any> {}

/** Конфигурация разреза */
export type TWidgetDimensionData = {
  type: EWidgetIndicatorType.DIMENSION;
  /** Обобщенные типы данных, поддерживаемые разрезом */
  simpleTypes?: ESimpleDataType[];
  /** Шаблоны формул, доступные для выбора в разрезе */
  templates?: Partial<Record<ESimpleDataType, EDimensionTemplateNames[]>>;
  /** Переопределение доступных форматов и их порядка */
  formats?: Record<ESimpleDataType, EFormatTypes[]>;
};

/** Конфигурация меры */
export type TWidgetMeasureData = {
  type: EWidgetIndicatorType.MEASURE;
  /** Переопределение доступных форматов и их порядка */
  formats?: Record<ESimpleDataType, EFormatTypes[]>;
};

/** Конфигурация показателя */
type TWidgetIndicatorData = TWidgetDimensionData | TWidgetMeasureData;

/**
 * Конфигурация набора групп настроек.
 *
 * Набор групп, как правило, представлен в настройках виджета в виде массива объектов.
 * Каждый объект в массиве - это группа настроек.
 *
 * Группа отображается в виде раскрываемой плашки, может представлять из себя разрез, меру, процесс и др.
 */
export interface IGroupSetDescription<Settings extends object, GroupSettings extends object> {
  /** Заголовок */
  title: string;
  /** Максимальное количество групп в наборе  */
  maxCount: number;
  /** Описание доступа к настройкам групп */
  accessor: TValuePath | ILens<Settings, GroupSettings[]>;

  /** Конфигурация кнопок добавления группы в набор */
  addButtons: TAddButton[];

  /** Получить название, отображаемое на плашке (по умолчанию используется поле name из группы) */
  getGroupTitle?(group: IGroupSettings, index: number): string;

  /**
   * Получить описание показателя для группы, если группа описывает системный показатель.
   *
   * Описание может использоваться для:
   * - отображения иконки показателя на плашке.
   * - предустановленного мета-описания показателя.
   * - содержимого выпадающего списка.
   */
  getIndicatorData?: (settings: IInitialSettings) => EWidgetIndicatorType | TWidgetIndicatorData;
  /** Создать конфигурацию группы для вкладки настроек данных */
  createDataRecords?(group: IGroupSettings, index: number): TGroupLevelRecord<GroupSettings>[];
  /** Создать конфигурацию группы для вкладки настроек отображения */
  createDisplayRecords?(group: IGroupSettings, index: number): TGroupLevelRecord<GroupSettings>[];

  /** Находится ли группа в состоянии загрузки (по умолчанию false) */
  isLoading?(group: IGroupSettings): boolean;
  /** Является ли группа валидной (по умолчанию true) */
  isValid?(group: IGroupSettings): boolean;
  /** Можно ли удалить группу (по умолчанию true) */
  isRemovable?(group: IGroupSettings): boolean;
  /** Можно ли менять порядок групп (по умолчанию true) */
  isDraggable?: boolean;

  /** Кастомный верхний отступ для набора групп */
  marginTop?: number;
}

/** Конфигурация панели настроек виджета */
export interface IPanelDescription<
  Settings extends object,
  GroupSettings extends IGroupSettings = IGroupSettings,
> {
  /** Добавить поле настройки заголовка */
  useTitle?: boolean;
  /** Добавить поле настройки описания */
  useMarkdown?: boolean;

  /** Конфигурация вкладки настроек данных */
  dataRecords?: TWidgetLevelRecord<Settings>[];
  /** Конфигурация вкладки настроек отображения */
  displayRecords?: TWidgetLevelRecord<Settings>[];

  /**
   * Конфигурация наборов(каждый набор по своему ключу) с группами настроек.
   * Описанный набор групп можно вставить по ключу в нужное место внутри dataRecords и displayRecords.
   */
  groupSetDescriptions?: Record<string, IGroupSetDescription<Settings, GroupSettings>>;

  /** Добавить вкладку с настройками действий (по умолчанию false) */
  useActions?: boolean;

  /** Добавить вкладку с настройками фильтрации (по умолчанию true) */
  useFiltration?: boolean;
  /** Конфигурация вкладки настроек фильтрации */
  filtrationRecords?: Exclude<TWidgetLevelRecord<Settings>, IGroupSetRecord>[];
  /** Доступные для выбора режимы фильтрации (во вкладке настроек фильтрации) */
  filtrationModes?: EWidgetFilterMode[];
}

export interface IWidgetProcess {
  // todo: удалить после окончания поддержки миграций [BI-13650]
  /** @deprecated */
  guid: string;
  /** Имя процесса */
  name: string;
  /** Формула имени события */
  eventNameFormula: string;
  /** Формула времени события */
  eventTimeFormula: string;
  /** Формула CaseId события */
  eventCaseIdFormula: string;
  /** Формула CaseId кейса */
  caseCaseIdFormula: string;
  /** Имя колонки CaseId события */
  eventCaseIdColumnName: string;
  /** Тип данных CaseId */
  caseIdDbDataType: string;
  /** Тип данных времени события */
  eventTimeDbDataType: string;
  /** Является ли процесс валидным */
  isValid: boolean;
}

/** Конфигурация левой панели при погружении на уровень вниз */
export interface IDivePanelDescription<
  Settings extends object,
  GroupSettings extends IGroupSettings = IGroupSettings,
> extends IPanelDescription<Settings, GroupSettings> {}

export interface IPanelDescriptionCreator<
  Settings extends IBaseWidgetSettings,
  GroupSettings extends IGroupSettings,
> {
  (
    /** Глобальный контекст */
    context: IGlobalContext,
    /** Настройки виджета */
    settings: Settings,
    /** Фабрика вычислителей */
    calculatorFactory: ICalculatorFactory
  ): IPanelDescription<Settings, GroupSettings>;
}

//todo: заполнить в рамках BI-13985
export enum ESystemRecordKey {
  formatting = "formatting",
}
