import { z } from "zod";

export const VSEmployees = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  province: z.string({ required_error: "Province is required" }),
  city: z.string({ required_error: "City is required" }),
  position: z.string({ required_error: "Position is required" }),
  religion: z.string({ required_error: "Religion is required" }),
  image: z.string().optional(),
});
