CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"phone" varchar(20),
	"avatar" text,
	"bio" text,
	"address" varchar(255),
	"city" varchar(100),
	"state" varchar(100),
	"country" varchar(100) DEFAULT 'Brazil',
	"zip_code" varchar(20),
	"language" varchar(10) DEFAULT 'pt-BR',
	"theme" varchar(50) DEFAULT 'light',
	"currency" varchar(3) DEFAULT 'BRL',
	"timezone" varchar(50) DEFAULT 'America/Sao_Paulo',
	"plan_type" varchar(50) DEFAULT 'free' NOT NULL,
	"subscription_status" varchar(50) DEFAULT 'active',
	"subscription_start_date" timestamp,
	"subscription_end_date" timestamp,
	"notifications_enabled" boolean DEFAULT true NOT NULL,
	"email_notifications" boolean DEFAULT true,
	"push_notifications" boolean DEFAULT true,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;