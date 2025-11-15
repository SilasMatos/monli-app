import { pgTable, uuid, varchar, decimal, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"

export const creditCards = pgTable("credit_cards", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  name: varchar("name", { length: 100 }).notNull(),
  lastFourDigits: varchar("last_four_digits", { length: 4 }).notNull(),
  brand: varchar("brand", { length: 50 }).notNull(), // Visa, Mastercard, Amex, etc.
  
  creditLimit: decimal("credit_limit", { precision: 15, scale: 2 }).notNull(),
  currentBalance: decimal("current_balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
  
  closingDay: integer("closing_day").notNull(), // Dia do fechamento da fatura (1-31)
  dueDay: integer("due_day").notNull(), // Dia do vencimento da fatura (1-31)
  
  color: varchar("color", { length: 7 }).default("#6366f1"), // Hex color
  icon: varchar("icon", { length: 50 }).default("credit_card"),
  
  isActive: boolean("is_active").default(true).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
