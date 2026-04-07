import type { IPanelDescriptionCreator } from "./metaDescription";
import type { IMigrateContext, IWidgetMigrator, IWidgetStruct, TApiVersion } from "./migrates";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";
import type { IGlobalContext } from "./widgetContext";
import type { z as Zod, ZodType } from "zod";
import type { ELanguages } from "@infomaximum/localization";
import type { IControlProps, TControlsSpecMap } from "./controls";
import type { ILifecycleRuntimeFactory } from "./utils/lifecycleRuntime";
import type { TZod } from "./zod.types";

/** Используется для вывода типа настроек виджета по описанной схеме в методе `createSettingsSchema` */
export type TSettingsOf<
  D extends IDefinition<B>,
  B extends IBaseWidgetSettings = IBaseWidgetSettings,
> = D["createSettingsSchema"] extends (z: TZod) => infer Schema
  ? Schema extends ZodType
    ? Zod.infer<Schema> & B
    : B
  : B;

export interface ISchemaContext {
  language: ELanguages;
}

/**
 * Описывает историческую (source) схему настроек - входной слепок перед миграцией.
 *
 * Инфраструктурный контракт состояния данных непосредственно перед миграцией
 * на указанную версию.
 *
 * Используется системой для:
 * 1) валидации входных настроек перед миграцией.
 * 2) (опционально) автоматической системной миграции.
 */
export interface IHistoricalSchemaDefinition extends IMigrateContext {
  /**
   * Целевая системная версия API, на которую выполняется миграция.
   * Схема описывает состояние настроек непосредственно перед этой миграцией.
   */
  apiVersion: TApiVersion;

  /**
   * Целевая локальная версия API виджета, на которую выполняется миграция.
   *
   * Как правило, не используется для автоматических миграций.
   * Может быть указана для валидации настроек перед локальными миграциями виджета.
   */
  localApiVersion?: `${number}`;

  /**
   * Фабрика схемы, описывающая корректное состояние настроек
   * непосредственно перед миграцией на указанную версию (source-схема).
   */
  schema: (z: TZod, context: ISchemaContext) => ZodType;

  /** Тип виджета, актуальный на момент указанной `schema` (перед миграцией) */
  type: string;
}

export type IDefinition<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
  CustomControlsSpecMap extends TControlsSpecMap = {},
> = {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;
  /** возвращает zod-схему настроек виджета */
  createSettingsSchema: (z: TZod, context: ISchemaContext) => ZodType<WidgetSettings>;
  /** возвращает конфигурацию панели настроек */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, CustomControlsSpecMap>;
  /** обеспечивает консистентность настроек */
  fillSettings?: IFillSettings<WidgetSettings>;
  /** возвращает ключи показателей(разрезов или мер), для которых должна работать системная сортировка */
  getSortableIndicatorsKeys?(): Readonly<StringKeyOf<WidgetSettings>[]>;
  /** Регистрация миграторов виджета */
  registerMigrateProcessors?(
    migrator: IWidgetMigrator<IWidgetStruct>,
    globalContext: IGlobalContext
  ): void;
  /**
   * Возвращает историю схем настроек виджета.
   *
   * Роль:
   * - Декларативное объявление доступных source-схем для миграций
   *   на указанные версии.
   *
   * Поведение:
   * - Порядок элементов не влияет на поведение.
   * - При объявлении одной apiVersion несколько раз используется последняя запись.
   * - Допустимо возвращать частичную историю (не все версии).
   *
   * Ограничения:
   * - Метод опционален.
   * - Отсутствие истории не влияет на работоспособность ручных миграций.
   *
   * @example
   * Переход системы с apiVersion "17" на "18".
   *
   * Для срабатывания автоматической миграции виджет должен объявить:
   * {
   *   apiVersion: "18",
   *   schema: ...
   * }
   *
   * Эта схема будет использована системой как контракт состояния
   * непосредственно перед переходом на "18".
   */
  createSettingsSchemaHistory?(): IHistoricalSchemaDefinition[];
} & TCustomControlsCapability<CustomControlsSpecMap>;

/**
 * Условно добавляет поле `customControls` в контракт виджета.
 *
 * Логика:
 * - Если `CustomControlsSpecMap` пустой - поле запрещено (`never`),
 *   чтобы не допускать декларацию несуществующих контролов.
 * - Если `CustomControlsSpecMap` содержит ключи - поле становится обязательным,
 *   заставляя разработчика реализовать factory для каждого контрола.
 */
type TCustomControlsCapability<CustomControlsSpecMap extends TControlsSpecMap> =
  keyof CustomControlsSpecMap extends never
    ? { customControls?: never }
    : { customControls: TCustomControlFactories<CustomControlsSpecMap> };

/** Registry factory-функций, создающих runtime кастомных контролов */
export type TCustomControlFactories<ControlsSpecMap extends TControlsSpecMap = TControlsSpecMap> = {
  [K in keyof ControlsSpecMap]: ILifecycleRuntimeFactory<IControlProps<ControlsSpecMap[K]>>;
};
