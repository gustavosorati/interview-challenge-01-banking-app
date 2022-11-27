/*
  Warnings:

  - You are about to drop the column `createdAt` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `creditedAccountId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `debitedAccountId` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_account]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_credited_account` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_debited_account` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_creditedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_debitedAccountId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "createdAt",
DROP COLUMN "creditedAccountId",
DROP COLUMN "debitedAccountId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_credited_account" TEXT NOT NULL,
ADD COLUMN     "id_debited_account" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_id_account_key" ON "users"("id_account");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_debited_account_fkey" FOREIGN KEY ("id_debited_account") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_credited_account_fkey" FOREIGN KEY ("id_credited_account") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
