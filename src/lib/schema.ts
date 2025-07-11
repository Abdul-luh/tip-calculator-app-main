// lib/schema.ts
import { z } from "zod";

export const tipSchema = z.object({
  bill: z
    .number({ invalid_type_error: "Enter a valid bill amount" })
    .min(0.5, "Bill must be at least $0.50"),
  tip: z
    .number({ invalid_type_error: "Enter a valid tip percentage" })
    .min(1, "Tip must be at least 1%"),
  people: z
    .number({ invalid_type_error: "Enter a valid number of people" })
    .min(1, "At least 1 person is required"),
});

export type TipFormData = z.infer<typeof tipSchema>;
