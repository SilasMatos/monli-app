CREATE TABLE "credit_cards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"last_four_digits" varchar(4) NOT NULL,
	"brand" varchar(50) NOT NULL,
	"credit_limit" numeric(15, 2) NOT NULL,
	"current_balance" numeric(15, 2) DEFAULT '0.00' NOT NULL,
	"closing_day" integer NOT NULL,
	"due_day" integer NOT NULL,
	"color" varchar(7) DEFAULT '#6366f1',
	"icon" varchar(50) DEFAULT 'credit_card',
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budgets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"amount" numeric(15, 2) NOT NULL,
	"spent" numeric(15, 2) DEFAULT '0.00' NOT NULL,
	"tags" text[],
	"category" varchar(100),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"alert_percentage" numeric(5, 2) DEFAULT '80.00',
	"alert_enabled" boolean DEFAULT true NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;