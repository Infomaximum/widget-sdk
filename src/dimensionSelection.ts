import type { ICalculatorFilter } from "./calculators";
import { EWidgetFilterMode } from "./settings/values";

export interface IDimensionSelection {
  values: Set<string | null>;
  replacedFilter: ICalculatorFilter | null;
}

export interface IDimensionSelectionByFormula extends Map<string, IDimensionSelection> {}

export type TUpdateSelection = (
  selection: IDimensionSelectionByFormula,
  formula: string,
  value: string,
  filters: ICalculatorFilter[]
) => void;

const findFilterByFormula = (filters: ICalculatorFilter[], formula: string) => {
  return (
    filters.find((filter) => {
      return filter.formula === formula;
    }) ?? null
  );
};

const getSelectionItemValues = (
  value: string,
  filterMode: EWidgetFilterMode,
  currentSelectionItemValues?: Set<string | null>
) => {
  let selectionItemValues = new Set(currentSelectionItemValues);

  if (selectionItemValues.has(value)) {
    selectionItemValues.delete(value);
  } else if (filterMode === EWidgetFilterMode.SINGLE) {
    selectionItemValues = new Set([value]);
  } else {
    selectionItemValues.add(value);
  }

  return selectionItemValues;
};

export const updateDefaultModeSelection: TUpdateSelection = (
  selection: IDimensionSelectionByFormula,
  formula: string,
  value: string,
  filters: ICalculatorFilter[]
) => {
  const selectionItemSaved = selection.get(formula)?.replacedFilter;

  if (selection.size && !selection.get(formula)) {
    selection.clear();
  }

  const selectionItemValues = getSelectionItemValues(
    value,
    EWidgetFilterMode.DEFAULT,
    selection.get(formula)?.values
  );
  const savedFilters = findFilterByFormula(filters, formula);

  if (!selectionItemValues.size) {
    selection.clear();

    return;
  }

  selection.set(formula, {
    values: selectionItemValues,
    replacedFilter: selection.size ? selectionItemSaved ?? null : savedFilters,
  });
};

export const updateSingleModeSelection: TUpdateSelection = (
  selection: IDimensionSelectionByFormula,
  formula: string,
  value: string
) => {
  const selectionItemValues = getSelectionItemValues(
    value,
    EWidgetFilterMode.SINGLE,
    selection.get(formula)?.values
  );

  if (!selectionItemValues.size) {
    selection.delete(formula);

    return;
  }

  selection.set(formula, {
    values: selectionItemValues,
    replacedFilter: null,
  });
};

export const replaceFiltersBySelection = (
  filters: ICalculatorFilter[],
  selection: IDimensionSelectionByFormula
) => {
  return filters.reduce<ICalculatorFilter[]>((acc, filter) => {
    const calculatorFilter = selection.has(filter.formula)
      ? selection.get(filter.formula)?.replacedFilter
      : filter;

    if (!calculatorFilter) {
      return acc;
    }

    acc.push(calculatorFilter);

    return acc;
  }, []);
};
