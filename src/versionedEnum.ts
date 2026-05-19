/** Параметры для построения версионированного enum'а */
export interface IVersionedEnumBuildParams<
  THistory extends Readonly<Record<string, Readonly<Record<string, string>>>>,
  TLatestVersion extends Extract<keyof THistory, string>,
> {
  /** Последняя (актуальная) версия enum'а. Должна присутствовать среди ключей `history`. */
  latestVersion: TLatestVersion;

  /**
   * История версий enum'а.
   *
   * Ключ — строковая версия (например `"17"`).
   * Значение — объект-срез `{ KEY: "KEY" } as const`.
   *
   * Поддерживает как plain object, так и getter-форму `get history()`.
   */
  history: THistory;
}

/**
 * Тип возвращаемого значения `VersionedEnum.build`.
 *
 * Содержит все ключи/значения latest-среза (enumerable own props) плюс
 * non-enumerable Symbol-метод `[VersionedEnum.forVersion]` для обращения
 * к историческим срезам.
 */
export type TVersionedEnum<
  THistory extends Readonly<Record<string, Readonly<Record<string, string>>>>,
  TLatestVersion extends Extract<keyof THistory, string>,
> = Readonly<THistory[TLatestVersion]> & {
  readonly [VersionedEnum.forVersion]: <V extends keyof THistory | null | undefined>(
    version?: V
  ) => V extends keyof THistory ? Readonly<THistory[V]> : Readonly<THistory[TLatestVersion]>;
};

function compareVersions(a: string, b: string): number {
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

function findClosestVersion(target: string, versions: string[]): string | undefined {
  return versions
    .toSorted((a, b) => compareVersions(b, a))
    .find((version) => compareVersions(version, target) <= 0);
}

/**
 * Версионированный enum.
 *
 * Единственный санкционированный способ доступа к историческим срезам — через
 * `Symbol.for("@infomaximum/widget-sdk:VersionedEnum.forVersion")`.
 * Никаких других `VersionedEnum`-классов в проекте с тем же ключом.
 *
 * @example
 * ```ts
 * export const EWidgetFilterMode = VersionedEnum.build({
 *   latestVersion: "19",
 *   history: {
 *     "17": { DEFAULT: "DEFAULT", SINGLE: "SINGLE", MULTI: "MULTI", DISABLED: "DISABLED" } as const,
 *     "19": { DEFAULT: "DEFAULT", SINGLE: "SINGLE", DISABLED: "DISABLED" } as const,
 *   },
 * });
 *
 * // Использование latest-среза как обычного объекта:
 * EWidgetFilterMode.DEFAULT // "DEFAULT"
 * z.enum(EWidgetFilterMode)  // схема на latest-ключах
 *
 * // Получение исторического среза:
 * const v17 = EWidgetFilterMode[VersionedEnum.forVersion]("17");
 * v17.MULTI // "MULTI"
 * z.enum(v17) // схема на v17-ключах
 * ```
 */
export class VersionedEnum {
  /**
   * Symbol-ключ для доступа к историческим срезам.
   *
   * Зафиксирован как `Symbol.for("@infomaximum/widget-sdk:VersionedEnum.forVersion")` —
   * глобальный реестр гарантирует стабильность при дублировании пакета.
   * Никаких других `VersionedEnum`-классов в проекте с тем же ключом — запрет в ADR-0001.
   */
  public static readonly forVersion: unique symbol = Symbol.for(
    "@infomaximum/widget-sdk:VersionedEnum.forVersion"
  );

  /**
   * Построить версионированный enum.
   *
   * Поведение `[VersionedEnum.forVersion](target)`:
   * - `target == null` → возвращает latest-срез.
   * - `target` совпадает с ключом в `history` → точный срез.
   * - Иначе → `findClosestVersion` (ближайшая версия ≤ target).
   * - Если подходящей нет → `throw`.
   */
  public static build<
    THistory extends Readonly<Record<string, Readonly<Record<string, string>>>>,
    TLatestVersion extends Extract<keyof THistory, string>,
  >(
    params: IVersionedEnumBuildParams<THistory, TLatestVersion>
  ): TVersionedEnum<THistory, TLatestVersion> {
    const history = params.history;
    const latestVersion = params.latestVersion;

    const preparedMap = new Map<string, Readonly<Record<string, string>>>();

    for (const version of Object.keys(history)) {
      const slice = history[version];

      if (slice !== undefined) {
        preparedMap.set(version, Object.freeze({ ...slice }));
      }
    }

    const latestSlice = preparedMap.get(latestVersion);

    if (latestSlice === undefined) {
      throw new Error(`VersionedEnum: latestVersion="${latestVersion}" не найден в history`);
    }

    const availableVersions = Array.from(preparedMap.keys());

    const forVersionFn = (target?: string | null): Readonly<Record<string, string>> => {
      if (target == null) {
        return latestSlice;
      }

      const exact = preparedMap.get(target);

      if (exact !== undefined) {
        return exact;
      }

      const closest = findClosestVersion(target, availableVersions);

      if (closest === undefined) {
        throw new Error(
          `VersionedEnum: no slice for version=${target}, available: ${availableVersions.join(", ")}, and no earlier version available`
        );
      }

      return preparedMap.get(closest) as Readonly<Record<string, string>>;
    };

    const result = Object.defineProperty({ ...latestSlice }, VersionedEnum.forVersion, {
      value: forVersionFn,
      enumerable: false,
      configurable: false,
      writable: false,
    });

    return Object.freeze(result) as TVersionedEnum<THistory, TLatestVersion>;
  }
}

/**
 * Union строковых значений `VersionedEnum`, его исторического среза
 * или плоского `Record<string, string>`. Заменяет повторяющийся паттерн
 * `Extract<(typeof E)[keyof typeof E], string>` — нужен, чтобы отсечь
 * Symbol-ключ `forVersion` из `TVersionedEnum`.
 *
 * @example
 * export type TFontWeight = TVersionedEnumValues<typeof EFontWeight>;
 * export type TMarkdownDisplayMode = TVersionedEnumValues<typeof EMarkdownDisplayMode>;
 */
export type TVersionedEnumValues<T extends Readonly<Record<string, string>>> = Extract<
  T[keyof T],
  string
>;

/** Сужает ключи мапы до строковых — отбрасывает Symbol/number, если есть. */
type TStringKeyed<T> = { [K in keyof T as K extends string ? K : never]: T[K] };

/**
 * Готовит аргумент для `z.enum(...)` из `VersionedEnum`, его исторического среза
 * или плоского `Record<string, string>`.
 *
 * Решает структурную несовместимость `TVersionedEnum` (имеет non-enumerable
 * Symbol-ключ `forVersion`) с `EnumLike`-типом zod: на уровне типов отбрасывает
 * не-строковые ключи, на уровне runtime спред также не копирует non-enumerable
 * Symbol. Литералы значений сохраняются.
 *
 * @example
 * z.enum(zodEnumLike(EFontWeight))
 * z.enum(zodEnumLike(EFilterMode[VersionedEnum.forVersion]("17")))
 */
export function zodEnumLike<T extends Readonly<Record<string, string>>>(
  source: T
): TStringKeyed<T> {
  return { ...source } as unknown as TStringKeyed<T>;
}

/**
 * Возвращает массив значений `VersionedEnum` или его исторического среза,
 * сохраняя literal union как тип элемента. Безопаснее, чем
 * `Object.values(E) as TValue[]` — спред отсекает Symbol-ключ `forVersion`
 * на runtime, а тип возвращает union литералов вместо `string`.
 *
 * @example
 * const modes = versionedEnumValues(EFontWeight); // TFontWeight[]
 * for (const mode of versionedEnumValues(EDataModelOption)) { ... }
 */
export function versionedEnumValues<T extends Readonly<Record<string, string>>>(
  source: T
): TVersionedEnumValues<T>[] {
  return Object.values({ ...source }) as TVersionedEnumValues<T>[];
}
