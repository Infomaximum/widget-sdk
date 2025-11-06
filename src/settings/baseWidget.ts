import type { AutoIdentifiedArrayItemSchema, BaseWidgetSettingsSchema } from "./baseWidget.schema";
import type { TSchemaType } from "..";

export interface IAutoIdentifiedArrayItem
  extends TSchemaType<typeof AutoIdentifiedArrayItemSchema> {}

export interface IBaseWidgetSettings extends TSchemaType<typeof BaseWidgetSettingsSchema> {}
