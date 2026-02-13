import type { IPanelDescriptionCreator } from "./metaDescription";
import type { IWidgetPresetSettings } from "./preset";
import type { IWidgetMigrator, IWidgetStruct } from "./migrates";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";
import type { IGlobalContext } from "./widgetContext";
import type { z as Zod, ZodType } from "zod";
import type { ELanguages } from "@infomaximum/localization";
import type { IControlProps, TControlsMap } from "./controls";
import type { ILifecycleRuntimeFactory } from "./utils/lifecycleRuntime";

/** Используется для вывода типа настроек виджета по описанной схеме в методе `createSettingsSchema` */
export type TSettingsOf<
  D extends IDefinition<B>,
  B extends IBaseWidgetSettings = IBaseWidgetSettings,
> = D["createSettingsSchema"] extends (z: typeof Zod) => infer Schema
  ? Schema extends ZodType
    ? Zod.infer<Schema> & B
    : B
  : B;

export interface ISchemaContext {
  language: ELanguages;
}

export type IDefinition<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
  CustomControlsMap extends TControlsMap = {},
> = {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;
  /** возвращает zod-схему настроек виджета */
  createSettingsSchema: (z: typeof Zod, context: ISchemaContext) => ZodType<WidgetSettings>;
  /** возвращает конфигурацию панели настроек */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, CustomControlsMap>;
  /** обеспечивает консистентность настроек */
  fillSettings?: IFillSettings<WidgetSettings>;
  /** получить начальные настройки виджета, используя заданный пользователем шаблон настроек */
  getInitialSettings?: (settings: Partial<IWidgetPresetSettings>) => Partial<IBaseWidgetSettings>;
  /** возвращает ключи показателей(разрезов или мер), для которых должна работать системная сортировка */
  getSortableIndicatorsKeys?(): Readonly<StringKeyOf<WidgetSettings>[]>;
  /** Регистрация миграторов виджета */
  registerMigrateProcessors?(
    migrator: IWidgetMigrator<IWidgetStruct>,
    globalContext: IGlobalContext
  ): void;
} & TCustomControlsCapability<CustomControlsMap>;

/**
 * Условно добавляет поле `customControls` в контракт виджета.
 *
 * Логика:
 * - Если `CustomControlsMap` пустой - поле запрещено (`never`),
 *   чтобы не допускать декларацию несуществующих контролов.
 * - Если `CustomControlsMap` содержит ключи - поле становится обязательным,
 *   заставляя разработчика реализовать factory для каждого контрола.
 */
type TCustomControlsCapability<CustomControlsMap extends TControlsMap> =
  keyof CustomControlsMap extends never
    ? { customControls?: never }
    : {
        /** Кастомные контролы */
        customControls: {
          [K in keyof CustomControlsMap]: ILifecycleRuntimeFactory<
            IControlProps<CustomControlsMap[K]>
          >;
        };
      };
