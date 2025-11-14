import { pgTable, uuid, decimal, timestamp, boolean } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"

export const wallets = pgTable("wallets", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  
  balance: decimal("balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
  
  savedBalance: decimal("saved_balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
  
  showBalance: boolean("show_balance").default(true).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
