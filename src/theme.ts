import type { ZodType } from "zod";
import type {
  TFontWeight,
  THeightMode,
  IGradient,
  TTabsHorizontalAlignment,
} from "./settings/values";
import { ESettingsSchemaMetaKey } from "./settings/const";
import type { EColorMode, TColor } from "./color";

export type TLimitedColor =
  | Extract<TColor, { mode: typeof EColorMode.AUTO }>
  | Extract<TColor, { mode: typeof EColorMode.BASE }>;

export type TWidgetsPaletteValue =
  | Extract<TColor, { mode: typeof EColorMode.AUTO }>
  | { mode: typeof EColorMode.BASE; values: string[] };

export type TGradientsSetValue =
  | Extract<TColor, { mode: typeof EColorMode.AUTO }>
  | { mode: typeof EColorMode.BASE; values: IGradient[] };

export interface ITheme {
  apiVersion: string;
  maxWidth?: number;
  dividersHeight: {
    mode: THeightMode;
    value?: number;
  };
  backgroundColor: string;
  widgets: {
    /** @remarks Заложено для будущего использования */
    color: string;
    cornerRadius: number | undefined;
    titleColor: TLimitedColor;
    titleSize: number;
    titleWeight: TFontWeight;
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
        textWeight: TFontWeight;
        textColor: TLimitedColor;
      };
      total: {
        color: TLimitedColor;
        textWeight: TFontWeight;
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
