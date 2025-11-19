import { ColorSchema, EColorMode, EFontWeight, EWidgetFilterMode, type TZod } from ".";

export const WidgetPresetSettingsSchema = (z: TZod) =>
  z.object({
    filterMode: z.enum(EWidgetFilterMode).default(EWidgetFilterMode.DEFAULT),
    ignoreFilters: z.boolean().default(false),
    stateName: z.string().nullable().default(null),
    titleColor: ColorSchema(z).default({ mode: EColorMode.AUTO }),
    titleSize: z.number().default(14),
    titleWeight: z.enum(EFontWeight).default(EFontWeight.NORMAL),
    textSize: z.number().default(12),
    paddings: z.union([z.number(), z.string()]).default(8),
  });
