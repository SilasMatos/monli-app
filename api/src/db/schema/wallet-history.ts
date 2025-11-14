import { pgTable, uuid, decimal, timestamp, varchar, text } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"
import { wallets } from "./wallets"

export const walletHistory = pgTable("wallet_history", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  walletId: uuid("wallet_id").notNull().references(() => wallets.id, { onDelete: "cascade" }),
  
  // Operation details
  operation: varchar("operation", { length: 50 }).notNull(), // 'add_balance', 'remove_balance', 'add_saved', 'remove_saved', 'transfer_to_saved', 'transfer_from_saved', 'toggle_visibility'
  
  // Amount details
  amount: decimal("amount", { precision: 15, scale: 2 }),
  
  // Balance snapshots after operation
  balanceAfter: decimal("balance_after", { precision: 15, scale: 2 }),
  savedBalanceAfter: decimal("saved_balance_after", { precision: 15, scale: 2 }),
  
  // Additional context
  description: text("description"),
  metadata: text("metadata"), // JSON string for additional data
  
  // Related transaction if applicable
  transactionId: uuid("transaction_id"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
