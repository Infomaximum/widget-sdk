import {
  VersionedSchemaFactory,
  type IVersionedSchemaBuildParams,
  type TVersionedSchema,
} from "./versionedSchemaFactory";
import type { ISchemaFactory } from "./zod.types";

/** Параметры декларации версионированной схемы */
interface IVersionedSchemaParams<
  THistory extends Record<string, ISchemaFactory>,
  TLatestVersion extends keyof THistory,
> extends Omit<IVersionedSchemaBuildParams<THistory, TLatestVersion>, "meta"> {
  /**
   * Ключ схемы в глобальном registry.
   *
   * Используется для последующего поиска схемы по ключу.
   */
  key: string;
}

/**
 * Глобальный реестр версионированных схем (публичный слой, только чтение).
 *
 * Отвечает за:
 *
 * 1. Хранение зарегистрированных схем
 * 2. Поиск схем по ключу
 *
 * Не предоставляет API для модификации registry.
 */
export class SchemaRegistryReader {
  /**
   * Имя поля в метаданных схемы, в котором хранится идентификатор типа схемы.
   *
   * Это поле добавляется ко всем схемам, зарегистрированным через `SchemaRegistry`.
   */
  public static typeKey = "type";

  protected static registry = new Map<string, TVersionedSchema>();

  /** Получить версионированную схему из `registry` по ключу схемы */
  public static get(schemaKey: string) {
    return this.registry.get(schemaKey);
  }
}

/**
 * Глобальный реестр версионированных схем (внутренний слой).
 *
 * Расширяет SchemaRegistryReader возможностью создать запись в registry.
 *
 * Отвечает за:
 * 1. Декларацию схем (build + аннотация)
 * 2. Регистрацию схем по ключу
 */
export class SchemaRegistry extends SchemaRegistryReader {
  /** Объявляет версионированную схему и регистрирует её во внутреннем `registry` */
  public static define<
    THistory extends Record<string, ISchemaFactory>,
    TLatestVersion extends keyof THistory,
  >({
    key,
    history,
    latestVersion,
  }: IVersionedSchemaParams<THistory, TLatestVersion>): TVersionedSchema<THistory, TLatestVersion> {
    const schema = VersionedSchemaFactory.build({
      history,
      latestVersion,
      meta: { [this.typeKey]: key },
    });

    this.registry.set(key, schema);

    return schema;
  }
}
