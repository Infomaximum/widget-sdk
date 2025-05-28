/** Экранировать специальные символы перед вставкой значения в sql-выражение */
export const escapeSpecialCharacters = (value: string) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll(`'`, `\\'`)
    .replaceAll("`", "\\`");
