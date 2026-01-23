import { z } from "zod";

export const tokenFormSchema = z.object({
  // Step 1: Token Details
  name: z
    .string()
    .min(1, "Name is required")
    .max(32, "Name must be 32 characters or less")
    .trim(),
  symbol: z
    .string()
    .min(1, "Symbol is required")
    .max(10, "Symbol must be 10 characters or less")
    .toUpperCase()
    .trim(),
  decimals: z
    .number()
    .min(0, "Decimals must be 0 or greater")
    .max(9, "Decimals must be 9 or less"),
  supply: z
    .string()
    .min(1, "Supply is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Supply must be a positive number"),

  // Step 2: Metadata
  description: z.string().max(500, "Description must be 500 characters or less").optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  externalUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  // Step 3: Plan
  plan: z.enum(["basic", "advanced"]),
});

export type TokenFormData = z.infer<typeof tokenFormSchema>;

export const defaultTokenFormValues: TokenFormData = {
  name: "",
  symbol: "",
  decimals: 9,
  supply: "",
  description: "",
  imageUrl: "",
  externalUrl: "",
  plan: "basic",
};
