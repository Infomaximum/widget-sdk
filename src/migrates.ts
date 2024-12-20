import type { IBaseWidgetSettings } from "./settings/baseWidget";

export type TVersion = string;
export type TMigrationStruct = Record<string, any>;

export interface IWidgetStruct<Settings extends IBaseWidgetSettings = IBaseWidgetSettings> {
  key: string;
  apiVersion: string;
  type: string;
  settings: Settings;
  localApiVersion?: string;
}

export type TMigrateProcessor<T extends TMigrationStruct> = (struct: T) => void;

export interface ISettingsMigratorParams {
  versions: ReadonlyArray<TVersion>;
  defaultVersion?: TVersion;
}

export interface IWidgetMigrator<T extends TMigrationStruct = IWidgetStruct> {
  registerProcessor(
    version: TVersion,
    processor: TMigrateProcessor<T>,
    type?: string,
    versionPath?: string
  ): void;
}
