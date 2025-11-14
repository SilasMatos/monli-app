import { pgTable, uuid, varchar, decimal, timestamp, text } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"
import { wallets } from "./wallets"

export const transactions = pgTable("transactions", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  walletId: uuid("wallet_id").notNull().references(() => wallets.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // "income", "expense", "transfer_to_saved", "transfer_from_saved"
  category: varchar("category", { length: 100 }), // Ex: "Salário", "Alimentação", "Transporte"
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  // Metadata
  tags: text("tags"), // JSON array de tags
  attachments: text("attachments"), // JSON array de URLs de anexos
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
