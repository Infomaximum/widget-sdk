import type { IWidgetIndicator } from "../../indicators";
import { compactMap } from "../../utils/functions";
import type { ICalculatorIndicatorOutput } from "../calculator";

export type TBoundedContentWithIndicator<
  Output extends ICalculatorIndicatorOutput,
  Indicator extends IWidgetIndicator,
> = Output & { indicator: Indicator };

export function bindContentWithIndicator<
  Output extends ICalculatorIndicatorOutput,
  Indicator extends IWidgetIndicator,
>(
  outputs: Map<string, Output>,
  indicator: Indicator
): TBoundedContentWithIndicator<Output, Indicator> | undefined {
  const indicatorContent = outputs.get(String(indicator.id));

  return indicatorContent && { ...indicatorContent, indicator };
}

/**
 * Связать показатели с вычисленным для них контентом
 * @param outputs Map выходов вычислителя по идентификатору показателя
 * @param indicators массив показателей из settings виджета
 * Массив объектов, каждый из которых содержит показатель и его контент
 */
export function bindContentsWithIndicators<
  Output extends ICalculatorIndicatorOutput,
  Indicator extends IWidgetIndicator,
>(outputs: Map<string, Output>, indicators: Indicator[]) {
  return compactMap(indicators, (indicator) =>
    bindContentWithIndicator(outputs, indicator)
  );
}
