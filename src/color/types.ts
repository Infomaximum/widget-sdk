import type { TSchemaType } from "..";
import type {
  ColorBaseSchema,
  ColoredValueSchema,
  ColorRuleSchema,
  ColorSchema,
} from "./color.schema";
import { VersionedEnum, type TVersionedEnumValues } from "../versionedEnum";

export const EColorMode = VersionedEnum.build({
  latestVersion: "17",
  history: {
    "17": {
      /** Окрашивание отключено */
      DISABLED: "DISABLED",
      /** Цвет каждого значения вычисляется по формуле */
      FORMULA: "FORMULA",
      /** Один цвет для всех значений */
      BASE: "BASE",
      /** Окрашивание каждого значения по градиенту относительно минимального и максимального значений */
      GRADIENT: "GRADIENT",
      /** Использовать автоматический цвет: по умолчанию определяется порядковым номером показателя */
      AUTO: "AUTO",
      /** Использовать цвет из правила отображения (в правиле отображения рекурсивно определен цвет) */
      RULE: "RULE",
      /** Задать цвет конкретным значениям разреза */
      VALUES: "VALUES",
      /** Задать цвет конкретным значениям общего разреза. Режим используется только для настроек правила отображения */
      BY_DIMENSION: "BY_DIMENSION",
      /** Окрашивание по числовым диапазонам меры: colors[n] + limits[n-1] */
      RANGES: "RANGES",
    } as const,
  },
});

export type TColorMode = TVersionedEnumValues<typeof EColorMode>;

export type TColorBase = TSchemaType<typeof ColorBaseSchema>;
export type TColorRule = TSchemaType<typeof ColorRuleSchema>;
export type TColor = TSchemaType<typeof ColorSchema>;
export type TRGBTuple = [number, number, number];
export type THSLTuple = TRGBTuple;

export interface IColoredValue extends TSchemaType<typeof ColoredValueSchema> {}
