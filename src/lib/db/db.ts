import {sql} from "@vercel/postgres";
import {drizzle} from "drizzle-orm/vercel-postgres"

export const conn = drizzle(sql);

