import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;

export const teamDetailsSchema = z.object({
  teamName: z
    .string()
    .min(3, { message: "Team name must be at least 3 characters" }),
  captainName: z
    .string()
    .min(2, { message: "Captain name must be at least 2 characters" }),
  contactNumber: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" }),
  alternateNumber: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const playerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z
    .number()
    .min(16, { message: "Player must be at least 16 years old" })
    .max(45, { message: "Player must be under 45 years old" }),
  role: z.enum(["Batsman", "Bowler", "All-Rounder", "Wicket Keeper"], {
    required_error: "Please select a player role",
  }),
});

export const playersSchema = z.object({
  mainPlayers: z
    .array(playerSchema)
    .length(11, { message: "Exactly 11 main players are required" }),
  substitutes: z
    .array(playerSchema)
    .min(0)
    .max(6, { message: "Maximum 6 substitute players allowed" }),
});

export const paymentSchema = z.object({
  transactionId: z
    .string()
    .min(6, { message: "Please enter a valid transaction ID" }),
});
