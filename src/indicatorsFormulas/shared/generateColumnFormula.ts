import { escapeDoubleQuoteLinkName } from "../link";

export function generateColumnFormula(tableName: string, columnName: string) {
  return `"${escapeDoubleQuoteLinkName(tableName)}"."${escapeDoubleQuoteLinkName(columnName)}"`;
}
