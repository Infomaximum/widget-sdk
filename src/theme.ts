import type { ZodType } from "zod";
import type { EColorMode, TColor } from "./color";
import type {
  EFontWeight,
  EHeightMode,
  IGradient,
  TTabsHorizontalAlignment,
} from "./settings/values";
import { ESettingsSchemaMetaKey } from "./settings/const";

export type TLimitedColor = Extract<TColor, { mode: EColorMode.AUTO } | { mode: EColorMode.BASE }>;

export type TWidgetsPaletteValue =
  | Extract<TColor, { mode: EColorMode.AUTO }>
  | { mode: EColorMode.BASE; values: string[] };

export type TGradientsSetValue =
  | Extract<TColor, { mode: EColorMode.AUTO }>
  | { mode: EColorMode.BASE; values: IGradient[] };

export interface ITheme {
  apiVersion: string;
  maxWidth?: number;
  dividersHeight: {
    mode: EHeightMode;
    value?: number;
  };
  backgroundColor: string;
  backgroundInEdit: boolean;
  spacing: boolean;
  widgets: {
    /** @remarks Заложено для будущего использования */
    color: string;
    cornerRadius: number | undefined;
    titleColor: TLimitedColor;
    titleSize: number;
    titleWeight: EFontWeight;
    textColor: TLimitedColor;
    textSize: number;
    axesColor: TLimitedColor;
    guideLinesColor: TLimitedColor;
    widgetsPalette: TWidgetsPaletteValue;
    gradientsSet: TGradientsSetValue;
    buttons: {
      primary: {
        color: TLimitedColor;
        textColor: TLimitedColor;
      };
      primaryOutlined: {
        borderColor: TLimitedColor;
        textColor: TLimitedColor;
      };
      link: {
        textColor: TLimitedColor;
      };
    };
    tables: {
      header: {
        color: TLimitedColor;
        textWeight: EFontWeight;
        textColor: TLimitedColor;
      };
      total: {
        color: TLimitedColor;
        textWeight: EFontWeight;
        textColor: TLimitedColor;
      };
    };
  };
  tabs: {
    textSize: number;
    activeTabColor: TLimitedColor;
    alignment: TTabsHorizontalAlignment;
    likeViewBackground: boolean;
  };
  hoverColor: TLimitedColor;
}

/**
 * Привязывает мета-информацию о теме к Zod-схеме
 *
 * @template Value - Тип значения схемы
 * @template Theme - Тип темы (по умолчанию ITheme)
 *
 * @param scheme - Zod схема для привязки
 * @param selectThemeValue - Функция, возвращающая значение из темы
 *
 * @returns Zod схему с мета-информацией о теме
 *
 * @example
 * // Базовое использование
 * textSize: themed(
 *   z.number().default(12),
 *   (theme) => theme.textSize
 * )
 */
export const themed = <Value, Theme = ITheme>(
  scheme: ZodType<Value>,
  selectThemeValue: (theme: Theme) => Value
) => scheme.meta({ [ESettingsSchemaMetaKey.themeValue]: selectThemeValue });
