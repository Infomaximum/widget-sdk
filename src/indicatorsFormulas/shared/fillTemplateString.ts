import type { TNullable } from "../../utilityTypes";
import { isNil } from "../../utils/functions";

/** @deprecated - следует использовать fillTemplateSql */
export function fillTemplateString(templateString: string, params: Record<string, any>) {
  return templateString.replace(/\{(.*?)\}/g, (_, key) => {
    return params[key] ?? "";
  });
}

/** Функция для безопасного заполнения SQL шаблонов с защитой от однострочных SQL комментариев в подставляемых значениях. */
export function fillTemplateSql(templateString: string, params: Record<string, string>): string {
  const newParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    /** Эвристическая проверка на возможное присутствие sql-комментария в значении подставляемом в template
     */
    if (String(value).indexOf("--") >= 0) {
      newParams[key] = `${value}\n`;

      continue;
    }

    newParams[key] = String(value);
  }

  return fillTemplateString(templateString, newParams);
}
