export type TNullable<T> = T | null | undefined;

export type valueof<T> = T[keyof T];

export type StringKeyOf<T> = Exclude<keyof T, number | symbol>;
