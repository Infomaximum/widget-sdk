import { parseClickHouseType } from "./clickHouseTypes";
import { ESimpleDataType } from "./data";

describe("generalizeClickHouseType", () => {
  it("Тип данных без обертки", () => {
    const { simpleBaseType, containers } = parseClickHouseType("Int8");

    expect(containers).toEqual([]);
    expect(simpleBaseType).toBe(ESimpleDataType.INTEGER);
  });

  it("Тип данных без обертки с параметрами", () => {
    const { simpleBaseType, containers } = parseClickHouseType("DateTime64(3, 'Europe/Moscow')");

    expect(containers).toEqual([]);
    expect(simpleBaseType).toBe(ESimpleDataType.DATETIME64);
  });

  it("Тип данных с оберткой", () => {
    const { simpleBaseType, containers } = parseClickHouseType(`Nullable(String)`);

    expect(containers).toEqual(["Nullable"]);
    expect(simpleBaseType).toBe(ESimpleDataType.STRING);
  });

  it("Тип данных с оберткой и параметрами", () => {
    const { simpleBaseType, containers } = parseClickHouseType(
      `Nullable(DateTime64(3, 'Europe/Moscow'))`
    );

    expect(containers).toEqual(["Nullable"]);
    expect(simpleBaseType).toBe(ESimpleDataType.DATETIME64);
  });

  it("Тип данных с несколькими обертками", () => {
    const { simpleBaseType, containers } = parseClickHouseType(
      `Array(Array(Nullable(DateTime64)))`
    );

    expect(containers).toEqual(["Array", "Array", "Nullable"]);
    expect(simpleBaseType).toBe(ESimpleDataType.DATETIME64);
  });

  it("Тип данных с несколькими обертками и параметрами", () => {
    const { simpleBaseType, containers } = parseClickHouseType(
      `Array(Array(Nullable(DateTime64('2019-01-01 00:00:00', 3, 'Europe/Moscow'))))`
    );

    expect(containers).toEqual(["Array", "Array", "Nullable"]);
    expect(simpleBaseType).toBe(ESimpleDataType.DATETIME64);
  });
});
