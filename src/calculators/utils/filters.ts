import { parseClickHouseType } from "../../clickHouseTypes";
import { ESimpleDataType } from "../../data";
import {
  formulaFilterMethods,
  isFormulaFilterValue,
  type IFormulaFilterValue,
  type TExtendedFormulaFilterValue,
} from "../../filtration";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { escapeSingularQuotes } from "./escapeSingularQuotes";
import { mapFormulaFilterToCalculatorInput } from "./mapFormulaFiltersToInputs";
import { prepareFormulaForSql } from "./prepareFormulaForSql";

function isDateSimpleType(simpleType: ESimpleDataType) {
  return [ESimpleDataType.DATE, ESimpleDataType.DATETIME, ESimpleDataType.DATETIME64].includes(
    simpleType
  );
}

const castToDateValue = (simpleType: ESimpleDataType) => (value: string | null) => {
  return simpleType === ESimpleDataType.DATE ? `toDate('${value}')` : `toDateTime('${value}')`;
};

const convertCalculatorFilterToFormula = (calculatorFilter: ICalculatorFilter) => {
  const {
    formula: filterValueFormula,
    filteringMethod,
    dbDataType,
    values: rawValues,
  } = calculatorFilter;

  const { simpleType } = parseClickHouseType(dbDataType);

  const formula = prepareFormulaForSql(filterValueFormula, simpleType);
  const values = isDateSimpleType(simpleType)
    ? rawValues.map(castToDateValue(simpleType))
    : rawValues.map((value) =>
        simpleType === ESimpleDataType.INTEGER ||
        simpleType === ESimpleDataType.FLOAT ||
        value === null
          ? value
          : `'${escapeSingularQuotes(value)}'`
      );

  switch (filteringMethod) {
    case formulaFilterMethods.EQUAL_TO:
      return `${formula} = ${values[0]}`;
    case formulaFilterMethods.NOT_EQUAL_TO:
      return `${formula} != ${values[0]}`;
    case formulaFilterMethods.GREATER_THAN:
      return `${formula} > ${values[0]}`;
    case formulaFilterMethods.GREATER_THAN_OR_EQUAL_TO:
      return `${formula} >= ${values[0]}`;
    case formulaFilterMethods.LESS_THAN:
      return `${formula} < ${values[0]}`;
    case formulaFilterMethods.LESS_THAN_OR_EQUAL_TO:
      return `${formula} <= ${values[0]}`;

    case formulaFilterMethods.STARTS_WITH:
      return `startsWith(${formula}, ${values[0]})`;
    case formulaFilterMethods.ENDS_WITH:
      return `endsWith(${formula}, ${values[0]})`;

    case formulaFilterMethods.CONTAINS:
      return `ilike(${formula}, ${values[0]})`;
    case formulaFilterMethods.NOT_CONTAINS:
      return `not ilike(${formula}, ${values[0]})`;

    case formulaFilterMethods.EMPTY:
      return `assumeNotNull(${formula}) = assumeNotNull(defaultValueOfArgumentType(${formula}))`;
    case formulaFilterMethods.NONEMPTY:
      return `assumeNotNull(${formula}) != assumeNotNull(defaultValueOfArgumentType(${formula}))`;

    case formulaFilterMethods.INCLUDE:
      return `${formula} IN [${String(values)}]`;
    case formulaFilterMethods.EXCLUDE:
      return `${formula} NOT IN [${String(values)}]`;

    case formulaFilterMethods.IN_RANGE:
    case formulaFilterMethods.LAST_TIME:
      return `${formula} BETWEEN ${values[0]} AND ${values[1]}`;
    case formulaFilterMethods.NOT_IN_RANGE:
      return `${formula} NOT BETWEEN ${values[0]} AND ${values[1]}`;
  }
};

function convertToFormula(filterValue: IFormulaFilterValue): string | void {
  const calculatorFilter = mapFormulaFilterToCalculatorInput(filterValue);

  if (!calculatorFilter) {
    return;
  }

  return convertCalculatorFilterToFormula(calculatorFilter);
}

export const convertToFormulasChain = (values: TExtendedFormulaFilterValue[]) =>
  compactMap(values, (value) => {
    const formula = isFormulaFilterValue(value) ? convertToFormula(value) : value.formula;

    return formula && `(${formula})`;
  }).join(" AND ");

export const convertFiltersToFormula = (filters: TExtendedFormulaFilterValue[]) => {
  return filters.length > 0 ? ` AND ${convertToFormulasChain(filters)}` : "";
};
