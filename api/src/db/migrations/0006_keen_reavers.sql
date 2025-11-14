ALTER TABLE "accounts" RENAME TO "wallets";--> statement-breakpoint
ALTER TABLE "wallets" DROP CONSTRAINT "accounts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_related_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_related_transaction_id_transactions_id_fk";
--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "saved_balance" numeric(15, 2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE "wallets" ADD COLUMN "show_balance" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "wallet_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "initial_balance";--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "currency";--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "color";--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "icon";--> statement-breakpoint
ALTER TABLE "wallets" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "account_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "related_account_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "related_transaction_id";--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_unique" UNIQUE("user_id");