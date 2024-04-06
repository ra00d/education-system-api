/*
  Warnings:

  - You are about to drop the column `mark` on the `attendance` table. All the data in the column will be lost.
  - Added the required column `mark` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignments` ADD COLUMN `mark` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `attendance` DROP COLUMN `mark`;
