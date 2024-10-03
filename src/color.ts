import { parseIndicatorLink } from "./indicatorsFormulas";
import type { TNullable } from "./utilityTypes";
import { isNil } from "./utils/functions";
import type { IGlobalContext } from "./widgetContext";

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

type TColorBase = {
  mode: EColorMode.BASE;
  value?: string;
};

export type TColorRule = {
  mode: EColorMode.RULE;
  formula: string;
};

export interface IColoredValue {
  value: string;
  color: TColorBase | TColorRule;
}

/** Настройка цвета */
export type TColor =
  | {
      mode: EColorMode.FORMULA;
      formula: string;
    }
  | TColorBase
  | {
      mode: EColorMode.GRADIENT;
      startValue: string;
      endValue: string;
      classCount?: TNullable<number>;
    }
  | {
      mode: EColorMode.AUTO;
    }
  | TColorRule
  | {
      mode: EColorMode.VALUES;
      items: IColoredValue[];
    }
  | {
      mode: EColorMode.BY_DIMENSION;
      /** Имя разреза из области видимости правила отображения */
      dimensionName: string;
      items: IColoredValue[];
    }
  | {
      mode: EColorMode.DISABLED;
    };

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
