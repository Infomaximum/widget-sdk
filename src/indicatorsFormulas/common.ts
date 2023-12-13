export function generateColumnFormula(tableName: string, columnName: string) {
  return `"${tableName}"."${columnName}"`;
}

export function fillTemplateString(
  templateString: string,
  params: Record<string, any>
) {
  return templateString.replace(/\{(.*?)\}/g, (_, key) => params[key] ?? "");
}
