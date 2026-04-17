// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { z } from "zod";
import { extendWithMeta, getParentMeta, hasInMetaChain, omitWithMeta } from "./schemaMeta";

const schemaA = z.object({ a: z.string() }).meta({ type: "A" });
const schemaB = extendWithMeta(schemaA, { b: z.number() }).meta({ type: "B" });
const schemaC = extendWithMeta(schemaB, { c: z.boolean() }).meta({ type: "C" });

describe("hasInMetaChain", () => {
  describe("граничные случаи", () => {
    it("возвращает false при meta = undefined", () => {
      expect(hasInMetaChain(undefined, () => true)).toBe(false);
    });

    it("не вызывает предикат при meta = undefined", () => {
      const predicate = jest.fn(() => true);
      hasInMetaChain(undefined, predicate);
      expect(predicate).not.toHaveBeenCalled();
    });

    it("возвращает false при непустой мете без совпадений", () => {
      expect(hasInMetaChain(schemaC.meta(), (m) => m.type === "Z")).toBe(false);
    });
  });

  describe("одиночный узел (нет parent)", () => {
    it("возвращает true если предикат совпадает с единственным узлом", () => {
      expect(hasInMetaChain(schemaA.meta(), (m) => m.type === "A")).toBe(true);
    });

    it("возвращает false если предикат не совпадает", () => {
      expect(hasInMetaChain(schemaA.meta(), (m) => m.type === "B")).toBe(false);
    });
  });

  describe("цепочка из нескольких узлов", () => {
    it("находит тип в корне цепочки (текущий узел)", () => {
      expect(hasInMetaChain(schemaC.meta(), (m) => m.type === "C")).toBe(true);
    });

    it("находит тип в середине цепочки (parent)", () => {
      expect(hasInMetaChain(schemaC.meta(), (m) => m.type === "B")).toBe(true);
    });

    it("находит тип в конце цепочки (grandparent)", () => {
      expect(hasInMetaChain(schemaC.meta(), (m) => m.type === "A")).toBe(true);
    });

    it("не идёт вверх по цепочке от дочернего к родительскому", () => {
      expect(hasInMetaChain(schemaA.meta(), (m) => m.type === "B")).toBe(false);
      expect(hasInMetaChain(schemaA.meta(), (m) => m.type === "C")).toBe(false);
    });

    it("останавливается на первом совпадении (не обходит всю цепочку)", () => {
      const calls: string[] = [];
      hasInMetaChain(schemaC.meta(), (m) => {
        if (typeof m.type === "string") calls.push(m.type);
        return m.type === "C";
      });
      expect(calls).toEqual(["C"]);
    });
  });

  describe("предикат по произвольному полю", () => {
    it("предикат может проверять любое поле меты", () => {
      const schema = z.object({}).meta({ version: 17, tag: "custom" });
      expect(hasInMetaChain(schema.meta(), (m) => m.version === 17)).toBe(true);
      expect(hasInMetaChain(schema.meta(), (m) => m.tag === "custom")).toBe(true);
      expect(hasInMetaChain(schema.meta(), (m) => m.tag === "other")).toBe(false);
    });
  });
});

describe("omitWithMeta", () => {
  const base = z.object({ a: z.string(), b: z.number(), c: z.boolean() }).meta({ type: "Base" });

  describe("результирующая схема", () => {
    it("удаляет указанные поля", () => {
      const result = omitWithMeta(base, { b: true });
      const parsed = result.parse({ a: "x", c: true });
      expect(parsed).toEqual({ a: "x", c: true });
      expect("b" in parsed).toBe(false);
    });

    it("сохраняет оставшиеся поля", () => {
      const result = omitWithMeta(base, { c: true });
      expect(result.parse({ a: "x", b: 1 })).toEqual({ a: "x", b: 1 });
    });
  });

  describe("цепочка мет", () => {
    it("сохраняет мету базовой схемы как parent", () => {
      const result = omitWithMeta(base, { b: true });
      const meta = result.meta();
      expect(meta).toBeDefined();
      expect(meta && getParentMeta(meta)).toEqual({ type: "Base" });
    });

    it("базовая схема без меты — parent не устанавливается", () => {
      const noMeta = z.object({ x: z.string(), y: z.number() });
      const result = omitWithMeta(noMeta, { y: true });
      expect(result.meta()).toBeUndefined();
    });

    it("hasInMetaChain находит тип базовой схемы через omitWithMeta", () => {
      const result = omitWithMeta(base, { b: true }).meta({ type: "Derived" });
      expect(hasInMetaChain(result.meta(), (m) => m.type === "Base")).toBe(true);
      expect(hasInMetaChain(result.meta(), (m) => m.type === "Derived")).toBe(true);
    });

    it("цепочка extendWithMeta + omitWithMeta сохраняет полную иерархию", () => {
      const extended = extendWithMeta(base, { d: z.string() }).meta({ type: "Extended" });
      const omitted = omitWithMeta(extended, { c: true }).meta({ type: "Omitted" });
      expect(hasInMetaChain(omitted.meta(), (m) => m.type === "Base")).toBe(true);
      expect(hasInMetaChain(omitted.meta(), (m) => m.type === "Extended")).toBe(true);
      expect(hasInMetaChain(omitted.meta(), (m) => m.type === "Omitted")).toBe(true);
    });
  });
});
