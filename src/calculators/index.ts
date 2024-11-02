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

/** Фабрика вычислителей */
export interface ICalculatorFactory {
  /**
   * Общий вычислитель.
   * Вычисляет любое(ограничено только ClickHouse) количество разрезов и мер.
   * Количество строк ограничивается переданным лимитом.
   *
   * Подходит для большинства задач, где требуется сделать одну или несколько группировок
   * и при необходимости посчитать показатель по каждой группе.
   */
  general: () => IGeneralCalculator;
  /**
   * Вычислитель с двумя лимитами.
   * Для работы требует ровно 2 разреза(для каждого из которых указывается свой лимит) и
   * любое количеством мер.
   *
   * Используется для отображения данных в виде двумерных матриц со значениями разрезов на осях.
   */
  twoLimits: () => ITwoLimitsCalculator;
  /**
   * Вычислитель круговой диаграммы.
   * Для работы требует ровно 1 разрез и 1 меру.
   *
   * В отличие от других вычислителей, считает итог по мере как сумму значений по всем строкам,
   * а не как меру по всему объему данных. Такая особенность необходима для расчета
   * размера оставшегося сектора круговой диаграммы.
   */
  pie: () => IPieCalculator;
  /**
   * Вычислитель, предназначенный для вычисления графа по переданному процессу.
   * Возвращает информацию о событиях процесса и связях(переходах) между ними.
   *
   * Может вычислять любое количество мер, отдельно для событий и переходов.
   */
  processGraph: () => IProcessGraphCalculator;
  /**
   * Вычислитель гистограммы.
   * Вычисляет "корзины" для переданного разреза.
   */
  histogram: () => IHistogramCalculator;
  /**
   * Вычислитель типа для разрезов и мер.
   * Принимает любое количество разрезов и мер.
   *
   * Под капотом использует general-вычислитель, оборачивая формулы в toTypeName, поэтому
   * все переданные формулы должны использовать связанные таблицы модели данных.
   */
  type: () => ITypeCalculator;
}
