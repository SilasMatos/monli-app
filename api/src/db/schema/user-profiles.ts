import { pgTable, uuid, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import { users } from "./users"

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").$defaultFn(() => uuidv7()).primaryKey(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  
  // Personal Information
  phone: varchar("phone", { length: 20 }),
  avatar: text("avatar"), // URL or base64 do avatar
  bio: text("bio"), // Biografia do usuário
  
  // Address Information
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }).default("Brazil"),
  zipCode: varchar("zip_code", { length: 20 }),
  
  // Preferences
  language: varchar("language", { length: 10 }).default("pt-BR"),
  theme: varchar("theme", { length: 50 }).default("light"), // 'light', 'dark', 'auto'
  currency: varchar("currency", { length: 3 }).default("BRL"),
  timezone: varchar("timezone", { length: 50 }).default("America/Sao_Paulo"),
  
  // Subscription & Plan
  planType: varchar("plan_type", { length: 50 }).default("free").notNull(), // 'free', 'premium', 'business'
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default("active"), // 'active', 'expired', 'cancelled', 'trial'
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  
  // Notifications
  notificationsEnabled: boolean("notifications_enabled").default(true).notNull(),
  emailNotifications: boolean("email_notifications").default(true),
  pushNotifications: boolean("push_notifications").default(true),
  
  // Status
  isActive: boolean("is_active").default(true).notNull(),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
