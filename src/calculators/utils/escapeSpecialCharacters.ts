/** Создать функцию экранирования переданных `specialChars` внутри `str` */
export const createEscaper = (specialChars: string[]) => (str: string) =>
  specialChars.reduce((escaped, char) => escaped.replaceAll(char, `\\${char}`), str);
