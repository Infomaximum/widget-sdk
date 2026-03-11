import { SchemaRegistry } from "./schemaRegistry";

describe("Базовая работоспособность SchemaRegistry", () => {
  const zStub = {
    object: (v: any) => ({
      value: v,
      meta(meta: any) {
        return { ...this, meta };
      },
    }),
  } as any;

  beforeEach(() => {
    // очистка registry между тестами
    (SchemaRegistry as any).registry = new Map();
  });

  test("регистрирует схему в registry", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    const fromRegistry = (SchemaRegistry as any).registry.get("Test");

    expect(fromRegistry).toBe(schema);
  });

  test("возвращает последнюю версию при вызове schema(z)", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    const result = schema(zStub);

    expect(result.value).toEqual({ v: 2 });
  });

  test("forVersion возвращает точную версию", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    const factory = schema.forVersion("1");
    const result = factory(zStub);

    expect(result.value).toEqual({ v: 1 });
  });

  test("forVersion(null) возвращает последнюю версию", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    const factory = schema.forVersion(null);
    const result = factory(zStub);

    expect(result.value).toEqual({ v: 2 });
  });

  test("forVersion(undefined) возвращает последнюю версию", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    const factory = schema.forVersion(undefined);
    const result = factory(zStub);

    expect(result.value).toEqual({ v: 2 });
  });

  test("forVersion выбирает ближайшую версию если точной нет", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "4",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "4": (z: any) => z.object({ v: 4 }),
      },
    });

    const factory = schema.forVersion("3");
    const result = factory(zStub);

    expect(result.value).toEqual({ v: 1 });
  });

  test("выбрасывает ошибку если нет подходящей версии", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "2",
      history: {
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    expect(() => schema.forVersion("1")).toThrow();
  });
});

describe("findClosestVersion", () => {
  const findClosestVersion = SchemaRegistry["findClosestVersion"];
  const compare = (a: number, b: number) => a - b;

  test("возвращает точное совпадение", () => {
    const result = findClosestVersion([2, 1, 3], 2, compare);

    expect(result).toBe(2);
  });

  test("возвращает ближайшую меньшую версию", () => {
    const result = findClosestVersion([1, 5, 3], 4, compare);

    expect(result).toBe(3);
  });

  test("возвращает наибольшую версию, не превышающую целевую", () => {
    const result = findClosestVersion([2, 1, 3], 10, compare);

    expect(result).toBe(3);
  });

  test("возвращает undefined, если все версии больше целевой", () => {
    const result = findClosestVersion([6, 5, 7], 3, compare);

    expect(result).toBeUndefined();
  });
});

describe("compareVersions", () => {
  const compareVersions = SchemaRegistry["compareVersions"];

  test("возвращает 0 для одинаковых версий", () => {
    expect(compareVersions("1.2.3", "1.2.3")).toBe(0);
  });

  test("возвращает -1 если первая версия меньше", () => {
    expect(compareVersions("1.2.0", "1.3.0")).toBe(-1);
  });

  test("возвращает 1 если первая версия больше", () => {
    expect(compareVersions("2.0.0", "1.9.9")).toBe(1);
  });

  test("учитывает отсутствующие части версии как 0", () => {
    expect(compareVersions("1.2", "1.2.0")).toBe(0);
  });

  test("сравнивает major версию", () => {
    expect(compareVersions("2.0.0", "1.0.0")).toBe(1);
  });

  test("сравнивает minor версию", () => {
    expect(compareVersions("1.3.0", "1.2.9")).toBe(1);
  });

  test("сравнивает patch версию", () => {
    expect(compareVersions("1.2.4", "1.2.3")).toBe(1);
  });
});
