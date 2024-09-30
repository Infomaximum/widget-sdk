import type { IGeneralCalculator } from "./generalCalculator/generalCalculator";
import type { IHistogramCalculator } from "./histogramCalculator/histogramCalculator";
import type { IPieCalculator } from "./pieCalculator";
import type { IProcessGraphCalculator } from "./processGraphCalculator";
import type { ITwoLimitsCalculator } from "./twoLimitsCalculator/twoLimitsCalculator";
import type { ITypeCalculator } from "./typeCalculator/typeCalculator";

export * from "./utils";
export * from "./calculator";
export * from "./generalCalculator";
export * from "./baseDimensionsAndMeasuresCalculator";
export * from "./pieCalculator";
export * from "./generalCalculator";
export * from "./processGraphCalculator";
export * from "./histogramCalculator";
export * from "./twoLimitsCalculator";
export * from "./typeCalculator";

export interface ICalculatorFactory {
  general: () => IGeneralCalculator;
  pie: () => IPieCalculator;
  processGraph: () => IProcessGraphCalculator;
  histogram: () => IHistogramCalculator;
  twoLimits: () => ITwoLimitsCalculator;
  type: () => ITypeCalculator;
}
