import { z } from "zod";

export const urlInputSchema = z.object({
  url: z.string().max(2048).url({ message: "Invalid url" }),
  customUrl: z.string().min(4, "Custom URL must be between 4 en 12 characters").max(12, "Custom URL must be between 4 en 12 characters").optional(),
});