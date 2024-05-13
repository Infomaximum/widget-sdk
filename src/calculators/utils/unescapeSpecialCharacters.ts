/** Удалить из строки символы экранирования */
export function unescapeSpecialCharacters(str: string) {
  return str.replace(/\\(?!\\)/g, "").replace(/\\\\/g, "\\");
}
