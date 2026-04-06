import { SchemaRegistry } from "./schemaRegistry";

describe("SchemaRegistry", () => {
  const zStub = {
    object: (v: any) => ({
      value: v,
      meta(meta: any) {
        return { ...this, meta };
      },
    }),
  } as any;

  beforeEach(() => {
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

  test("get возвращает схему из registry", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "1",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
      },
    });

    const result = SchemaRegistry.get("Test");

    expect(result).toBe(schema);
  });

  test("аннотирует схемы через typeKey", () => {
    const schema = SchemaRegistry.define({
      key: "Test",
      latestVersion: "1",
      history: {
        "1": (z: any) => z.object({ v: 1 }),
      },
    });

    const result = schema(zStub);

    expect(result.meta).toEqual({ type: "Test" });
  });
});
