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
import type { StringKeyOf } from "../../utilityTypes";
import { compactMap } from "../../utils/functions";
import type { ICalculatorFilter } from "../calculator";
import { checkDisplayCondition } from "./displayCondition";
import { selectDimensionFromHierarchy } from "./selectDimensionFromHierarchy";

const getDefaultSortOrder = (
  dimensions: IWidgetDimension[],
  measures: IWidgetMeasure[]
): ISortOrder[] => {
  /** Если есть условие отображения, то не делаем авто-сортировку */
  if (
    dimensions.some(
      (dimension: IWidgetDimension) =>
        dimension.displayCondition &&
        dimension.displayCondition.mode !== EDisplayConditionMode.DISABLED
    )
  ) {
    return [];
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

/** Преобразовать объекты сортировок из settings виджета в sortOrders вычислителя */
interface IMapSortingToInputsParams<Settings, Indicator> {
  settings: Settings;
  variables: Map<string, TWidgetVariable>;
  filters: ICalculatorFilter[];
  getIndicatorType(
    key: string,
    indicator: Indicator
  ): EWidgetIndicatorType.DIMENSION | EWidgetIndicatorType.MEASURE;
  /** При отсутствии сортировки использовать предустановленную сортировку(на основе sortableIndicatorsKeys) */
  withDefaultSortOrder?: boolean;
  sortableIndicatorsKeys?: Readonly<StringKeyOf<Settings>[]>;
}

export function mapSortingToInputs<
  Settings extends IBaseWidgetSettings = IBaseWidgetSettings,
  Indicator extends IWidgetColumnIndicator = IWidgetColumnIndicator,
>({
  settings,
  variables,
  filters,
  getIndicatorType,
  withDefaultSortOrder = true,
  sortableIndicatorsKeys = [],
}: IMapSortingToInputsParams<Settings, Indicator>): ISortOrder[] {
  const sortOrder = compactMap(settings["sorting"] ?? [], ({ direction, value }) => {
    if (value.mode === ESortingValueModes.FORMULA) {
      return value.formula ? { formula: value.formula, direction } : undefined;
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
        displayCondition:
          indicator.displayCondition?.mode === EDisplayConditionMode.FORMULA
            ? indicator.displayCondition.formula
            : undefined,
      };
    }

    return {
      formula: getMeasureFormula(indicator),
      direction,
    };
  });

  if (sortOrder.length > 0) {
    return sortOrder;
  }

  if (sortableIndicatorsKeys.length === 0 || withDefaultSortOrder === false) {
    return [];
  }

  const dimensions: IWidgetDimension[] = [];
  const measures: IWidgetMeasure[] = [];

  sortableIndicatorsKeys.forEach((key) => {
    const indicatorsGroup = settings[key as keyof Settings] as Array<Indicator> | undefined;

    indicatorsGroup?.forEach((indicator) => {
      if (getIndicatorType(key, indicator) === EWidgetIndicatorType.DIMENSION) {
        const activeDimensions = isDimensionsHierarchy(indicator)
          ? selectDimensionFromHierarchy(indicator, filters)
          : indicator;

        activeDimensions && dimensions.push(activeDimensions as IWidgetDimension);
      } else {
        measures.push(indicator as IWidgetMeasure);
      }
    });
  });

  return getDefaultSortOrder(dimensions, measures);
}
