import { ESimpleDataType } from "../../data";

export const prepareFormulaForSql = (formula: string, simpleType?: ESimpleDataType) => {
  formula = clearSingleLineComments(clearMultiLineComments(formula)).trim();

  return simpleType === ESimpleDataType.OTHER ? `toString(${formula})` : formula;
};

export const clearSingleLineComments = (formula: string) => {
  return formula.replaceAll(/--.*$/gm, "");
};

export const clearMultiLineComments = (formula: string) => {
  return formula.replace(/\/\*[\s\S]*?\*\//g, "");
};
