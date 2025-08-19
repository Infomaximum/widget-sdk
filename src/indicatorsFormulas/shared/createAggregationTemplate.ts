function createAggregationTemplate(
  functionName: string,
  options?: {
    distinct?: boolean;
  }
) {
  return `process(${functionName}(${options?.distinct ? "distinct " : ""}{columnFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula})`;
}

export { createAggregationTemplate };
