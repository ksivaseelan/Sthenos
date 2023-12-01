CREATE TABLE IF NOT EXISTS "profile" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"height" varchar(15),
	"weight" varchar(15),
	"age" varchar(15),
	"sex" varchar(15),
	"fitness_level" varchar(15),
	"fitness_goal" varchar(15)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
