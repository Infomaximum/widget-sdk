import { EFormatTypes } from "@infomaximum/bi-formatting";
import { ESimpleDataType } from "./data";
import type { IWidgetColumnIndicator } from "./indicators";

export interface IWidgetFormatting {
  getFormattedValue: (
    value: string,
    formatType: EFormatTypes,
    formatting: IWidgetColumnIndicator["formatting"]
  ) => string;
}

export const availableFormatsBySimpleType = {
  [ESimpleDataType.OTHER]: [EFormatTypes.STRING],
  [ESimpleDataType.STRING]: [EFormatTypes.STRING],
  [ESimpleDataType.FLOAT]: [EFormatTypes.NUMBER, EFormatTypes.DURATION, EFormatTypes.PERCENT],
  [ESimpleDataType.INTEGER]: [
    EFormatTypes.NUMBER,
    EFormatTypes.DURATION,
    EFormatTypes.QUARTER_YEAR,
    EFormatTypes.MONTH_YEAR,
    EFormatTypes.MONTH,
    EFormatTypes.DAY_OF_WEEK,
    EFormatTypes.PERCENT,
  ],
  [ESimpleDataType.DATE]: [EFormatTypes.DATE],
  [ESimpleDataType.DATETIME]: [EFormatTypes.DATETIME],
  [ESimpleDataType.DATETIME64]: [EFormatTypes.DATETIME],
  [ESimpleDataType.BOOLEAN]: [EFormatTypes.BOOLEAN],
};
