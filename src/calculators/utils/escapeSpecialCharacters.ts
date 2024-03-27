export const escapeSpecialCharacters = (formula: string) =>
  formula
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("`", "\\`")
    .replaceAll("-", "\\-");
