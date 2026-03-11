/*
  Warnings:

  - Made the column `salary` on table `Month` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Month" ALTER COLUMN "salary" SET NOT NULL;
