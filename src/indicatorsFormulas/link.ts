import { unescapeSpecialCharacters } from "../calculators/utils/unescapeSpecialCharacters";

/**
 * Регулярное выражение для поиска имени ссылки внутри формулы.
 * Учитывает экранирование специальных символов: '}', '.', '[', ']' и '\'.
 *
 * Принцип работы:
 * Обрабатывает две категории символов:
 * 1. Экранированные спецсимволы: \\}, \\., \\[, \\], \\\\
 *    - Сначала ищет обратный слеш, за которым следует один из спецсимволов
 * 2. Любые символы, кроме НЕэкранированных:
 *    - '}' - конец шаблона
 *    - '\' - начало экранирования
 */
export const linkNameRegExp = `(?:\\\\[}\\.\\[\\]\\\\]|[^}\\\\])*`;

export const dashboardLinkRegExp = new RegExp(`#\\{(${linkNameRegExp})\\}(?!\\.\\{)`, "g");
export const workspaceLinkRegExp = new RegExp(
  `#\\{(${linkNameRegExp})\\}\\.\\{(${linkNameRegExp})\\}`,
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
    return {
      scopeName: unescapeSpecialCharacters(workspaceMatch[1]!),
      indicatorName: unescapeSpecialCharacters(workspaceMatch[2]!),
    };
  }

  return null;
};
