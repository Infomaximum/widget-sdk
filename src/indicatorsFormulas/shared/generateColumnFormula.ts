import { escapeSpecialCharacters } from "../../calculators/utils/escapeSpecialCharacters";

export function generateColumnFormula(tableName: string, columnName: string) {
  const preparedTableName = escapeSpecialCharacters(tableName);
  const preparedColumnName = escapeSpecialCharacters(columnName);

  return `"${preparedTableName}"."${preparedColumnName}"`;
}
