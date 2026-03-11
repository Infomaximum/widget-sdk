import { assignPropsToFn } from "./utils/functions";
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
export interface IVersionedSchema<
  THistory extends Record<string, ISchemaFactory> = Record<string, ISchemaFactory>,
  TLatestVersion extends keyof THistory = keyof THistory,
> extends ISchemaFactory<ReturnType<THistory[TLatestVersion]>> {
  /**
   * Получить фабрику схемы для версии.
   *
   * Если нет - выбирается ближайшая версия ≤ указанной.
   * Если такой версии нет - выбрасывается ошибка.
   */
  forVersion<Version extends keyof THistory>(version: Version): THistory[Version];
  forVersion(version: string): THistory[keyof THistory];
}

/** Параметры декларации версионированной схемы */
interface IVersionedSchemaParams<
  THistory extends Record<string, ISchemaFactory>,
  TLatestVersion extends keyof THistory,
> {
  /**
   * Ключ схемы в глобальном registry.

   * Используется для последующего поиска схемы по ключу.
   */
  key: string;

  /**
   * Последняя (актуальная) версия схемы.
   *
   * Указывается явно, чтобы упростить вывод типов.
   * Должна присутствовать среди ключей `history`.
   */
  latestVersion: TLatestVersion;

  /**
   * История версий схем.
   *
   * Ключ - строковая версия (например `"1"`).
   * Значение - фабрика схемы.
   */
  history: THistory | (() => THistory);
}

/** Глобальный реестр версионированных схем (только для чтения) */
export class SchemaRegistryReader {
  /**
   * Имя поля в метаданных схемы, в котором хранится идентификатор типа схемы.
   *
   * Это поле добавляется ко всем схемам, зарегистрированным через `SchemaRegistry`.
   */
  public static typeKey = "type";

  protected static registry = new Map<string, IVersionedSchema>();

  /** Получить версионированную схему из `registry` по ключу схемы */
  public static get(schemaKey: string) {
    return this.registry.get(schemaKey);
  }
}

/**
 * Глобальный реестр версионированных схем (для внутреннего использования).
 *
 * Отвечает за:
 *
 * 1. Декларацию версионированных схем
 * 2. Регистрацию схем по ключу
 * 3. Поиск схем по ключу
 */
export class SchemaRegistry extends SchemaRegistryReader {
  /**
   * Семантическое сравнение версий.
   *
   * Поддерживается формат: MAJOR.MINOR.PATCH
   *
   * Примеры:
   *
   * compareVersions("1.2.0", "1.3.0") -> -1
   * compareVersions("2.0.0", "1.9.9") -> 1
   * compareVersions("1.2.0", "1.2.0") -> 0
   *
   * @note возможно, стоит рассмотреть использование библиотеки semver
   */
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

  /**
   * Найти ближайшую версию ≤ целевой.
   *
   * Алгоритм:
   * 1. Версии сортируются по убыванию.
   * 2. Возвращается первая версия, которая ≤ targetVersion.
   * 3. Если такой версии нет - возвращается undefined.
   */
  private static findClosestVersion<T>(
    versions: T[],
    targetVersion: T,
    compare: (a: T, b: T) => number
  ): T | undefined {
    return versions
      .toSorted((a, b) => compare(b, a))
      .find((version) => compare(version, targetVersion) <= 0);
  }

  /** Добавляет в метаданные схемы идентификатор её типа (registry key). */
  private static annotateSchemaType<T extends ISchemaFactory>(schemaFactory: T, type: string): T {
    return ((z: TZod) => schemaFactory(z).meta({ [this.typeKey]: type })) as T;
  }

  /** Объявляет версионированную схему и регистрирует её во внутреннем `registry` */
  public static define<
    THistory extends Record<string, ISchemaFactory>,
    TLatestVersion extends keyof THistory,
  >(
    params: IVersionedSchemaParams<THistory, TLatestVersion>
  ): IVersionedSchema<THistory, TLatestVersion> {
    const history = typeof params.history === "function" ? params.history() : params.history;
    const latestFactory = history[params.latestVersion];

    if (!latestFactory) {
      throw new Error("Не найдено записи в 'history' по 'latestVersion'");
    }

    const schema = assignPropsToFn(this.annotateSchemaType(latestFactory, params.key), {
      forVersion: (targetVersion: string): THistory[keyof THistory] => {
        if (targetVersion in history) {
          return history[targetVersion] as THistory[keyof THistory];
        }

        const closestVersion = this.findClosestVersion(
          Object.keys(history),
          targetVersion,
          SchemaRegistry.compareVersions
        );

        if (closestVersion === undefined || !(closestVersion in history)) {
          throw new Error(`Не найдено подходящей схемы для версии '${targetVersion}'`);
        }

        return this.annotateSchemaType(
          history[closestVersion] as THistory[keyof THistory],
          params.key
        );
      },
    });

    this.registry.set(params.key, schema);

    return schema as IVersionedSchema<THistory, TLatestVersion>;
  }
}
