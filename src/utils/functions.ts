import type { TNullable } from "../utilityTypes";

export const compact = <T>(
  items: Array<T | null | undefined | false | "" | 0> | null | undefined
) => (items?.filter(Boolean) || []) as T[];

export const compactMap = <T, U>(items: T[], f: (item: T) => TNullable<U>): U[] =>
  compact(items?.map(f));

export const isNil = (value: any): value is null | undefined =>
  value === null || value === undefined;

export const first = <T>(arr: T[]): T | undefined => arr.at(0);

export const identity = <T>(value: T): T => value;

export function omit<T extends Record<keyof any, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const newObj = { ...obj };

  for (const key of keys) delete newObj[key];

  return newObj as Omit<T, K>;
}

export function memoize<T extends string | number | null | undefined, R>(
  fn: (arg: T) => R
): (arg: T) => R {
  const cache = new Map<T, R>();

  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result = fn(arg);
    cache.set(arg, result);

    return result;
  };
}
