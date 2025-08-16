/** Функция для экранирования специальных символов в именнах переменных */
export const escapeSpecialsCharsInVariableName = (value: string) =>
  value
    .replaceAll("\\", "\\\\")
    .replaceAll("}", "\\}")
    .replaceAll(".", "\\.")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replaceAll('"', '\\"');
