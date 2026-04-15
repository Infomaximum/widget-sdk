import { assignPropsToFn, mapValues } from "./utils/functions";
import type { ISchemaFactory, TZod } from "./zod.types";

/**
 * Версионированная схема.
 *
 * Это callable-объект: schema(z)
 * возвращает актуальную (latest) версию схемы.
 *
 * Дополнительно предоставляет API для получения фабрики
 * конкретной версии схемы: schema.forVersion("1.2")
 *
 * Если точная версия отсутствует, выбирается ближайшая версия
 * не новее запрошенной (semver-подобное поведение).
 */
export type TVersionedSchema<
  THistory extends Record<string, ISchemaFactory> = Record<string, ISchemaFactory>,
  TLatestVersion extends keyof THistory = keyof THistory,
> = THistory[TLatestVersion] & {
  /**
   * Получить фабрику схемы для указанной версии.
   *
   * Поведение:
   * - Если передан ключ из `history` - возвращается точная версия.
   * - Если передана произвольная строка - выбирается ближайшая версия ≤ указанной.
   * - Если передан `null` или `undefined` - возвращается последняя (`latestVersion`) версия.
   * - Если подходящей версии не найдено - выбрасывается ошибка.
   */
  forVersion<Version extends keyof THistory>(version: Version): THistory[Version];
  forVersion(version: string): THistory[keyof THistory];
  forVersion(version: null | undefined): THistory[TLatestVersion];
};

/** Параметры для построения версионированной схемы */
export interface IVersionedSchemaBuildParams<
  THistory extends Record<string, ISchemaFactory>,
  TLatestVersion extends keyof THistory,
> {
  /**
   * Последняя (актуальная) версия схемы.
   * Должна присутствовать среди ключей `history`.
   */
  latestVersion: TLatestVersion;

  /**
   * История версий схем.
   *
   * Ключ - строковая версия (например `"1"`).
   * Значение - фабрика схемы.
   */
  history: THistory;

  /** Метаданные, которые будут добавлены ко всем версиям схемы */
  meta?: Record<string, unknown>;
}

/** Фабрика версионированных схем. Не содержит состояния */
export class VersionedSchemaFactory {
  private static compareVersions(a: string, b: string) {
    const partsA = a.split(".").map(Number);
    const partsB = b.split(".").map(Number);

    const length = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < length; i++) {
      const pa = partsA[i] ?? 0;
      const pb = partsB[i] ?? 0;

      const diff = Math.sign(pa - pb);

      if (diff !== 0) {
        return diff;
      }
    }

    return 0;
  }

  private static findClosestVersion<T>(
    versions: T[],
    targetVersion: T,
    compare: (a: T, b: T) => number
  ): T | undefined {
    return versions
      .toSorted((a, b) => compare(b, a))
      .find((version) => compare(version, targetVersion) <= 0);
  }

  /** Добавляет метаданные к схеме (curried) */
  private static annotateSchema(meta: Record<string, unknown> | undefined) {
    if (meta === undefined) {
      return <T extends ISchemaFactory>(schemaFactory: T): T => schemaFactory;
    }

    return <T extends ISchemaFactory>(schemaFactory: T): T =>
      ((z: TZod, ...restArgs) => schemaFactory(z, ...restArgs).meta(meta)) as T;
  }

  /**
   * Оборачивает фабрику схемы, добавляя кеширование результата.
   *
   * Предполагается, что `z` — синглтон (один экземпляр на всё приложение),
   * поэтому достаточно закешировать единственный результат.
   *
   * Вызовы с дополнительными аргументами (restArgs) не кешируются,
   * так как результат может зависеть от их значений.
   */
  private static withCache<T extends ISchemaFactory>(schemaFactory: T): T {
    let cached: ReturnType<T> | undefined;

    return ((z: TZod, ...restArgs: unknown[]) => {
      if (restArgs.length > 0) {
        return schemaFactory(z, ...restArgs);
      }

      if (cached === undefined) {
        cached = schemaFactory(z) as ReturnType<T>;
      }

      return cached;
    }) as T;
  }

  /** Построить версионированную схему */
  public static build<
    THistory extends Record<string, ISchemaFactory>,
    TLatestVersion extends keyof THistory,
  >({
    history,
    latestVersion,
    meta,
  }: IVersionedSchemaBuildParams<THistory, TLatestVersion>): TVersionedSchema<
    THistory,
    TLatestVersion
  > {
    const latestFactory = history[latestVersion];

    if (!latestFactory) {
      throw new Error("Не найдено записи в 'history' по 'latestVersion'");
    }

    const annotate = this.annotateSchema(meta);

    const preparedHistory = mapValues(history, (factory) =>
      this.withCache(annotate(factory))
    ) as THistory;

    const schema = assignPropsToFn(preparedHistory[latestVersion], {
      forVersion: (targetVersion: string | null | undefined): THistory[keyof THistory] => {
        if (targetVersion === null || targetVersion === undefined) {
          return preparedHistory[latestVersion];
        }

        if (targetVersion in preparedHistory) {
          return preparedHistory[targetVersion] as THistory[keyof THistory];
        }

        const closestVersion = this.findClosestVersion(
          Object.keys(preparedHistory),
          targetVersion,
          VersionedSchemaFactory.compareVersions
        );

        if (closestVersion === undefined || !(closestVersion in preparedHistory)) {
          throw new Error(`Не найдено подходящей схемы для версии '${targetVersion}'`);
        }

        return preparedHistory[closestVersion] as THistory[keyof THistory];
      },
    });

    return schema as TVersionedSchema<THistory, TLatestVersion>;
  }
}
