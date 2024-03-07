import { ESimpleDataType } from "../../data";

export const prepareValuesForSql = (
  dataType: ESimpleDataType,
  values: (string | null)[]
) =>
  dataType === ESimpleDataType.INTEGER ||
  dataType === ESimpleDataType.FLOAT ||
  dataType === ESimpleDataType.BOOLEAN
    ? values
    : values.map((value) =>
        value === null
          ? null
          : `'${escapeSingularQuotes(escapeReverseSlash(value))}'`
      );

const escapeReverseSlash = (formula: string) => {
  return formula.replaceAll(/\\/gm, "\\\\");
};

const escapeSingularQuotes = (formula: string) => {
  return formula.replaceAll("'", "\\'");
};
