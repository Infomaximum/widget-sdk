import { BaseWidgetSettingsSchema, type TZod } from ".";
import { SchemaRegistry } from "./schemaRegistry";

/** @deprecated временно используется для миграции */
export const WidgetPresetSettingsSchema = SchemaRegistry.define({
  key: "WidgetPresetSettings",
  latestVersion: "17",
  history: {
    "17": (z: TZod) =>
      BaseWidgetSettingsSchema.forVersion("17")(z)
        .pick({
          filterMode: true,
          ignoreFilters: true,
          stateName: true,
          titleColor: true,
          titleSize: true,
          titleWeight: true,
          paddings: true,
        })
        .extend({
          textSize: z.number().default(12),
        }),
  },
});
