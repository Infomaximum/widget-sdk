import type { TNullable } from "../utilityTypes";

export const compact = <T>(
  items: Array<T | null | undefined | false | "" | 0> | null | undefined
) => (items?.filter(Boolean) || []) as T[];

export const compactMap = <T, U>(
  items: T[],
  f: (item: T) => TNullable<U>
): U[] => compact(items?.map(f));

export const isNil = (value: any): value is null | undefined =>
  value === null || value === undefined;
