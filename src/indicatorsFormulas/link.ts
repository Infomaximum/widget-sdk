import { createEscaper } from "../calculators/utils/escapeSpecialCharacters";
import { unescapeSpecialCharacters } from "../calculators/utils/unescapeSpecialCharacters";

/**
 * Паттерн подстроки, валидной для использования внутри фигурных скобок.
 * Требование к подстроке - отсутствие закрывающих фигурных скобок (кроме экранированных).
 *
 * Принцип в строго последовательной проверке следующих вхождений:
 *  - \\\\ - экранированный символ экрана;
 *  - \\\} - экранированная закрывающая скобка;
 *  - [^\}] - любой символ кроме закрывающей скобки;
 *  - Если встречается любой другой символ, то это закрывающая скобка - подстрока невалидна.
 */
export const curlyBracketsContentPattern = String.raw`(?:\\\\|\\\}|[^\}])*`;

/*
 * Паттерн подстроки, валидной для использования внутри двойных кавычек.
 * Требования и принцип аналогичны `curlyBracketsContentPattern`.
 */
export const doubleQuoteContentPattern = String.raw`(?:\\\\|\\\"|[^\"])+`;

export const dashboardLinkRegExp = new RegExp(
  String.raw`#\{(${curlyBracketsContentPattern})\}`,
  "g"
);

export const workspaceLinkRegExp = new RegExp(
  String.raw`#\{(${curlyBracketsContentPattern})\}\.\{(${curlyBracketsContentPattern})\}`,
  "g"
);

/** Экранирование спец.символов при подстановке названий таблиц и колонок */
export const escapeDoubleQuoteLinkName = createEscaper(Array.from(`\\"`));

/** Экранирование спец.символов при подстановке названий переменных и показателей */
export const escapeCurlyBracketLinkName = createEscaper(Array.from(`\\}.[]`));

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
