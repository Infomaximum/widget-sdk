export const escapeSingularQuotes = (formula: string) => {
  if (typeof formula !== "string") {
    return formula;
  }

  return formula.replaceAll("'", "\\'");
};
