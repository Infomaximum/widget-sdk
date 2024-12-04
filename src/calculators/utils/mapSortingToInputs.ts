import { EFormatTypes } from "../../formatting";
import {
  ESortingValueModes,
  EWidgetIndicatorType,
  isDimensionsHierarchy,
  type IWidgetColumnIndicator,
  type IWidgetDimension,
  type TWidgetVariable,
  type IWidgetMeasure,
} from "../../indicators";
import { getDimensionFormula, getMeasureFormula } from "../../indicatorsFormulas";
import type { IBaseWidgetSettings } from "../../settings/baseWidget";
import { EDisplayConditionMode } from "../../settings/values";
import { ESortDirection, type ISortOrder } from "../../sorting";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { checkDisplayCondition } from "./displayCondition";
import { selectDimensionFromHierarchy } from "./selectDimensionFromHierarchy";

interface IGetDefaultSortOrders {
  sortOrders: ISortOrder[];
  dimensions: IWidgetDimension[];
  measures: IWidgetMeasure[];
}

export const getDefaultSortOrders = ({
  sortOrders,
  dimensions,
  measures,
}: IGetDefaultSortOrders): ISortOrder[] => {
  /** Если есть условие отображения или пользовательские сортировки, то не делаем авто-сортировку */
  if (
    sortOrders.length > 0 ||
    dimensions.some(
      (dimension) =>
        dimension.displayCondition &&
        dimension.displayCondition.mode !== EDisplayConditionMode.DISABLED
    )
  ) {
    return sortOrders;
  }

  /** Если есть временной разрез, то авто-сортировка по первому такому разрезу (по возрастанию) */
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
    return [
      {
        formula: getDimensionFormula(timeDimension),
        dbDataType: timeDimension.dbDataType,
        direction: ESortDirection.ascend,
      },
    ];
  }

  if (measures.length > 0) {
    const firstMeasure = measures[0];

    if (firstMeasure) {
      return [
        {
          direction: ESortDirection.descend,
          formula: getMeasureFormula(firstMeasure),
          dbDataType: firstMeasure.dbDataType,
        },
      ];
    }
  }

  return [];
};

/** Преобразовать объекты сортировок из settings виджета в sortOrders вычислителя */
interface IMapSortingToInputsParams<Settings, Indicator> {
  settings: Settings;
  variables: Map<string, TWidgetVariable>;
  filters: ICalculatorFilter[];
  getIndicatorType(
    key: string,
    indicator: Indicator
  ): EWidgetIndicatorType.DIMENSION | EWidgetIndicatorType.MEASURE;
}

export function mapSortingToInputs<
  Settings extends IBaseWidgetSettings = IBaseWidgetSettings,
  Indicator extends IWidgetColumnIndicator = IWidgetColumnIndicator,
>({
  settings,
  variables,
  filters,
  getIndicatorType,
}: IMapSortingToInputsParams<Settings, Indicator>): ISortOrder[] {
  const sortOrder = compactMap(settings["sorting"] ?? [], ({ direction, value }) => {
    if (value.mode === ESortingValueModes.FORMULA) {
      return value.formula
        ? { formula: value.formula, direction, dbDataType: value.dbDataType }
        : undefined;
    }

    const indicatorsGroup = settings[value.group as keyof Settings] as Array<Indicator> | undefined;
    const indicator = indicatorsGroup?.[value.index];

    if (!indicator) {
      return;
    }

    if (getIndicatorType(value.group, indicator) === EWidgetIndicatorType.DIMENSION) {
      const activeDimensions = isDimensionsHierarchy(indicator)
        ? selectDimensionFromHierarchy(indicator, filters)
        : indicator;

      const formula = activeDimensions && getDimensionFormula(activeDimensions as IWidgetDimension);

      if (!formula || !checkDisplayCondition(indicator.displayCondition, variables)) {
        return;
      }

      return {
        formula,
        direction,
        dbDataType: activeDimensions.dbDataType,
        displayCondition:
          indicator.displayCondition?.mode === EDisplayConditionMode.FORMULA
            ? indicator.displayCondition.formula
            : undefined,
      };
    }

    return {
      formula: getMeasureFormula(indicator),
      direction,
      dbDataType: indicator.dbDataType,
    };
  });

  return sortOrder;
}

interface IPrepareSortOrdersParams<Settings, Indicator>
  extends IMapSortingToInputsParams<Settings, Indicator>,
    Pick<IGetDefaultSortOrders, "dimensions" | "measures"> {}

export function prepareSortOrders<
  Settings extends IBaseWidgetSettings = IBaseWidgetSettings,
  Indicator extends IWidgetColumnIndicator = IWidgetColumnIndicator,
>({ dimensions, measures, ...rest }: IPrepareSortOrdersParams<Settings, Indicator>) {
  const sortOrders = mapSortingToInputs(rest);

  return getDefaultSortOrders({ sortOrders, dimensions, measures });
}
