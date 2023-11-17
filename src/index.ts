/// <reference types="@infomaximum/global-types" />

import type { IBaseWidgetSettings } from "./settings/baseWidget.types";
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
export * from "./settings/baseWidget.types";
export * from "./settings/values.types";
export * from "./sorting";
export * from "./widgetContext";

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
