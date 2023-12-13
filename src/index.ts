/// <reference types="@infomaximum/global-types" />

import type { IGroupSettings } from "./metaDescription";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { IWidgetDefinition } from "./widgetApi";
export { ELanguages } from "@infomaximum/localization";
export { EFilteringMethodValues } from "@infomaximum/base-filter";

export * from "./widgetApi";
export * from "./actions";
export * from "./calculators";
export * from "./controls";
export * from "./data";
export * from "./filtration";
export * from "./formatting";
export * from "./indicators";
export * from "./metaDescription";
export * from "./placeholder";
export * from "./settings/baseWidget";
export * from "./settings/values";
export * from "./sorting";
export * from "./widgetContext";
export * from "./indicatorsFormulas";

declare global {
  interface Infomaximum {
    defineWidget: <
      WidgetSettings extends IBaseWidgetSettings,
      GroupSettings extends IGroupSettings,
    >(
      uuid: string,
      Widget: IWidgetDefinition<WidgetSettings, GroupSettings>
    ) => void;
  }
}
