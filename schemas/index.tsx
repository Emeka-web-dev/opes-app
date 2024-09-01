import * as z from "zod";

export const SendMessageSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phone: z.string().min(9, { message: "Minimum of 9 characters" }),
  message: z.string().min(1, { message: "Message must not be empty" }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string().min(1, { message: "Must not be empty" })),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  referralLink: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is requred",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const InvitePeopleSchema = z.object({
  email: z.string().email(),
});

export const BankDetailSchema = z.object({
  bankName: z
    .object({
      name: z.string(),
      code: z.number(),
    })
    .nullable(),
  bankNumber: z.number().refine((val) => val.toString().length === 10, {
    message: "Bank number must be 10 digits",
  }),
});

export const OtpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
