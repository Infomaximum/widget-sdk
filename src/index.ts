/// <reference types="@infomaximum/global-types" />

import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { IWidgetApiProps, IWidgetClass } from "./widgetApi";
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
export * from "./utils";

declare global {
  interface Infomaximum {
    defineWidget: <
      Props extends IWidgetApiProps<WidgetSettings>,
      WidgetSettings extends IBaseWidgetSettings,
      GroupSettings extends Record<string, any>,
    >(
      uuid: string,
      Widget: IWidgetClass<Props, WidgetSettings, GroupSettings>
    ) => void;
  }
}
