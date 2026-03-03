/*
  Warnings:

  - You are about to drop the column `userId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `snapshotId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the `MonthlyCategorySnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalaryHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `monthId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_snapshotId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyCategorySnapshot" DROP CONSTRAINT "MonthlyCategorySnapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "SalaryHistory" DROP CONSTRAINT "SalaryHistory_userId_fkey";

-- DropIndex
DROP INDEX "Category_userId_idx";

-- DropIndex
DROP INDEX "Expense_snapshotId_idx";

-- DropIndex
DROP INDEX "Expense_userId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "userId",
ADD COLUMN     "monthId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "snapshotId",
DROP COLUMN "userId",
ADD COLUMN     "monthId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MonthlyCategorySnapshot";

-- DropTable
DROP TABLE "SalaryHistory";

-- CreateTable
CREATE TABLE "Month" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "salary" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Month_userId_idx" ON "Month"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Month_userId_month_year_key" ON "Month"("userId", "month", "year");

-- CreateIndex
CREATE INDEX "Category_monthId_idx" ON "Category"("monthId");

-- CreateIndex
CREATE INDEX "Expense_monthId_idx" ON "Expense"("monthId");

-- AddForeignKey
ALTER TABLE "Month" ADD CONSTRAINT "Month_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
