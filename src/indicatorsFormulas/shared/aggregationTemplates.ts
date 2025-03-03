export const countReworksTemplate =
  "process(if(countIf({eventNameFormula} = '{eventName}'{filters}) > 0, countIf({eventNameFormula}  = '{eventName}'{filters}) - 1, 0), {caseCaseIdFormula})";

export const countExecutionsTemplate =
  "process(countIf({eventNameFormula} in '{eventName}'{filters}), {caseCaseIdFormula})";

export const lastValueTemplate =
  "process(argMaxIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula})";

export const firstValueTemplate =
  "process(argMinIf({columnFormula}, {eventTimeFormula}, {eventNameFormula} = '{eventName}'{filters}), {caseCaseIdFormula})";

export const topTemplate =
  "process(topKIf(1)({columnFormula}, {eventNameFormula} = '{eventName}'{filters})[1], {caseCaseIdFormula})";
