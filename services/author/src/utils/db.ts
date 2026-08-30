import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

let rawUrl = process.env.DB_URL || process.env.DATABASE_URL || "";
if (!rawUrl.startsWith("postgres://") && !rawUrl.startsWith("postgresql://")) {
  rawUrl = "postgresql://user:password@ep-dummy-123456.us-east-2.aws.neon.tech/neondb?sslmode=require";
}

export const sql = neon(rawUrl);
