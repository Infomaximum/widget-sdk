/// <reference types="@infomaximum/global-types" />

import type { IGroupSettings } from "./metaDescription";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { IWidgetEntity, IWidgetManifest } from "./widgetApi";
export { ELanguages } from "@infomaximum/localization";
export { EFilteringMethodValues } from "@infomaximum/base-filter";

export * from "./widgetApi";
export * from "./migrates";
export * from "./definition";
export * from "./actions";
export * from "./calculators";
export * from "./controls";
export * from "./contextMenu";
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
export * from "./dimensionSelection";
export * from "./utils";
export * from "./viewContext";
export * from "./color";

export type TDefineWidgetOptions = {
  manifest?: IWidgetManifest;
};

declare global {
  interface Infomaximum {
    widget: {
      currentSdkVersion: number;

      defineWidget: <
        WidgetSettings extends IBaseWidgetSettings,
        GroupSettings extends IGroupSettings,
      >(
        uuid: string,
        Widget: IWidgetEntity<WidgetSettings, GroupSettings>,
        options?: TDefineWidgetOptions
      ) => void;
    };
  }
}
