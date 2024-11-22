import { ESimpleDataType, type IParsedDbType, type TDbTypeContainer } from "./data";
import type { TNullable } from "./utilityTypes";
import { isNil, memoize } from "./utils/functions";

export enum EClickHouseBaseTypes {
  // DATE
  Date = "Date",
  Date32 = "Date32",

  // DATETIME
  DateTime = "DateTime",
  DateTime32 = "DateTime32",

  // DATETIME64
  DateTime64 = "DateTime64",

  // STRING
  FixedString = "FixedString",
  String = "String",

  // FLOAT
  Decimal = "Decimal",
  Decimal32 = "Decimal32",
  Decimal64 = "Decimal64",
  Decimal128 = "Decimal128",
  Decimal256 = "Decimal256",
  Float32 = "Float32",
  Float64 = "Float64",

  // INTEGER
  Int8 = "Int8",
  Int16 = "Int16",
  Int32 = "Int32",
  Int64 = "Int64",
  Int128 = "Int128",
  Int256 = "Int256",
  UInt8 = "UInt8",
  UInt16 = "UInt16",
  UInt32 = "UInt32",
  UInt64 = "UInt64",
  UInt128 = "UInt128",
  UInt256 = "UInt256",

  // BOOLEAN
  Bool = "Bool",
}

const stringTypes = ["String", "FixedString"];

export const parseClickHouseType = memoize(
  (type: TNullable<string>): IParsedDbType<EClickHouseBaseTypes | undefined> => {
    if (isNil(type)) {
      return {
        simpleBaseType: ESimpleDataType.OTHER,
        dbBaseDataType: undefined,
        containers: [],
        simpleType: ESimpleDataType.OTHER,
      };
    }

    const { containers, dbBaseDataType } = extractInnerType(type);

    if (!dbBaseDataType) {
      throw new Error(`Invalid ClickHouse type: ${type}`);
    }

    return {
      dbBaseDataType,
      simpleBaseType: simplifyBaseType(dbBaseDataType),
      containers,
      get simpleType() {
        return containers.includes("Array") ? ESimpleDataType.OTHER : this.simpleBaseType;
      },
    };
  }
);

/** 'A(B(C))' -> ['A', 'B', 'C'] */
const splitByBrackets = (input: string): string[] => input.split(/[\(\)]/).filter(Boolean);

/**
 * Отделить внутренний тип от оберток.
 * Не поддерживаются обертки Tuple и LowCardinality.
 */
const extractInnerType = (type: string) => {
  const tokens = splitByBrackets(type);

  // Удаление параметров типа.
  if (tokens.length > 0 && isTypeParameters(tokens.at(-1)!)) {
    tokens.pop();
  }

  const dbBaseDataType = tokens.pop() as EClickHouseBaseTypes;

  return { containers: tokens as TDbTypeContainer[], dbBaseDataType };
};

const simplifyBaseType = (dbBaseType: string): ESimpleDataType => {
  const isSourceTypeStartsWith = (prefix: string) => dbBaseType.startsWith(prefix);

  if (isSourceTypeStartsWith("Int") || isSourceTypeStartsWith("UInt")) {
    return ESimpleDataType.INTEGER;
  }

  if (isSourceTypeStartsWith("Decimal") || isSourceTypeStartsWith("Float")) {
    return ESimpleDataType.FLOAT;
  }

  if (stringTypes.some(isSourceTypeStartsWith)) {
    return ESimpleDataType.STRING;
  }

  if (isSourceTypeStartsWith("DateTime64")) {
    return ESimpleDataType.DATETIME64;
  }

  if (isSourceTypeStartsWith("DateTime")) {
    return ESimpleDataType.DATETIME;
  }

  if (isSourceTypeStartsWith("Date")) {
    return ESimpleDataType.DATE;
  }

  if (isSourceTypeStartsWith("Bool")) {
    return ESimpleDataType.BOOLEAN;
  }

  return ESimpleDataType.OTHER;
};

/**
 * - `3` -> true
 * - `3, 'Europe/Moscow'` -> true
 * - `3, Europe/Moscow` -> false
 *
 * Пример типа с параметрами: `DateTime64(3, 'Europe/Moscow')`
 */
const isTypeParameters = (stringifiedParameters: string) =>
  stringifiedParameters.split(", ").some((p) => !Number.isNaN(Number(p)) || p.startsWith("'"));
