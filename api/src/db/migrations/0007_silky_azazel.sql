CREATE TABLE "wallet_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"wallet_id" uuid NOT NULL,
	"operation" varchar(50) NOT NULL,
	"amount" numeric(15, 2),
	"balance_after" numeric(15, 2),
	"saved_balance_after" numeric(15, 2),
	"description" text,
	"metadata" text,
	"transaction_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wallet_history" ADD CONSTRAINT "wallet_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallet_history" ADD CONSTRAINT "wallet_history_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;