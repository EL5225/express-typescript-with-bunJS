import { z } from "zod";

export const VSUpdateProfiles = z.object({
  phone_number: z
    .string({ invalid_type_error: "phone_number must be a string" })
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(13, { message: "Phone number must be at most 13 characters long" })
    .optional(),
  birth_date: z.string().optional(),

  birth_place: z
    .string()
    .min(4, { message: "birth_place must be at least 4 characters long" })
    .optional(),
});
