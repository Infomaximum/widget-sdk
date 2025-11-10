import type { IBaseWidgetSettings } from "./settings/baseWidget";

export type TVersion = `${number}`;
export type TMigrationStruct = Record<string, any>;

export const apiVersions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10.1",
  "10.2",
  "10.3",
  "11",
  "12",
  "13",
  "13.1",
  "14",
  "15",
  "15.1",
  "15.2",
  "16",
  "16.1",
  "16.2",
  "17",
] as const satisfies ReadonlyArray<TVersion>;
export type TApiVersion = (typeof apiVersions)[number];

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
