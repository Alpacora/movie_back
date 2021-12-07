/*
  Warnings:

  - Added the required column `verified_email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "profile_img" TEXT,
    "verified_email" BOOLEAN NOT NULL
);
INSERT INTO "new_users" ("email", "first_name", "id", "last_name", "password", "profile_img", "user_name") SELECT "email", "first_name", "id", "last_name", "password", "profile_img", "user_name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
