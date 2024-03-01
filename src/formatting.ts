import type { TNullable } from "./utilityTypes";

export enum EFormatTypes {
  /** Дата */
  DATE = "DATE",
  /** Число */
  NUMBER = "NUMBER",
  /** Месяц */
  MONTH = "MONTH",
  /** Дата и время */
  DATETIME = "DATETIME",
  /** Строка */
  STRING = "STRING",
  /** День недели */
  DAY_OF_WEEK = "DAY_OF_WEEK",
  /** Длительность */
  DURATION = "DURATION",
  /** Час */
  HOUR = "HOUR",
  /** Месяц и год */
  MONTH_YEAR = "MONTH_YEAR",
  /** Год */
  YEAR = "YEAR",
  /** Квартал */
  QUARTER = "QUARTER",
  /** Квартал и год */
  QUARTER_YEAR = "QUARTER_YEAR",
  /** День месяца */
  DAY_OF_MONTH = "DAY_OF_MONTH",
  /** Неделя */
  WEEK = "WEEK",
  /** Логический */
  BOOLEAN = "BOOLEAN",
}

export enum EFormattingPresets {
  //Общая группа шаблонов
  "AUTO" = "AUTO",
  "TUNE" = "TUNE",
  //Группа шаблонов для формата DATE
  "DD/M/YYYY" = "DD/M/YYYY",
  "YYYY-MM-DD" = "YYYY-MM-DD",
  "DD MM YYYY" = "DD MM YYYY",
  "DD MMM YYYY" = "DD MMM YYYY",
  "MM.DD.YYYY" = "MM.DD.YYYY",
  "DD MMMM YYYY" = "DD MMMM YYYY",
  "DD/MM/YYYY" = "DD/MM/YYYY",
  "MMMM DD, YYYY" = "MMMM DD, YYYY",
  "DD.MM.YYYY" = "DD.MM.YYYY",
  "MM.DD.YYYY hh:mm a" = "MM.DD.YYYY hh:mm a",
  //Группа шаблонов для формата DATETIME
  "DD/M/YYYY HH:mm" = "DD/M/YYYY HH:mm",
  "YYYY-MM-DD HH:mm" = "YYYY-MM-DD HH:mm",
  "YYYY-MM-DD HH:mm:ss" = "YYYY-MM-DD HH:mm:ss",
  "DD MM YYYY HH:mm" = "DD MM YYYY HH:mm",
  "DD MMM YYYY, HH:mm" = "DD MMM YYYY, HH:mm",
  "DD MMMM YYYY, HH:mm" = "DD MMMM YYYY, HH:mm",
  "DD.MM.YYYY, HH:mm:ss" = "DD.MM.YYYY, HH:mm:ss",
  "DD.MM.YYYY HH:mm:ss" = "DD.MM.YYYY HH:mm:ss",
  "DD/MM/YYYY HH:mm:ss" = "DD/MM/YYYY HH:mm:ss",
  //Группа шаблонов для формата DAY_OF_WEEK
  "DD" = "DD",
  "D" = "D",
  "DDDD" = "DDDD",
  //Группа шаблонов для формата MONTH
  "MMM" = "MMM",
  "MM" = "MM",
  "MMMM" = "MMMM",
  //Группа шаблонов для формата NUMBER
  "k" = "k",
  "#,##x" = "#,##x",
  "#,##x.x" = "#,##x.x",
  "#,##x.xx" = "#,##x.xx",
  "x[%]" = "x[%]",
  "x.x[%]" = "x.x[%]",
  "[$]x" = "[$]x",
  "zx.xx[%]" = "zx.xx[%]",
  //Группа шаблонов для преобразования DURATION
  "hh:mm:ss" = "hh:mm:ss",
  "dd:hh:mm:ss" = "dd:hh:mm:ss",
  "d" = "d",
  "h" = "h",
  "dk" = "dk",
  "hk" = "hk",
  "dd" = "dd",
  //Группа шаблонов для преобразования Час
  "HH" = "HH",
  "hh a" = "hh a",
  //Группа шаблонов для преобразования Month_Year
  "MMM, YYYY" = "MMM, YYYY",
  "MM.YYYY" = "MM.YYYY",
  "MMMM YYYY" = "MMMM YYYY",
  //Группа шаблонов для преобразования Quarter
  "[Q]q" = "[Q]q",
  "R" = "R",
  //Группа шаблонов для преобразования Quarter_Year
  "[Q]q[-]YYYY" = "[Q]q[-]YYYY",
  "R[-]YYYY" = "R[-]YYYY",
}

export interface IWidgetFormatting {
  getFormattedValue: (
    value: string,
    formatType: EFormatTypes,
    formatTemplate: TNullable<string>
  ) => string;
}
