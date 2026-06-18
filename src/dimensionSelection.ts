import type { ICalculatorFilter } from "./calculators";
import { applyIndexToArrayFormula } from "./calculators/utils";
import { EWidgetFilterMode, type TWidgetFilterMode } from "./settings/values";
import { type IWidgetFilter, type TWidgetFilterValue } from "./filtration";
import { omit } from "./utils/functions";

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
  filterMode: TWidgetFilterMode,
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

const isWidgetFilter = (filter: ICalculatorFilter | IWidgetFilter): filter is IWidgetFilter =>
  "filterValue" in filter;

const isCalculatorFilter = (
  filter: ICalculatorFilter | IWidgetFilter
): filter is ICalculatorFilter => "formula" in filter;

const getWidgetFilterFormula = ({ filterValue, preparedFilterValue }: IWidgetFilter): string => {
  if (!("filteringMethod" in filterValue && "formula" in filterValue)) {
    return preparedFilterValue.formula;
  }

  const formulaFilterValue = filterValue as TWidgetFilterValue & {
    filteringMethod: unknown;
    formula: string;
    sliceIndex?: number;
  };

  if (!formulaFilterValue.sliceIndex) {
    return formulaFilterValue.formula;
  }

  return applyIndexToArrayFormula(formulaFilterValue.formula, formulaFilterValue.sliceIndex);
};

const mergeWidgetFilter = (
  filter: IWidgetFilter,
  replacedFilter: ICalculatorFilter
): IWidgetFilter => {
  return {
    ...filter,
    preparedFilterValue: replacedFilter,
    filterValue: {
      ...filter.filterValue,
      ...omit(replacedFilter, ["values"]),
      checkedValues: replacedFilter.values,
    },
  };
};

export function replaceFiltersBySelection<T extends ICalculatorFilter | IWidgetFilter>(
  filters: T[],
  selection: IDimensionSelectionByFormula
): T[] {
  return filters.reduce<T[]>((acc, filter) => {
    const isFilterFromWidget = isWidgetFilter(filter);

    const filterFormula = isFilterFromWidget ? getWidgetFilterFormula(filter) : filter.formula;

    if (!filterFormula) {
      return acc;
    }

    const currentFilter = selection.has(filterFormula)
      ? selection.get(filterFormula)?.replacedFilter
      : filter;

    if (!currentFilter) {
      return acc;
    }

    const hasReplacedCalculatorForWidget =
      selection.has(filterFormula) && isFilterFromWidget && isCalculatorFilter(currentFilter);

    const resolvedFilter = hasReplacedCalculatorForWidget
      ? mergeWidgetFilter(filter, currentFilter)
      : currentFilter;

    acc.push(resolvedFilter as T);

    return acc;
  }, []);
}
