import { EDisplayConditionMode, type TZod } from "..";

export const RangeSchema = (z: TZod) =>
  z.object({
    unit: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  });

export const DisplayConditionSchema = (z: TZod) =>
  z.discriminatedUnion("mode", [
    z.object({
      mode: z.literal(EDisplayConditionMode.DISABLED),
    }),
    z.object({
      mode: z.literal(EDisplayConditionMode.FORMULA),
      formula: z.string().nullish(),
    }),
    z.object({
      mode: z.literal(EDisplayConditionMode.VARIABLE),
      variableName: z.string().nullish(),
      variableValue: z.string().nullish(),
    }),
  ]);
