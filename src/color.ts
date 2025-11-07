import { parseIndicatorLink } from "./indicatorsFormulas";
import { isNil } from "./utils/functions";
import type { IGlobalContext } from "./widgetContext";
import type {
  ColorBaseSchema,
  ColoredValueSchema,
  ColorRuleSchema,
  ColorSchema,
} from "./color.schema";
import type { TSchemaType } from ".";

export enum EColorMode {
  /** Окрашивание отключено */
  DISABLED = "DISABLED",
  /** Цвет каждого значения вычисляется по формуле */
  FORMULA = "FORMULA",
  /** Один цвет для всех значений */
  BASE = "BASE",
  /** Окрашивание каждого значения по градиенту относительно минимального и максимального значений */
  GRADIENT = "GRADIENT",
  /** Использовать автоматический цвет: по умолчанию определяется порядковым номером показателя */
  AUTO = "AUTO",
  /** Использовать цвет из правила отображения (в правиле отображения рекурсивно определен цвет) */
  RULE = "RULE",
  /** Задать цвет конкретным значениям разреза */
  VALUES = "VALUES",
  /** Задать цвет конкретным значениям общего разреза. Режим используется только для настроек правила отображения */
  BY_DIMENSION = "BY_DIMENSION",
}
export type TColorBase = TSchemaType<typeof ColorBaseSchema>;
export type TColorRule = TSchemaType<typeof ColorRuleSchema>;
export type TColor = TSchemaType<typeof ColorSchema>;

export interface IColoredValue extends TSchemaType<typeof ColoredValueSchema> {}

export const getRuleColor = (
  ruleFormula: string,
  globalContext: Pick<IGlobalContext, "reportDisplayRules" | "workspaceDisplayRules">
): TColor | undefined => {
  const link = parseIndicatorLink(ruleFormula);

  if (!link) {
    return;
  }

  const { scopeName = null, indicatorName: ruleName } = link;

  const rulesByScope = isNil(scopeName)
    ? globalContext.reportDisplayRules
    : globalContext.workspaceDisplayRules?.get(scopeName);

  return rulesByScope?.get(ruleName)?.color;
};

export const isValidColor = (
  color: TColor,
  globalContext: Pick<IGlobalContext, "reportDisplayRules" | "workspaceDisplayRules">
): boolean => {
  if (color.mode === EColorMode.RULE) {
    return !color.formula || Boolean(getRuleColor(color.formula, globalContext));
  }

  if (color.mode === EColorMode.VALUES) {
    return color.items.every((item) => isValidColor(item.color, globalContext));
  }

  return true;
};

export const colors = [
  "#222F3E",
  "#00D2D3",
  "#5F27CD",
  "#FECA57",
  "#078936",
  "#E51320",
  "#96AABF",
  "#1C55E7",
  "#341F97",
  "#FFDD59",
  "#D82C46",
  "#0BE881",
  "#0ABDE3",
  "#FF9F43",
  "#EC41D4",
  "#117F8E",
  "#B9B9B9",
  "#505BF1",
  "#64FFB6",
  "#485460",
  "#FFD32A",
  "#C74E1A",
  "#6E70A6",
  "#3C40C6",
  "#48DBFB",
  "#486179",
  "#FF9FF3",
  "#1DD1A1",
  "#BCC8D4",
  "#BA46AA",
];

/**
 * Получить цвет по индексу элемента
 * @param index - индекс элемента, которому требуется цвет
 */
export const getColorByIndex = (index: number): string => {
  const colorsLength = colors.length;
  const countTurns = Math.trunc(index / colorsLength);
  const color = colors[index - colorsLength * countTurns];

  if (!color) {
    throw new Error("Не удалось автоматически определить цвет, возможно палитра цветов пуста.");
  }

  return color;
};
