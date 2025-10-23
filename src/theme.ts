import type { ZodType } from "zod";

// todo: заменить на готовый интерфейс [BI-15688]
interface ITheme {}

export const themeValueMetaKey = "themeValue";

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
) => scheme.meta({ [themeValueMetaKey]: selectThemeValue });
