import { VersionedEnum, type TVersionedEnumValues } from "../versionedEnum";

/** Ключи мета-данных внутри схем настроек */
export const ESettingsSchemaMetaKey = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      /** Привязка значения из темы к настройке */
      themeValue: "themeValue",
      /** Тип сущности */
      entity: "entity",
    } as const,
  },
});

export type TSettingsSchemaMetaKey = TVersionedEnumValues<typeof ESettingsSchemaMetaKey>;
