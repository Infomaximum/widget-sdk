import { EFormatTypes } from "../../formatting";
import {
  ESortingValueModes,
  EWidgetIndicatorValueModes,
  type IWidgetDimension,
  type IWidgetMeasure,
  type IWidgetSortingIndicator,
  type TWidgetVariable,
} from "../../indicators";
import { getDimensionFormula, getMeasureFormula } from "../../indicatorsFormulas";
import { EDisplayConditionMode } from "../../settings/values";
import { ESortDirection, type ISortOrder } from "../../sorting";
import { compactMap } from "../../utils/functions";
import { checkDisplayCondition } from "./displayCondition";

const getDefaultSortOrder = (
  dimensions: IWidgetDimension[],
  measures: IWidgetMeasure[]
): ISortOrder[] => {
  /** Если есть условие отображения, то не делаем автосортировку */
  if (
    dimensions.some(
      (dimension: IWidgetDimension) =>
        dimension.displayCondition &&
        dimension.displayCondition.mode !== EDisplayConditionMode.DISABLED
    )
  ) {
    return [];
  }

  /** Если есть временной разрез, то автосортировка по первому такому разрезу (по возрастанию) */
  const timeDimension = dimensions.find(
    (dimension) =>
      dimension.format &&
      [
        EFormatTypes.DATE,
        EFormatTypes.MONTH,
        EFormatTypes.DATETIME,
        EFormatTypes.DAY_OF_WEEK,
        EFormatTypes.HOUR,
        EFormatTypes.MONTH_YEAR,
        EFormatTypes.YEAR,
        EFormatTypes.QUARTER,
        EFormatTypes.QUARTER_YEAR,
        EFormatTypes.DAY_OF_MONTH,
        EFormatTypes.WEEK,
      ].includes(dimension.format)
  );

  if (timeDimension) {
    return [{ formula: getDimensionFormula(timeDimension), direction: ESortDirection.ascend }];
  }

  if (measures.length > 0) {
    const firstMeasure = measures[0];

    if (firstMeasure) {
      return [
        {
          direction: ESortDirection.descend,
          formula: getMeasureFormula(firstMeasure),
        },
      ];
    }
  }

  return [];
};

/**
 * Преобразовать объекты сортировок из settings виджета в sortOrders вычислителя
 * @param sortingIndicators объекты сортировок из settings виджета
 * @param dimensionsInOriginalOrder разрезы виджета (конкретный разрез будет браться по индексу)
 * @param measuresInOriginalOrder меры виджета (конкретная мера будет браться по индексу)
 * @returns
 */
export function mapSortingToInputs(
  sortingIndicators: IWidgetSortingIndicator[] = [],
  dimensionsInOriginalOrder: IWidgetDimension[] = [],
  measuresInOriginalOrder: IWidgetMeasure[] = [],
  variables: Map<string, TWidgetVariable>,
  withDefaultSortOrder = true
): ISortOrder[] {
  const sortOrder = compactMap(sortingIndicators, ({ value, direction }) => {
    if (
      value.mode === ESortingValueModes.FORMULA ||
      value.mode === ESortingValueModes.QUANTITY ||
      value.mode === ESortingValueModes.IN_DASHBOARD ||
      value.mode === ESortingValueModes.IN_WORKSPACE
    ) {
      return value.formula ? { formula: value.formula, direction } : undefined;
    }

    if (
      value.mode === ESortingValueModes.DIMENSION_IN_WIDGET ||
      value.mode === ESortingValueModes.HIERARCHY
    ) {
      const dimension = dimensionsInOriginalOrder[value.index];

      if (!dimension) {
        return;
      }

      const formula = getDimensionFormula(dimension);

      if (!formula || !checkDisplayCondition(dimension.displayCondition, variables)) {
        return;
      }

      return {
        formula: getDimensionFormula(dimension),
        direction,
        displayCondition:
          dimension.displayCondition?.mode === EDisplayConditionMode.FORMULA
            ? dimension.displayCondition.formula
            : undefined,
      };
    }

    if (value.mode === ESortingValueModes.MEASURE_IN_WIDGET) {
      const measure = measuresInOriginalOrder[value.index];

      return measure && { formula: getMeasureFormula(measure), direction };
    }
  });

  return withDefaultSortOrder && sortOrder.length === 0
    ? getDefaultSortOrder(dimensionsInOriginalOrder, measuresInOriginalOrder)
    : sortOrder;
}
