/**
 * Регулярное выражение для поиска имени ссылки внутри формулы.
 * Учитывает, что имя внутри формулы содержит экраны.
 *
 * Принцип работы:
 * Пробовать следующие вхождения:
 *  - \\\\ - экранированный символ обратного слэша.
 *  - Иначе \\" - экранированный символ кавычки.
 *  - Иначе [^"] - любой символ кроме кавычки.
 *  Если встречается любой другой символ, то это закрывающая кавычка имени переменной.
 */
export const linkNameRegExp = `(?:\\\\\\\\|\\\\"|[^"])+`;

export const dashboardLinkRegExp = new RegExp(
  `link: "(${linkNameRegExp})"(?!\\."${linkNameRegExp}")`,
  "g"
);
export const workspaceLinkRegExp = new RegExp(
  `link: "(${linkNameRegExp})"\\."(${linkNameRegExp})"`,
  "g"
);

export interface IIndicatorLink {
  /** string - имя группы пространства, null - используется текущий отчет */
  scopeName: string | null;
  indicatorName: string;
}

export const parseIndicatorLink = (formula: string): IIndicatorLink | null => {
  const dashboardMatch = formula.match(dashboardLinkRegExp.source);

  if (dashboardMatch) {
    return { scopeName: null, indicatorName: dashboardMatch[1]! };
  }

  const workspaceMatch = formula.match(workspaceLinkRegExp.source);

  if (workspaceMatch) {
    return { scopeName: workspaceMatch[1]!, indicatorName: workspaceMatch[2]! };
  }

  return null;
};
