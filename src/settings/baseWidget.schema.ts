import { ColorSchema, EFontWeight, EWidgetFilterMode, type TZod } from "..";
import { ActionButtonSchema } from "../actions.schema";
import { SettingsFilterSchema } from "../filtration.schema";
import { MarkdownMeasureSchema, WidgetSortingIndicatorSchema } from "../indicators.schema";

let id = 1;

export const AutoIdentifiedArrayItemSchema = (z: TZod) =>
  z.object({
    /**
     * Идентификатор, добавляемый системой "на лету" для удобства разработки, не сохраняется на сервер.
     * Гарантируется уникальность id в пределах settings виджета.
     */
    id: z
      .number()
      .default(-1)
      .transform((currentId) => (currentId === -1 ? id++ : currentId)),
  });

export const BaseWidgetSettingsSchema = (z: TZod) =>
  z.object({
    title: z.string().optional(),
    titleSize: z.number().optional(),
    titleColor: ColorSchema(z).optional(),
    titleWeight: z.enum(EFontWeight).optional(),
    stateName: z.string().nullable().optional(),
    showMarkdown: z.boolean().optional(),
    markdownMeasures: z.array(MarkdownMeasureSchema(z)).optional(),
    markdownText: z.string().optional(),
    markdownTextSize: z.number().optional(),
    filters: z.array(SettingsFilterSchema(z)).optional(),
    filterMode: z.enum(EWidgetFilterMode).optional(),
    ignoreFilters: z.boolean().optional(),
    sorting: z.array(WidgetSortingIndicatorSchema(z)).optional(),
    actionButtons: z.array(ActionButtonSchema(z)).optional(),
    paddings: z.union([z.number(), z.string()]).optional(),
    viewTheme: z.boolean().optional(),
  });
