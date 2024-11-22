import { ESimpleDataType } from "../../data";

export const prepareValuesForSql = (simpleType: ESimpleDataType, values: (string | null)[]) =>
  simpleType === ESimpleDataType.INTEGER ||
  simpleType === ESimpleDataType.FLOAT ||
  simpleType === ESimpleDataType.BOOLEAN
    ? values
    : values.map((value) =>
        value === null ? null : `'${escapeSingularQuotes(escapeReverseSlash(value))}'`
      );

const escapeReverseSlash = (formula: string) => {
  return formula.replaceAll(/\\/gm, "\\\\");
};

const escapeSingularQuotes = (formula: string) => {
  return formula.replaceAll("'", "\\'");
};
