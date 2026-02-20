/// <reference types="@infomaximum/global-types" />

import type { TControlsMap } from "./controls";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { IWidgetEntity, IWidgetManifest } from "./widgetApi";
import type { ZodType, z as zod } from "zod";
export { ELanguages } from "@infomaximum/localization";
export { EFilteringMethodValues } from "@infomaximum/base-filter";

export {
  EFormatTypes,
  EFormattingPresets,
  availableFormattingByFormat,
} from "@infomaximum/bi-formatting";
export * from "./widgetApi";
export * from "./migrates";
export * from "./definition";
export * from "./actions";
export * from "./actions.schema";
export * from "./calculators";
export * from "./controls";
export * from "./contextMenu";
export { ESimpleDataType } from "./data";
export * from "./filtration";
export * from "./filtration.schema";
export * from "./formatting";
export * from "./indicators";
export * from "./indicators.schema";
export * from "./metaDescription";
export * from "./placeholder";
export * from "./settings/baseWidget";
export * from "./settings/values";
export * from "./settings/values.schema";
export * from "./settings/baseWidget.schema";
export * from "./settings/const";
export * from "./sorting";
export * from "./sorting.schema";
export * from "./widgetContext";
export * from "./indicatorsFormulas";
export * from "./dimensionSelection";
export * from "./viewContext";
export * from "./color";
export * from "./preset";
export * from "./preset.schema";
export { parseClickHouseType, EClickHouseBaseTypes } from "./clickHouseTypes";
export * from "./theme";
export * from "./color.schema";

export type TDefineWidgetOptions = {
  manifest?: IWidgetManifest;
};

export type TZod = typeof zod;
export type TSchemaType<T extends (z: TZod, ...params: any) => ZodType> = zod.infer<ReturnType<T>>;

declare global {
  interface Infomaximum {
    widget: {
      currentSdkVersion: number;

      defineWidget: <
        WidgetSettings extends IBaseWidgetSettings,
        ControlsMap extends TControlsMap = {},
      >(
        uuid: string,
        Widget: IWidgetEntity<WidgetSettings, ControlsMap>,
        options?: TDefineWidgetOptions
      ) => void;
    };
  }
}
