import type { IGroupSettings, IPanelDescriptionCreator } from "./metaDescription";
import type { IWidgetPresetSettings } from "./preset";
import type { IWidgetMigrator, IWidgetStruct, TMigrationStruct } from "./migrates";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";
import type { IGlobalContext } from "./widgetContext";
import type { z as Zod, ZodSchema } from "zod";

/** Используется для вывода типа настроек виджета по описанной схеме в методе `createSettingsScheme`
 */
export type TSettingsOf<
  D extends IDefinition<B, any, any>,
  B extends IBaseWidgetSettings = IBaseWidgetSettings,
> = D["createSettingsScheme"] extends (z: typeof Zod) => infer Schema
  ? Schema extends ZodSchema
    ? Zod.infer<Schema> extends infer T
      ? T & B
      : B
    : B
  : B;

export interface IDefinition<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
  GroupSettings extends IGroupSettings = IGroupSettings,
  MigrationStruct extends TMigrationStruct = IWidgetStruct,
> {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;
  /** метод удаляет настройки, наследуемые от темы и возвращает функцию отката, которая возвращает удаленные настройки */
  cleanupThemeProperties?: (settings: WidgetSettings) => (settings: WidgetSettings) => void;
  /** возвращает zod-схему настроек виджета */
  createSettingsScheme?: (z: typeof Zod) => ZodSchema<WidgetSettings>;
  /** возвращает конфигурацию настроек для отображения */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, GroupSettings>;
  /** заполняет настройки значениями по умолчанию */
  fillSettings: IFillSettings<WidgetSettings>;
  /** получить начальные настройки виджета, используя заданный пользователем шаблон настроек */
  getInitialSettings?: (settings: Partial<IWidgetPresetSettings>) => Partial<IBaseWidgetSettings>;
  /** возвращает ключи показателей(разрезов или мер), для которых должна работать системная сортировка */
  getSortableIndicatorsKeys?(): Readonly<StringKeyOf<WidgetSettings>[]>;
  /** Регистрация системных миграторов виджета */
  registerSystemMigrateProcessors?(
    migrator: IWidgetMigrator<MigrationStruct>,
    globalContext: IGlobalContext
  ): void;
  /** Регистрация собственных миграторов виджета */
  registerLocalMigrateProcessors?(
    migrator: IWidgetMigrator<MigrationStruct>,
    globalContext: IGlobalContext
  ): void;
  /** Возвращает массив версий локальных миграций виджета */
  getLocalMigrateVersions(): string[];
}
