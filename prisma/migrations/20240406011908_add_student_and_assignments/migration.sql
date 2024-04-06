-- DropForeignKey
ALTER TABLE `materials` DROP FOREIGN KEY `materials_teacher_id_fkey`;

-- AlterTable
ALTER TABLE `materials` MODIFY `teacher_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
