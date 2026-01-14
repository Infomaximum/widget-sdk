import type { IBaseWidgetSettings } from "./settings/baseWidget";

export type TVersion = `${number}`;
export type TMigrationStruct = Record<string, any>;

/** Массив версий в строгом порядке, по которому последовательно выполняется миграция */
export const apiVersions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7", // Версии от 7 и старше пока не удаляем [BI-15416]
  "8",
  "9",
  "10",
  "10.1",
  "10.2",
  "10.3", // 241223
  "11",
  "12",
  "13", // 2503
  "13.1", // 250314
  "14",
  "15", // Для версии системы 2505
  "15.1", // Для версии системы 250609
  "15.2", // Для версии системы 250614
  "16", // Для версии системы 2507
  "16.1", // Для версии системы 250703
  "16.2", // Для версии системы 250709
  "17", // 2508
] as const satisfies ReadonlyArray<TVersion>;
export type TApiVersion = (typeof apiVersions)[number];

/**
 * Актуальная версия settings, с которой работает система.
 * Используется единая версия для settings виджетов и показателей.
 */
export const apiVersion = apiVersions.at(-1)!;

export interface IWidgetStruct<Settings extends IBaseWidgetSettings = IBaseWidgetSettings> {
  key: string;
  apiVersion: TApiVersion;
  type: string;
  settings: Settings;
  localApiVersion?: TVersion;
}

export type TMigrateProcessor<T extends TMigrationStruct> = (struct: T) => void;

export interface IMigrateContext {
  apiVersion: TApiVersion;
  localApiVersion?: TVersion;
  type?: string;
}

export interface IWidgetMigrator<T extends TMigrationStruct = IWidgetStruct> {
  registerProcessor(context: IMigrateContext, processor: TMigrateProcessor<T>): void;
}
