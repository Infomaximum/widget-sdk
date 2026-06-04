import type { TNullable } from "./utilityTypes";
import { VersionedEnum, type TVersionedEnumValues } from "./versionedEnum";

export const ESimpleDataType = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      OTHER: "OTHER",
      DATE: "DATE",
      FLOAT: "FLOAT",
      DATETIME: "DATETIME",
      STRING: "STRING",
      INTEGER: "INTEGER",
      DATETIME64: "DATETIME64",
      BOOLEAN: "BOOLEAN",
    } as const,
  },
});

export type TSimpleDataType = TVersionedEnumValues<typeof ESimpleDataType>;

export type TDbTypeContainer = "Array" | "Nullable";

/** Результат разбора типа данных из базы данных (в будущем возможна поддержка других СУБД помимо ClickHouse) */
export interface IParsedDbType<T extends TNullable<string> = string> {
  /** Контейнеры над базовым типом в порядке от внешнего к внутреннему */
  containers: TDbTypeContainer[];
  /** Исходный базовый тип (без контейнеров) */
  dbBaseDataType: T;
  /** Обобщенный базовый тип */
  simpleBaseType: TSimpleDataType;
  /** Обобщенный исходный тип (при наличии контейнера `Array` классифицируется как `OTHER`) */
  simpleType: TSimpleDataType;
}
