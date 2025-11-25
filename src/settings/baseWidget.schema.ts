import { ColorSchema, EColorMode, EFontWeight, EWidgetFilterMode, themed, type TZod } from "..";
import { ActionButtonSchema } from "../actions.schema";
import { SettingsFilterSchema } from "../filtration.schema";
import { MarkdownMeasureSchema, WidgetSortingIndicatorSchema } from "../indicators.schema";

/**
 * Глобальный счетчик для генерации ID.
 *
 * @todo
 * В будущем можно заменить единый счетчик на изолированные счетчики в разных контекстах.
 */
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
    title: z.string().default(""),
    titleSize: themed(z.number().default(14), (theme) => theme.widgets.titleSize),
    titleColor: themed(
      ColorSchema(z).default({ mode: EColorMode.AUTO }),
      (theme) => theme.widgets.titleColor
    ),
    titleWeight: themed(
      z.enum(EFontWeight).default(EFontWeight.NORMAL),
      (theme) => theme.widgets.titleWeight
    ),
    stateName: z.string().nullable().default(null),
    showMarkdown: z.boolean().default(false),
    markdownMeasures: z.array(MarkdownMeasureSchema(z)).default([]),
    markdownText: z.string().default(""),
    markdownTextSize: z.number().default(14),
    filters: z.array(SettingsFilterSchema(z)).default([]),
    filterMode: z.enum(EWidgetFilterMode).default(EWidgetFilterMode.DEFAULT),
    ignoreFilters: z.boolean().default(false),
    sorting: z.array(WidgetSortingIndicatorSchema(z)).default([]),
    actionButtons: z.array(ActionButtonSchema(z)).default([]),
    paddings: themed(
      z.union([z.number(), z.string()]).default(8),
      (theme) => theme.widgets.paddings
    ),
    viewTheme: z.boolean().default(false),
  });
