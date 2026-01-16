import type { IGroupSettings, IPanelDescriptionCreator } from "./metaDescription";
import type { IWidgetPresetSettings } from "./preset";
import type { IWidgetMigrator, IWidgetStruct, TMigrationStruct } from "./migrates";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";
import type { IGlobalContext } from "./widgetContext";
import type { z as Zod, ZodType } from "zod";
import type { ELanguages } from "@infomaximum/localization";

/** Используется для вывода типа настроек виджета по описанной схеме в методе `createSettingsSchema`
 */
export type TSettingsOf<
  D extends IDefinition<B, any, any>,
  B extends IBaseWidgetSettings = IBaseWidgetSettings,
> = D["createSettingsSchema"] extends (z: typeof Zod) => infer Schema
  ? Schema extends ZodType
    ? Zod.infer<Schema> & B
    : B
  : B;

export interface ISchemaContext {
  language: ELanguages;
}

export interface IDefinition<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
  GroupSettings extends IGroupSettings = IGroupSettings,
  MigrationStruct extends TMigrationStruct = IWidgetStruct,
> {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;
  /** возвращает zod-схему настроек виджета */
  createSettingsSchema: (z: typeof Zod, context: ISchemaContext) => ZodType<WidgetSettings>;
  /** возвращает конфигурацию панели настроек */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, GroupSettings>;
  /** обеспечивает консистентность настроек */
  fillSettings?: IFillSettings<WidgetSettings>;
  /** получить начальные настройки виджета, используя заданный пользователем шаблон настроек */
  getInitialSettings?: (settings: Partial<IWidgetPresetSettings>) => Partial<IBaseWidgetSettings>;
  /** возвращает ключи показателей(разрезов или мер), для которых должна работать системная сортировка */
  getSortableIndicatorsKeys?(): Readonly<StringKeyOf<WidgetSettings>[]>;
  /** Регистрация миграторов виджета */
  registerMigrateProcessors?(
    migrator: IWidgetMigrator<MigrationStruct>,
    globalContext: IGlobalContext
  ): void;
}
