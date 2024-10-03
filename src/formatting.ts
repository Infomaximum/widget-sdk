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
  "CUSTOM" = "CUSTOM",
  //Группа шаблонов для формата DATE
  "DD/M/YYYY" = "DD/M/YYYY",
  "DD-MM-YYYY" = "DD-MM-YYYY",
  "DD-MM-YY" = "DD-MM-YY",
  "YYYY-MM-DD" = "YYYY-MM-DD",
  "YY-MM-DD" = "YY-MM-DD",
  "DD MM YYYY" = "DD MM YYYY",
  "DD MMM YYYY" = "DD MMM YYYY",
  "DD MMM YY" = "DD MMM YY",
  "MM.DD.YYYY" = "MM.DD.YYYY",
  "MM.DD.YY" = "MM.DD.YY",
  "DD MMMM YYYY" = "DD MMMM YYYY",
  "DD MMMM YY" = "DD MMMM YY",
  "DD/MM/YYYY" = "DD/MM/YYYY",
  "DD/MM/YY" = "DD/MM/YY",
  "MM/DD/YYYY" = "MM/DD/YYYY",
  "MM/DD/YY" = "MM/DD/YY",
  "MMMM DD, YYYY" = "MMMM DD, YYYY",
  "MMMM DD, YY" = "MMMM DD, YY",
  "DD.MM.YYYY" = "DD.MM.YYYY",
  "DD.MM.YY" = "DD.MM.YY",
  "MM-DD-YY" = "MM-DD-YY",
  "MM-DD-YYYY" = "MM-DD-YYYY",
  //Группа шаблонов для формата DATETIME
  "DD/M/YYYY HH:mm" = "DD/M/YYYY HH:mm",
  "DD/MM/YYYY, HH:mm" = "DD/MM/YYYY, HH:mm",
  "DD/MM/YY, HH:mm" = "DD/MM/YY, HH:mm",
  "MM/DD/YY, hh:mm a" = "MM/DD/YY, hh:mm a",
  "MM/DD/YYYY, hh:mm a" = "MM/DD/YYYY, hh:mm a",
  "YYYY-MM-DD HH:mm" = "YYYY-MM-DD HH:mm",
  "YY-MM-DD, HH:mm" = "YY-MM-DD, HH:mm",
  "YYYY-MM-DD, HH:mm" = "YYYY-MM-DD, HH:mm",
  "YYYY-MM-DD HH:mm:ss" = "YYYY-MM-DD HH:mm:ss",
  "DD MM YYYY HH:mm" = "DD MM YYYY HH:mm",
  "DD MMMM YYYY, HH:mm" = "DD MMMM YYYY, HH:mm",
  "DD.MM.YY, HH:mm" = "DD.MM.YY, HH:mm",
  "DD.MM.YYYY, HH:mm" = "DD.MM.YYYY, HH:mm",
  "MM-DD-YY, hh:mm a" = "MM-DD-YY, hh:mm a",
  "MM-DD-YYYY, hh:mm a" = "MM-DD-YYYY, hh:mm a",
  "MM.DD.YY, hh:mm a" = "MM.DD.YY, hh:mm a",
  "MM.DD.YYYY, hh:mm a" = "MM.DD.YYYY, hh:mm a",
  "MM.DD.YYYY hh:mm a" = "MM.DD.YYYY hh:mm a",
  "DD MMM YY, HH:mm" = "DD MMM YY, HH:mm",
  "DD MMM YYYY, HH:mm" = "DD MMM YYYY, HH:mm",
  "MMMM DD, YY, HH:mm" = "MMMM DD, YY, HH:mm",
  "MMMM DD, YYYY, HH:mm" = "MMMM DD, YYYY, HH:mm",
  "DD MMMM YY, HH:mm" = "DD MMMM YY, HH:mm",
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
  "MMM, YY" = "MMM, YY",
  "MM.YYYY" = "MM.YYYY",
  "MM.YY" = "MM.YY",
  "MMMM YYYY" = "MMMM YYYY",
  "MMMM YY" = "MMMM YY",
  //Группа шаблонов для преобразования Quarter
  "[Q]q" = "[Q]q",
  "R" = "R",
  //Группа шаблонов для преобразования Quarter_Year
  "[Q]q[-]YYYY" = "[Q]q[-]YYYY",
  "[Q]q[-]YY" = "[Q]q[-]YY",
  "R[-]YYYY" = "R[-]YYYY",
  "R[-]YY" = "R[-]YY",
}

export interface IWidgetFormatting {
  getFormattedValue: (
    value: string,
    formatType: EFormatTypes,
    formatting: EFormattingPresets,
    formatTemplate: TNullable<string>
  ) => string;
}
