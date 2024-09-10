import type { IGroupSettings, IPanelDescriptionCreator } from "./metaDescription";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";

export interface IDefinition<
  WidgetSettings extends IBaseWidgetSettings,
  GroupSettings extends IGroupSettings,
> {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;

  /** возвращает конфигурацию настроек для отображения */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, GroupSettings>;
  /** заполняет настройки значениями по умолчанию */
  fillSettings: IFillSettings<WidgetSettings>;
  /** возвращает ключи показателей(разрезов или мер), для которых должна работать системная сортировка */
  getSortableIndicatorsKeys(): Readonly<StringKeyOf<WidgetSettings>[]>;
}
