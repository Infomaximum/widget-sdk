import { escapeSpecialCharacters } from "../calculators/utils/escapeSpecialCharacters";

export function generateColumnFormula(tableName: string, columnName: string) {
  const preparedTableName = escapeSpecialCharacters(tableName);
  const preparedColumnName = escapeSpecialCharacters(columnName);

  return `"${preparedTableName}"."${preparedColumnName}"`;
}

export function fillTemplateString(
  templateString: string,
  params: Record<string, any>
) {
  return templateString.replace(/\{(.*?)\}/g, (_, key) => params[key] ?? "");
}
