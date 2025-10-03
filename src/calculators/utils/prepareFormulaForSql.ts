import { ESimpleDataType } from "../../data";
import { sanitizeSingleLineComment } from "../../sanitizeSingleLineComment";

export const prepareFormulaForSql = (formula: string, simpleType?: ESimpleDataType) => {
  formula = sanitizeSingleLineComment(formula, true);

  return simpleType === ESimpleDataType.OTHER ? `toString(${formula})` : formula;
};

export const clearSingleLineComments = (formula: string) => {
  return formula.replaceAll(/--.*$/gm, "");
};

export const clearMultiLineComments = (formula: string) => {
  return formula.replace(/\/\*[\s\S]*?\*\//g, "");
};
