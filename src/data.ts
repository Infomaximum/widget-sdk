import type { TNullable } from "./utilityTypes";

export enum ESimpleDataType {
  OTHER = "OTHER",
  DATE = "DATE",
  FLOAT = "FLOAT",
  DATETIME = "DATETIME",
  STRING = "STRING",
  INTEGER = "INTEGER",
  DATETIME64 = "DATETIME64",
  BOOLEAN = "BOOLEAN",
}

export type TDbTypeContainer = "Array" | "Nullable";

/** Результат разбора типа данных из базы данных (в будущем возможна поддержка других СУБД помимо ClickHouse) */
export interface IParsedDbType<T extends TNullable<string> = string> {
  /** Контейнеры над базовым типом в порядке от внешнего к внутреннему */
  containers: TDbTypeContainer[];
  /** Исходный базовый тип (без контейнеров) */
  dbBaseDataType: T;
  /** Обобщенный базовый тип */
  simpleBaseType: ESimpleDataType;
  /** Обобщенный исходный тип (при наличии контейнера `Array` классифицируется как `OTHER`) */
  simpleType: ESimpleDataType;
}
