import type { ZodType, z as zod } from "zod";

export interface ISchemaFactory<T extends ZodType = ZodType> {
  (z: TZod, ...args: any[]): T;
}

export type TZod = typeof zod;
export type TSchemaType<T extends ISchemaFactory> = zod.infer<ReturnType<T>>;
