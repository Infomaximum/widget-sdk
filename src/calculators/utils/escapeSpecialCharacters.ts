/** Функция для экранирования специальных символов
 * при подстановке названий таблиц, колонок, переменных или показателей в SQL-формулы.
 * Пример: Если название переменной содержит кавычки или обратные слеши,
 * например: `te"s\t`, то перед подстановкой в SQL-формулу его следует экранировать.
 * Результат должен выглядеть так: `"inputs"."te\"s\\t"`
 */
export const escapeSpecialCharacters = (value: string) =>
  value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
