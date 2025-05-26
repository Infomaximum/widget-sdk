import { applyIndexToArrayFormula, type ICalculatorFilter } from "./calculators";
import {
  isValidFormulaFilterValue,
  type IWidgetFilter,
  type TWidgetFilterValue,
} from "./filtration";
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

/** @deprecated Отказ от режима фильтрации "Множественный выбор"*/
export const updateMultiModeSelection: TUpdateSelection = (
  selection: IDimensionSelectionByFormula,
  formula: string,
  value: string
) => {
  const selectionItemValues = getSelectionItemValues(
    value,
    EWidgetFilterMode.MULTI,
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

export function replaceFiltersBySelection<T extends ICalculatorFilter | IWidgetFilter>(
  filters: T[],
  selection: IDimensionSelectionByFormula
): T[] {
  const isWidgetFilter = (filter: ICalculatorFilter | IWidgetFilter): filter is IWidgetFilter =>
    "filterValue" in filter;

  const getFilterValueFormula = (filterValue: TWidgetFilterValue) => {
    if (!isValidFormulaFilterValue(filterValue) || !filterValue.sliceIndex) {
      return null;
    }

    return applyIndexToArrayFormula(filterValue.formula, filterValue.sliceIndex);
  };

  return filters.reduce<T[]>((acc, filter) => {
    const filterFormula = isWidgetFilter(filter)
      ? getFilterValueFormula(filter.filterValue)
      : filter.formula;

    if (!filterFormula) {
      return acc;
    }

    const currentFilter = selection.has(filterFormula)
      ? selection.get(filterFormula)?.replacedFilter
      : filter;

    if (!currentFilter) {
      return acc;
    }

    acc.push(currentFilter as T);

    return acc;
  }, []);
}
