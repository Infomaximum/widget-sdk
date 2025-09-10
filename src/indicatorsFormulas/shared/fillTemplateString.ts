/** @deprecated - следует использовать fillTemplateSql */
export function fillTemplateString(templateString: string, params: Record<string, any>) {
  return templateString.replace(/\{(.*?)\}/g, (_, key) => {
    return params[key] ?? "";
  });
}

/** Функция для безопасного заполнения SQL шаблонов с защитой от однострочных SQL комментариев в подставляемых значениях. */
export function fillTemplateSql(templateString: string, params: Record<string, any>): string {
  const newParams: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      newParams[key] = value;

      break;
    }

    /** Эвристическая проверка на возможное присутствие sql-комментария в значении подставляемом в template
     */
    if (typeof value === "string" && value.indexOf("--") >= 0) {
      newParams[key] = `${value}\n`;

      break;
    }

    newParams[key] = value;
  }

  return fillTemplateString(templateString, newParams);
}
