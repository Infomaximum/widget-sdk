// Типы, используемые в значениях элементов управления.

import type { TNullable } from "../utilityTypes";

export enum EWidgetFilterMode {
  DEFAULT = "DEFAULT",
  SINGLE = "SINGLE",
  MULTI = "MULTI",
  DISABLED = "DISABLED",
}

export type TWidgetFiltering =
  | { ignore: true; mode: EWidgetFilterMode.SINGLE | EWidgetFilterMode.MULTI }
  | { ignore: false; mode: EWidgetFilterMode };

export enum EColorMode {
  DISABLED = "DISABLED",
  FORMULA = "FORMULA",
  BASE = "BASE",
  GRADIENT = "GRADIENT",
  AUTO = "AUTO",
  RULE = "RULE",
  VALUES = "VALUES",
  BY_DIMENSION = "BY_DIMENSION",
}

type TColorBase = {
  mode: EColorMode.BASE;
  value?: string;
  defaultColor?: string;
};

export enum EColorScope {
  WORKSPACE = "WORKSPACE",
  DASHBOARD = "DASHBOARD",
}

type TColorRuleCommon = {
  mode: EColorMode.RULE;
  ruleName: string;
};

export type TColorRule = (
  | {
      scope: EColorScope.DASHBOARD | null;
    }
  | {
      scope: EColorScope.WORKSPACE;
      workspaceGroupId: number | null;
    }
) &
  TColorRuleCommon;

export interface IColoredValue {
  value: string;
  color: TColorBase | TColorRule;
}

export enum EMarkdownDisplayMode {
  NONE = "NONE",
  INDICATOR = "INDICATOR",
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
    }
  | {
      mode: EColorMode.AUTO;
    }
  | TColorRule
  | {
      mode: EColorMode.VALUES;
      dimensionFormula: string;
      items: IColoredValue[];
    }
  | {
      mode: EColorMode.BY_DIMENSION;
      dimensionName: string;
      items: IColoredValue[];
    }
  | {
      mode: EColorMode.DISABLED;
    };

export enum EDisplayConditionMode {
  DISABLED = "DISABLED",
  FORMULA = "FORMULA",
  VARIABLE = "VARIABLE",
}

/** Условие отображения для компонента и меры */
export type TDisplayCondition =
  | {
      mode: EDisplayConditionMode.DISABLED;
    }
  | {
      mode: EDisplayConditionMode.FORMULA;
      formula: TNullable<string>;
    }
  | {
      mode: EDisplayConditionMode.VARIABLE;
      variableName: TNullable<string>;
      variableValue: TNullable<string>;
    };

export interface IRange {
  unit?: string;
  min?: number;
  max?: number;
}
