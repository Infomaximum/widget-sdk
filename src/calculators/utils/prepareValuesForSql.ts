import { ESimpleDataType } from "../../data";

export const prepareValuesForSql = (
  dataType: ESimpleDataType,
  values: string[]
) =>
  dataType === ESimpleDataType.INTEGER || dataType === ESimpleDataType.FLOAT
    ? values
    : values.map(
        (value) => `'${escapeSingularQuotes(escapeReverseSlash(value))}'`
      );

const escapeReverseSlash = (formula: string) => {
  return formula.replaceAll(/\\/gm, "\\\\");
};

const escapeSingularQuotes = (formula: string) => {
  return formula.replaceAll("'", "\\'");
};
