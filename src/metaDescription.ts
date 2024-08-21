import type { TNullable } from "./utilityTypes";
import type { ESimpleDataType } from "./data";
import type { EControlType, IControlRecord } from "./controls";
import type { EWidgetIndicatorType, IWidgetIndicator } from "./indicators";
import type { IWidgetsContext } from "./widgetContext";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { ICalculatorFactory } from "./calculators";
import type { EWidgetFilterMode } from "./settings/values";

export interface ILens<T extends TNullable<object>, Value> {
  get(obj: T): TNullable<Value>;
  set(obj: T, value: Value): void;
}

export type TValuePath = string | string[];
export type TRecordAccessor<Settings extends object, Value> = TValuePath | ILens<Settings, Value>;

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

export type TEmptyRecord = boolean | null | undefined;

/** Набор конфигураций, которые могут встречаться на уровне виджета */
export type TWidgetLevelRecord<Settings extends object> =
  | IControlRecord<Settings, any, EControlType>
  | IDividerRecord<Settings>
  | IGroupSetRecord
  | TEmptyRecord;

/** Набор конфигураций, которые могут встречаться на уровне группы */
export type TGroupLevelRecord<LevelGroupSettings extends object> =
  | IControlRecord<LevelGroupSettings, any, EControlType>
  | IDividerRecord<LevelGroupSettings>
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

export type TSelectFetchOptions = () => Promise<IAddButtonSelectOption[]>;
export type TSelectChildOptions = IAddButtonSelectOption[] | TSelectFetchOptions;

export interface ISelectBranchOption {
  type: ESelectOptionTypes.BRANCH;
  label: string;
  options: TSelectChildOptions;
  icon?: string;
  disabled?: boolean;
}

export interface ISelectLeafOption {
  type: ESelectOptionTypes.LEAF;
  label: string;
  value: string;
  onSelect: <T extends object>(
    value: string,
    update: <R extends object>(f: (prevItems: (T | R)[]) => (T | R)[]) => void
  ) => void;
  /** Строка в формате base64 */
  icon?: string;
  disabled?: boolean;
}

export type IAddButtonSelectOption =
  | ISelectDividerOption
  | ISelectGroupOption
  | ISelectBranchOption
  | ISelectLeafOption;

export type TCustomAddButtonSelectOption =
  | ISelectSystemOption<ECustomSelectTemplates>
  | IAddButtonSelectOption;

export type TMeasureAddButtonSelectOption = IAddButtonSelectOption;
export interface ICustomAddButtonProps {
  options: TSelectChildOptions;
  hasDropdown?: boolean;
  onClick?: ISelectLeafOption["onSelect"];
}

export interface IWidgetIndicatorMenuConfig {
  hideTablesColumnsOptions?: boolean;
  hideCommonOptions?: boolean;
  hideQuantityOption?: boolean;
}

export interface IMeasureMenuConfig extends IWidgetIndicatorMenuConfig {
  options?: TMeasureAddButtonSelectOption[];
}

export interface ISortingMenuConfig extends IWidgetIndicatorMenuConfig {}

/** Кнопка добавления группы в набор */
type TAddButton =
  | {
      title: string;
      indicatorType: Exclude<
        EWidgetIndicatorType,
        EWidgetIndicatorType.CUSTOM | EWidgetIndicatorType.MEASURE | EWidgetIndicatorType.SORTING
      >;
    }
  | {
      title: string;
      indicatorType: EWidgetIndicatorType.CUSTOM;
      props: ICustomAddButtonProps;
    }
  | {
      title: string;
      indicatorType: EWidgetIndicatorType.MEASURE;
      menuConfig?: IMeasureMenuConfig;
    }
  | {
      title: string;
      indicatorType: EWidgetIndicatorType.SORTING;
      menuConfig?: ISortingMenuConfig;
    };

interface IAutoIdentifiedArrayItem {
  /**
   * Идентификатор, добавляемый системой "на лету" для удобства разработки, не сохраняется на сервер.
   * Гарантируется уникальность id в пределах settings виджета.
   */
  id: number;
}

export interface IGroupSettings extends IAutoIdentifiedArrayItem, Record<string, any> {}

/** Конфигурация набора групп */
export interface IGroupSetDescription<Settings extends object, GroupSettings extends object> {
  /** Заголовок */
  title: string;
  /** Максимальное количество групп в наборе  */
  maxCount: number;
  /** Описание доступа к настройкам групп */
  accessor: TRecordAccessor<Settings, GroupSettings[]>;
  /** Кнопки добавления группы в набор */
  addButtons: TAddButton[];
  /** Создать элементы управления внутри группы (для вкладки настроек данных) */
  createDataRecords?(group: IGroupSettings): TGroupLevelRecord<GroupSettings>[];
  /** Создать элементы управления внутри группы (для вкладки настроек отображения) */
  createDisplayRecords?(group: IGroupSettings): TGroupLevelRecord<GroupSettings>[];
  /** Получить название для плашки */
  getGroupTitle?(group: IGroupSettings): string;
  /** Валидная ли группа */
  isValid?(group: IGroupSettings): boolean;
  /** Находится ли группа в состоянии загрузки */
  isLoading?(group: IGroupSettings): boolean;
  /** Можно ли удалять группу по умолчанию true */
  isRemovable?(group: IGroupSettings): boolean;
  /** Можно ли сортировать группу по умолчанию true */
  isDraggable?: boolean;
  /** Опциональный верхний отступ для группы */
  marginTop?: number;
}

/** Конфигурация левой панели */
export interface IPanelDescription<
  Settings extends object,
  GroupSettings extends IGroupSettings = IGroupSettings,
> {
  /** Добавить заголовок для виджета */
  useTitle?: boolean;
  /** Добавить описание для виджета */
  useMarkdown?: boolean;
  /** Конфигурация настроек данных виджета */
  dataRecords?: TWidgetLevelRecord<Settings>[];
  /** Конфигурация настроек отображения виджета */
  displayRecords?: TWidgetLevelRecord<Settings>[];
  /** Конфигурации наборов групп  */
  groupSetDescriptions?: Record<string, IGroupSetDescription<Settings, GroupSettings>>;
  /** Конфигурация настроек фильтров */
  filtrationRecords?: Exclude<TWidgetLevelRecord<Settings>, IGroupSetRecord>[];
  /** Режимы фильтрации */
  filtrationModes?: EWidgetFilterMode[];
}

export interface IWidgetProcess {
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
  caseIdDataType: ESimpleDataType;
  /** Тип данных времени события */
  eventTimeDataType: ESimpleDataType;
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
    context: IWidgetsContext,
    panelSettings: Settings,
    calculatorFactory: ICalculatorFactory
  ): IPanelDescription<Settings, GroupSettings>;
}
