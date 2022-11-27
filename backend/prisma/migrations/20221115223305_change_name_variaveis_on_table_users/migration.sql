/*
  Warnings:

  - You are about to drop the column `accountId` on the `users` table. All the data in the column will be lost.
  - Added the required column `id_account` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_accountId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accountId",
ADD COLUMN     "id_account" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
