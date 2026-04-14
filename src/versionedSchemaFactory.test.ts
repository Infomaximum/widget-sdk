import { VersionedSchemaFactory } from "./versionedSchemaFactory";

describe("VersionedSchemaFactory", () => {
  const zStub = {
    object: (v: any) => ({
      value: v,
      meta(meta: any) {
        return { ...this, meta };
      },
    }),
  } as any;

  test("возвращает последнюю версию при вызове schema(z)", () => {
    const schema = VersionedSchemaFactory.build({
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
    const schema = VersionedSchemaFactory.build({
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
    const schema = VersionedSchemaFactory.build({
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
    const schema = VersionedSchemaFactory.build({
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
    const schema = VersionedSchemaFactory.build({
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
    const schema = VersionedSchemaFactory.build({
      latestVersion: "2",
      history: {
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    expect(() => schema.forVersion("1")).toThrow();
  });

  test("meta применяется ко всем версиям схемы", () => {
    const schema = VersionedSchemaFactory.build({
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
      meta: { tagged: true },
    });

    expect(schema(zStub).meta.tagged).toBe(true);
    expect(schema.forVersion("1")(zStub).meta.tagged).toBe(true);
  });

  test("дополнительные аргументы фабрики передаются корректно", () => {
    const schema = VersionedSchemaFactory.build({
      latestVersion: "1",
      history: {
        "1": (z: any, a: number, b: number) => z.object({ a, b }),
      },
      meta: { tagged: true },
    });

    const result = schema(zStub, 2, 3);

    expect(result.value).toEqual({ a: 2, b: 3 });
  });
});

describe("кеширование результатов фабрики", () => {
  const zStub = { object: (v: any) => ({ value: v }) } as any;

  test("повторный вызов schema(z) возвращает тот же объект", () => {
    const schema = VersionedSchemaFactory.build({
      latestVersion: "1",
      history: { "1": (z: any) => z.object({ v: 1 }) },
    });

    expect(schema(zStub)).toBe(schema(zStub));
  });

  test("повторный вызов forVersion()(z) возвращает тот же объект", () => {
    const schema = VersionedSchemaFactory.build({
      latestVersion: "2",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
        "2": (z: any) => z.object({ v: 2 }),
      },
    });

    expect(schema.forVersion("1")(zStub)).toBe(schema.forVersion("1")(zStub));
  });

  test("повторные forVersion('X') возвращают одну и ту же фабрику", () => {
    const schema = VersionedSchemaFactory.build({
      latestVersion: "1",
      history: { "1": (z: any) => z.object({ v: 1 }) },
    });

    expect(schema.forVersion("1")).toBe(schema.forVersion("1"));
  });

  test("фабрика вызывается ровно один раз при нескольких schema(z)", () => {
    const factory = jest.fn((z: any) => z.object({ v: 1 }));

    const schema = VersionedSchemaFactory.build({
      latestVersion: "1",
      history: { "1": factory },
    });

    schema(zStub);
    schema(zStub);
    schema(zStub);

    expect(factory).toHaveBeenCalledTimes(1);
  });

  test("фабрика вызывается ровно один раз при нескольких forVersion()(z)", () => {
    const factory = jest.fn((z: any) => z.object({ v: 1 }));

    const schema = VersionedSchemaFactory.build({
      latestVersion: "1",
      history: { "1": factory },
    });

    schema.forVersion("1")(zStub);
    schema.forVersion("1")(zStub);

    expect(factory).toHaveBeenCalledTimes(1);
  });

  test("вызовы с restArgs не кешируются", () => {
    const factory = jest.fn((z: any, n: number) => z.object({ n }));

    const schema = VersionedSchemaFactory.build({
      latestVersion: "1",
      history: { "1": factory },
    });

    schema(zStub, 1);
    schema(zStub, 2);

    expect(factory).toHaveBeenCalledTimes(2);
  });
});

describe("findClosestVersion", () => {
  const findClosestVersion = VersionedSchemaFactory["findClosestVersion"];
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
  const compareVersions = VersionedSchemaFactory["compareVersions"];

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
