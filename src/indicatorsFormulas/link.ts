import { createEscaper } from "../calculators/utils/escapeSpecialCharacters";
import { unescapeSpecialCharacters } from "../calculators/utils/unescapeSpecialCharacters";

/**
 * Создает RegExp-паттерн для подстроки с безопасными символами.
 *
 * Подстрока может содержать любой символ, кроме:
 * 1. `restrictedChar` - запрещено появление без экранирования.
 * 2. Обратного слэша (`\`) - запрещено появление без пары.
 *
 * Правило экранирования:
 * - Любой символ, включая `restrictedChar` и `\`, можно использовать с префиксом `\`.
 * - Последний символ в подстроке не может быть одинокий слэш.
 *
 * @param restrictedChar Символ, который нельзя использовать без экранирования.
 * @returns Строка для вставки внутрь RegExp.
 */
const createEscapableCharPattern = (restrictedChar: string) =>
  String.raw`(?:\\.|[^${restrictedChar}\\])*`;

/**
 * Паттерн подстроки, валидной для использования внутри фигурных скобок.
 * Требование к подстроке - отсутствие закрывающих фигурных скобок (кроме экранированных).
 */
export const curlyBracketsContentPattern = createEscapableCharPattern("}");

/**
 * Паттерн подстроки, валидной для использования внутри двойных кавычек.
 * Требование к подстроке - отсутствие двойных кавычек (кроме экранированных).
 */
export const doubleQuoteContentPattern = createEscapableCharPattern('"');

export const dashboardLinkRegExp = new RegExp(
  String.raw`#\{(${curlyBracketsContentPattern})\}(?!\.\{(${curlyBracketsContentPattern})\})`,
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
