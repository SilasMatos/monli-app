import { pgTable, uuid, varchar, decimal, timestamp, boolean, text } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"

export const budgets = pgTable("budgets", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(), // Valor do orçamento
  spent: decimal("spent", { precision: 15, scale: 2 }).notNull().default("0.00"), // Valor gasto
  
  // Filtros para rastrear gastos
  tags: text("tags").array(), // Tags para filtrar transações (ex: ["alimentação", "restaurante"])
  category: varchar("category", { length: 100 }), // Categoria específica (opcional)
  
  // Período do orçamento
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  
  // Alertas
  alertPercentage: decimal("alert_percentage", { precision: 5, scale: 2 }).default("80.00"), // Alerta ao atingir % do orçamento
  alertEnabled: boolean("alert_enabled").default(true).notNull(),
  
  isActive: boolean("is_active").default(true).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
