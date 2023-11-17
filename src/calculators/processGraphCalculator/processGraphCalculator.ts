import type { IProcessIndicator } from "../../indicators";
import type { TNullable } from "../../utilityTypes";
import type {
  ICalculator,
  ICalculatorFilter,
  ICalculatorMeasureInput,
} from "../calculator/calculator";
import type { ICalculatorVariablesValues } from "../variables";

export interface IGraphElement {
  /** Значения мер по alias */
  values: Map<string, string>;
  /** Коллекция дополнительных значений мер по alias меры */
  additionalValues: Map<string, Map<string, string>>;
}

export interface IVertex extends IGraphElement {
  name: string;
}

export interface IEdge extends IGraphElement {
  beginName: string | null;
  endName: string | null;
}

export interface IProcessGraphCalculatorInput<
  VertexMeasure extends IProcessIndicator = IProcessIndicator,
  EdgeMeasure extends IProcessIndicator = IProcessIndicator,
> {
  processGuid: string;
  vertexLimit: number | null;
  edgeLimit: number;
  vertexMeasures: ICalculatorMeasureInput<VertexMeasure>[];
  edgeMeasures: ICalculatorMeasureInput<EdgeMeasure>[];
  filters: ICalculatorFilter[];
  eventFilters?: ICalculatorFilter[];
  displayConditionFormula?: TNullable<string>;
  /** Значения переменных */
  variablesValues?: ICalculatorVariablesValues;
}

export interface IProcessGraphCalculatorOutput {
  vertexMaxLimit: number;
  /** Значение веса вершины по умолчанию, если вес не был передан явно */
  defaultVertexLimit: number | null;
  /** alias'ы мер, попавших под условие отображения */
  vertexMeasuresAliases: Set<string>;
  vertices: IVertex[];

  edgeMaxLimit: number;
  /** alias'ы мер, попавших под условие отображения */
  edgeMeasuresAliases: Set<string>;
  edges: IEdge[];

  isDisplay: boolean;
}

export interface IProcessGraphCalculator
  extends ICalculator<
    IProcessGraphCalculatorInput,
    IProcessGraphCalculatorOutput
  > {}
