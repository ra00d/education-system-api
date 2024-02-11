-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `end_at` TIME NOT NULL,
    `start_at` TIME NOT NULL,
    `course_id` INTEGER NULL,
    `teacher_id` INTEGER NULL,
    `level_id` INTEGER NULL,

    INDEX `fk_classes_course`(`course_id`),
    INDEX `fk_classes_level`(`level_id`),
    INDEX `fk_classes_teacher`(`teacher_id`),
    INDEX `room_id_idx`(`room_id`),
    FULLTEXT INDEX `classes_description_idx`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `cover_img` VARCHAR(191) NULL,
    `start_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_at` DATETIME(3) NOT NULL,
    `teacher_id` INTEGER NULL,
    `level_id` INTEGER NULL,

    INDEX `fk_courses_level`(`level_id`),
    INDEX `fk_courses_teacher`(`teacher_id`),
    FULLTEXT INDEX `courses_description_idx`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `levels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contents` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `course_id` INTEGER NULL,
    `exam_id` INTEGER NULL,

    INDEX `fk_questions_class`(`course_id`),
    INDEX `fk_questions_exam`(`exam_id`),
    FULLTEXT INDEX `questions_contents_idx`(`contents`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reqular_question_answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yes_or_no_answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `answer` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answers_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NULL,
    `num_value` INTEGER NULL,
    `question_id` INTEGER NOT NULL,

    INDEX `fk_answers_orders_question`(`question_id`),
    FULLTEXT INDEX `answers_orders_content_idx`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `multi_options_answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `correct` BOOLEAN NOT NULL DEFAULT false,
    `question_id` INTEGER NOT NULL,

    FULLTEXT INDEX `multi_options_answers_content_idx`(`content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_classes` (
    `student_user_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    INDEX `fk_student_classes_class`(`class_id`),
    PRIMARY KEY (`student_user_id`, `class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_courses` (
    `student_user_id` INTEGER NOT NULL,
    `course_id` INTEGER NULL,

    INDEX `fk_student_courses_course`(`course_id`),
    UNIQUE INDEX `student_courses_student_user_id_course_id_key`(`student_user_id`, `course_id`),
    PRIMARY KEY (`student_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level_id` INTEGER NULL,
    `grade` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,

    INDEX `fk_students_level`(`level_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `degree` VARCHAR(191) NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'STUDENT', 'TEACHER') NOT NULL DEFAULT 'STUDENT',

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NULL,
    `course_id` INTEGER NULL,

    INDEX `fk_exams_course`(`course_id`),
    INDEX `fk_exams_teacher`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cross_words` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `row_start` INTEGER NULL,
    `row_end` INTEGER NULL,
    `col_start` INTEGER NULL,
    `col_end` INTEGER NULL,
    `answer` VARCHAR(191) NULL,
    `clue` VARCHAR(191) NULL,
    `course_id` INTEGER NULL,

    INDEX `fk_cross_words_course`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_cross_words` (
    `student_user_id` INTEGER NOT NULL,
    `cross_word_id` INTEGER NOT NULL,

    INDEX `fk_student_cross_words_cross_word`(`cross_word_id`),
    PRIMARY KEY (`student_user_id`, `cross_word_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_exams` (
    `student_user_id` INTEGER NOT NULL,
    `exam_id` INTEGER NOT NULL,

    INDEX `fk_student_exams_exam`(`exam_id`),
    PRIMARY KEY (`student_user_id`, `exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_questions` (
    `student_user_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,

    INDEX `fk_student_questions_question`(`question_id`),
    PRIMARY KEY (`student_user_id`, `question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('PDF', 'DOCX', 'IMAGE', 'VIDEO', 'AUDIO') NOT NULL DEFAULT 'PDF',
    `file_path` VARCHAR(191) NOT NULL,
    `course_id` INTEGER NULL,
    `teacher_id` INTEGER NOT NULL,
    `assignmentsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dead_line` DATETIME(3) NOT NULL,
    `instructions` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_course` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_level` FOREIGN KEY (`level_id`) REFERENCES `levels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `fk_classes_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `fk_courses_level` FOREIGN KEY (`level_id`) REFERENCES `levels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `fk_courses_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `fk_questions_class` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `fk_questions_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reqular_question_answer` ADD CONSTRAINT `reqular_question_answer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yes_or_no_answer` ADD CONSTRAINT `yes_or_no_answer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers_orders` ADD CONSTRAINT `fk_answers_orders_question` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `multi_options_answers` ADD CONSTRAINT `multi_options_answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_classes` ADD CONSTRAINT `fk_student_classes_class` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_classes` ADD CONSTRAINT `fk_student_classes_student` FOREIGN KEY (`student_user_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_courses` ADD CONSTRAINT `fk_student_courses_course` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_courses` ADD CONSTRAINT `fk_student_courses_student` FOREIGN KEY (`student_user_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_level` FOREIGN KEY (`level_id`) REFERENCES `levels`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `fk_students_user` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `fk_teachers_user` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `fk_exams_course` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `exams` ADD CONSTRAINT `fk_exams_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cross_words` ADD CONSTRAINT `fk_cross_words_course` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_cross_words` ADD CONSTRAINT `fk_student_cross_words_cross_word` FOREIGN KEY (`cross_word_id`) REFERENCES `cross_words`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_cross_words` ADD CONSTRAINT `fk_student_cross_words_student` FOREIGN KEY (`student_user_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_exams` ADD CONSTRAINT `fk_student_exams_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_exams` ADD CONSTRAINT `fk_student_exams_student` FOREIGN KEY (`student_user_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_questions` ADD CONSTRAINT `fk_student_questions_question` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `student_questions` ADD CONSTRAINT `fk_student_questions_student` FOREIGN KEY (`student_user_id`) REFERENCES `students`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_assignmentsId_fkey` FOREIGN KEY (`assignmentsId`) REFERENCES `assignments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
