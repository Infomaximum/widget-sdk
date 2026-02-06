import { BaseWidgetSettingsSchema, type TZod } from ".";

export const WidgetPresetSettingsSchema = (z: TZod) =>
  BaseWidgetSettingsSchema(z)
    .pick({
      filterMode: true,
      ignoreFilters: true,
      stateName: true,
      titleColor: true,
      titleSize: true,
      titleWeight: true,
    })
    .extend({
      textSize: z.number().default(12),
    });
