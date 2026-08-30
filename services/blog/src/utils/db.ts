import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DB_URL ||
  process.env.DATABASE_URL ||
  "postgresql://user:password@ep-dummy-123456.us-east-2.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(connectionString);
