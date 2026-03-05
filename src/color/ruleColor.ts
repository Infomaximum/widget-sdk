import { parseIndicatorLink } from "../indicatorsFormulas";
import { isNil } from "../utils/functions";
import type { IGlobalContext } from "../widgetContext";
import { colors } from "./consts";
import { EColorMode, type TColor } from "./types";

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
