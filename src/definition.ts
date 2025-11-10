import type { IGroupSettings, IPanelDescriptionCreator } from "./metaDescription";
import type { IWidgetPresetSettings } from "./preset";
import type { IWidgetMigrator, IWidgetStruct, TMigrationStruct } from "./migrates";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";
import type { IGlobalContext } from "./widgetContext";

export interface IDefinition<
  WidgetSettings extends IBaseWidgetSettings,
  GroupSettings extends IGroupSettings,
  MigrationStruct extends TMigrationStruct = IWidgetStruct,
> {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;

  /** возвращает конфигурацию настроек для отображения */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, GroupSettings>;
  /** заполняет настройки значениями по умолчанию */
  fillSettings: IFillSettings<WidgetSettings>;
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
