function hasPossibleSingleLineComment(str: string) {
  return str.indexOf("--") >= 0;
}

export function sanitizeSingleLineComment(formula: string, wrapInBrackets?: boolean): string {
  if (!hasPossibleSingleLineComment(formula)) {
    return formula;
  }

  const lines = formula.split("\n");
  const lastLine = lines[lines.length - 1];

  // Кейс, когда хотим избежать повторного добавления переноса строки:
  // уже есть переносы и после последнего переноса нет комментария
  if (lines.length > 1 && lastLine && !hasPossibleSingleLineComment(lastLine)) {
    return formula;
  }

  return wrapInBrackets ? `(${formula}\n)` : `${formula}\n`;
}
