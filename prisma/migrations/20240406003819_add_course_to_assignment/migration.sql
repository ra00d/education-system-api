/*
  Warnings:

  - You are about to drop the column `assignmentsId` on the `materials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `materials` DROP FOREIGN KEY `materials_assignmentsId_fkey`;

-- AlterTable
ALTER TABLE `assignments` ADD COLUMN `courses_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `materials` DROP COLUMN `assignmentsId`,
    ADD COLUMN `assignments_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_assignments_id_fkey` FOREIGN KEY (`assignments_id`) REFERENCES `assignments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `assignments_courses_id_fkey` FOREIGN KEY (`courses_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
