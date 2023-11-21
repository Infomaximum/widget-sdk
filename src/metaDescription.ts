import type { TNullable } from "./utilityTypes";
import type { ESimpleDataType } from "./data";
import type { EControlType, IControlRecord } from "./controls";
import type { EWidgetIndicatorType, IWidgetIndicator } from "./indicators";
import type { IWidgetsContext } from "./widgetContext";
import type { IBaseWidgetSettings } from "./settings/baseWidget";

// todo: удалить
export interface ILens<T extends TNullable<object>, Value> {
  get(obj: T): TNullable<Value>;
  set(obj: T, value: Value): void;
}

export type TValuePath = string | string[];
export type TRecordAccessor<Settings extends object, Value> =
  | TValuePath
  | ILens<Settings, Value>;

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

export interface ICustomAddButtonProps {
  options: { key: string; name: string }[];
  onSelect: (
    key: string,
    push: <T extends Omit<IWidgetIndicator, "id" | "type">>(
      indicator: T
    ) => void
  ) => void;
}

/** Кнопка добавления группы в набор */
type TAddButton =
  | {
      title: string;
      indicatorType: Exclude<EWidgetIndicatorType, EWidgetIndicatorType.CUSTOM>;
    }
  | {
      title: string;
      indicatorType: EWidgetIndicatorType.CUSTOM;
      props: ICustomAddButtonProps;
    };

/** Конфигурация набора групп */
export interface IGroupSetDescription<
  Settings extends object,
  GroupSettings extends object,
> {
  /** Заголовок */
  title: string;
  /** Максимальное количество групп в наборе  */
  maxCount: number;
  /** Описание доступа к настройкам групп */
  accessor: TRecordAccessor<Settings, GroupSettings[]>;
  /** Кнопки добавления группы в набор */
  addButtons: TAddButton[];
  /** Создать элементы управления внутри группы (для вкладки настроек данных) */
  createDataRecords?(
    indicator: IWidgetIndicator
  ): TGroupLevelRecord<GroupSettings>[];
  /** Создать элементы управления внутри группы (для вкладки настроек отображения) */
  createDisplayRecords?(
    indicator: IWidgetIndicator
  ): TGroupLevelRecord<GroupSettings>[];
  /** Получить название для плашки */
  getGroupTitle?(indicator: IWidgetIndicator): string;
  /** Валидная ли группа */
  isValid?(indicator: IWidgetIndicator): boolean;
}

/** Конфигурация левой панели */
export interface IPanelDescription<
  Settings extends object,
  GroupSettings extends object = object,
> {
  /** Конфигурация настроек данных виджета */
  dataRecords?: TWidgetLevelRecord<Settings>[];
  /** Конфигурация настроек отображения виджета */
  displayRecords?: TWidgetLevelRecord<Settings>[];
  /** Конфигурации наборов групп  */
  groupSetDescriptions?: Record<
    string,
    IGroupSetDescription<Settings, GroupSettings>
  >;
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
  GroupSettings extends object = object,
> extends IPanelDescription<Settings, GroupSettings> {}

export interface IPanelDescriptionCreator<
  Settings extends IBaseWidgetSettings,
  GroupSettings extends object,
> {
  (
    context: IWidgetsContext,
    panelSettings: Settings
  ): IPanelDescription<Settings, GroupSettings>;
}
