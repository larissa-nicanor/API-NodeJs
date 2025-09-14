CREATE TYPE "public"."user_role" AS ENUM('student', 'manager');
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'student' NOT NULL;