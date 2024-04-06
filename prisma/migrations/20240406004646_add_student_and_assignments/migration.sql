/*
  Warnings:

  - Added the required column `mark` to the `attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `mark` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `student_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `assignment_id` INTEGER NOT NULL,
    `assignmentsId` INTEGER NULL,
    `mark` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student_assignments` ADD CONSTRAINT `fk_student_assignments_student` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_assignments` ADD CONSTRAINT `student_assignments_assignmentsId_fkey` FOREIGN KEY (`assignmentsId`) REFERENCES `assignments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
