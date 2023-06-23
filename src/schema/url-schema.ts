import { z } from "zod";

export const urlInputSchema = z.object({
  url: z.string().max(2048).url({ message: "Invalid url" }),
  customUrl: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]{4,12}$/,
      "Length must be 4-12 characters (letters, numbers, - or _)"
    )
    .optional(),
});
