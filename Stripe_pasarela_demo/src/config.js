import { config } from "dotenv";
config();

export const PORT=4000;
export const SECRET_STRIPE=process.env.stripe_key;