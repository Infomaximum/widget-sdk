import type { ZodObject } from "zod";

// NOTE: В будущем можно сделать fluent-обёртку для цепочных вызовов:
//   withMetaDecorator(schema).omit({ field: true }).extend({ newField: z.string() })
// Это позволит избежать вложенных вызовов omitWithMeta/extendWithMeta.

const PARENT_META_KEY = "parent";

/**
 * Возвращает родительскую мету схемы, установленную через extendWithMeta / omitWithMeta.
 * Используй для обхода цепочки наследования схем.
 */
export function getParentMeta(meta: Record<string, unknown>): Record<string, unknown> | undefined {
  return meta[PARENT_META_KEY] as Record<string, unknown> | undefined;
}

function inheritMeta<T extends ZodObject<any, any>>(target: T, source: ZodObject<any, any>): T {
  const sourceMeta = source.meta();

  return sourceMeta !== undefined ? target.meta({ [PARENT_META_KEY]: sourceMeta }) : target;
}

/**
 * Расширяет Zod-схему дополнительными полями, сохраняя цепочку наследования мет.
 *
 * Мета базовой схемы сохраняется как `parent` в мете расширенной схемы — формируя
 * иммутабельный связанный список.
 *
 * Используй вместо `.extend()` при расширении схем, задекларированных через
 * `SchemaRegistry.define`, — это обязательное условие корректной работы миграций.
 *
 * @example
 * // Вместо:
 * DimensionSchema(z).extend({ color: ColorSchema(z) })
 *
 * // Используй:
 * extendWithMeta(DimensionSchema(z), { color: ColorSchema(z) })
 */
export function extendWithMeta<
  TShape extends Record<string, any>,
  TConfig extends { out: Record<string, any>; in: Record<string, any> },
  U extends Record<string, any>,
>(schema: ZodObject<TShape, TConfig>, extension: U) {
  return inheritMeta(schema.extend(extension), schema);
}

/**
 * Создаёт Zod-схему с удалёнными полями, сохраняя цепочку наследования мет.
 *
 * Мета базовой схемы сохраняется как `parent` в мете результирующей схемы.
 *
 * Используй вместо `.omit()` при работе со схемами, задекларированными через
 * `SchemaRegistry.define`, — это обязательное условие корректной работы миграций.
 *
 * @example
 * // Вместо:
 * BaseWidgetSettingsSchema(z).omit({ paddings: true })
 *
 * // Используй:
 * omitWithMeta(BaseWidgetSettingsSchema(z), { paddings: true })
 */
export function omitWithMeta<
  TShape extends Record<string, any>,
  TConfig extends { out: Record<string, any>; in: Record<string, any> },
  M extends { [k in keyof TShape]?: true },
>(schema: ZodObject<TShape, TConfig>, keys: M) {
  return inheritMeta(schema.omit(keys), schema);
}

/**
 * Проверяет, есть ли в цепочке наследования мет узел, удовлетворяющий предикату.
 *
 * Обходит цепочку от текущей меты к корню через ссылки parent, установленные
 * функциями extendWithMeta / omitWithMeta.
 *
 * @example
 * hasInMetaChain(schema.meta(), (meta) => meta.type === "WidgetDimension")
 */
export function hasInMetaChain(
  meta: Record<string, unknown> | undefined,
  predicate: (meta: Record<string, unknown>) => boolean
): boolean {
  let current = meta;

  while (current !== undefined) {
    if (predicate(current)) return true;
    current = getParentMeta(current);
  }

  return false;
}
