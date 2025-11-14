import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"

export const accessLogs = pgTable("access_logs", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  loginMethod: varchar("login_method", { length: 50 }).notNull(), // "email", "google", etc
  isFirstLoginEver: varchar("is_first_login_ever", { length: 10 }),
  isFirstLoginToday: varchar("is_first_login_today", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
