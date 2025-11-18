import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const subscriptionCompanies = pgTable('subscription_companies', {
  id: uuid('id')
    .$defaultFn(() => uuidv7())
    .primaryKey(),
  name: text('name').notNull().unique(),
  category: text('category').notNull(), // 'streaming', 'music', 'cloud', 'software', 'gaming', 'other'
  logo: text('logo'), // URL do logo
  website: text('website'),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type SubscriptionCompany = typeof subscriptionCompanies.$inferSelect
export type NewSubscriptionCompany = typeof subscriptionCompanies.$inferInsert
