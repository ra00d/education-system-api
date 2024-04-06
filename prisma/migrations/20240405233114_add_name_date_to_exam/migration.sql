/*
  Warnings:

  - Added the required column `date` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Made the column `course_id` on table `exams` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `exams` DROP FOREIGN KEY `fk_exams_course`;

-- AlterTable
ALTER TABLE `exams` ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `course_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `fk_exams_course` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
