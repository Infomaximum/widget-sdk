import { sanitizeSingleLineComment } from "../../sanitizeSingleLineComment";

/** Функция для безопасного заполнения SQL шаблонов с защитой от однострочных SQL комментариев в подставляемых значениях. */
export function fillTemplateSql(templateString: string, params: Record<string, string>): string {
  const newParams: Record<string, string> = {};

  if (templateString.indexOf("'{") >= 0) {
    throw new Error(
      `Некорректный шаблон: плейсхолдеры не должны заключаться в одинарные кавычки.
       Используйте {placeholder} вместо '{placeholder}'.
       Кавычки должны добавляться для необходимых полей при формировании объекта параметров.`
    );
  }

  for (const [key, value] of Object.entries(params)) {
    if (String(value).indexOf("--") >= 0) {
      newParams[key] = `${value}\n`;

      continue;
    }

    newParams[key] = sanitizeSingleLineComment(String(value));
  }

  return templateString.replace(/\{(.*?)\}/g, (_, key) => {
    return newParams[key] ?? "";
  });
}
