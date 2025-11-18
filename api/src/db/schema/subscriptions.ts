import { pgTable, uuid, text, timestamp, decimal, integer, boolean } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'
import { users } from './users'
import { subscriptionCompanies } from './subscription-companies'

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id')
    .$defaultFn(() => uuidv7())
    .primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id').references(() => subscriptionCompanies.id, {
    onDelete: 'set null'
  }),
  customName: text('custom_name'), // Para assinaturas personalizadas
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('BRL'),
  billingCycle: text('billing_cycle').notNull(), // 'monthly', 'quarterly', 'semiannual', 'annual'
  startDate: timestamp('start_date').notNull(),
  nextBillingDate: timestamp('next_billing_date').notNull(),
  endDate: timestamp('end_date'), // null se não tiver data de término
  status: text('status').notNull().default('active'), // 'active', 'paused', 'cancelled', 'expired'
  paymentMethod: text('payment_method'), // 'credit_card', 'debit_card', 'bank_slip', 'pix'
  notes: text('notes'),
  notifyDaysBefore: integer('notify_days_before').default(3), // Notificar X dias antes do vencimento
  autoRenew: boolean('auto_renew').notNull().default(true),
  category: text('category'), // Categoria personalizada se companyId for null
  color: text('color'), // Cor para identificação visual
  icon: text('icon'), // Ícone para identificação visual
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert
