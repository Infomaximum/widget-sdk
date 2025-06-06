import type {
  ICalculator,
  ICalculatorFilter,
  ICalculatorMeasureInput,
} from "../calculator/calculator";

export interface IGraphElement {
  /** Значения мер по alias */
  values: Map<string, string>;
  /** Коллекция дополнительных значений мер по alias меры */
  additionalValues: Map<string, Map<string, string>>;
}

export interface IVertex extends IGraphElement {
  name: string | null;
}

export interface IEdge extends IGraphElement {
  beginName: string | null;
  endName: string | null;
}

export interface IProcessGraphCalculatorInput {
  processKey: string;
  vertexLimit: number | null;
  edgeLimit: number;
  vertexMeasures: ICalculatorMeasureInput[];
  edgeMeasures: ICalculatorMeasureInput[];
  filters: ICalculatorFilter[];
  eventFilters?: ICalculatorFilter[];
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
}

export interface IProcessGraphCalculator
  extends ICalculator<IProcessGraphCalculatorInput, IProcessGraphCalculatorOutput> {}
