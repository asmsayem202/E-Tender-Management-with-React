import { forgotpassSchema, loginSchema, resetPassSchema } from "@/schema";
import { z } from "zod";

export type LOGIN = z.infer<typeof loginSchema>;

export type FORGOT_PASS = z.infer<typeof forgotpassSchema>;

export type RESET_PASS = z.infer<typeof resetPassSchema>;
