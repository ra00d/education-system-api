/*
  Warnings:

  - You are about to drop the `_roleTouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleRole_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_roleTouser_B_index";

-- DropIndex
DROP INDEX "_roleTouser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_roleTouser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conected" BOOLEAN NOT NULL DEFAULT false,
    "levelId" INTEGER NOT NULL,
    CONSTRAINT "student_id_fkey" FOREIGN KEY ("id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "levelId" INTEGER,
    "teacherId" INTEGER,
    CONSTRAINT "activity_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "activity_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "homework" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "levelId" INTEGER,
    "teacherId" INTEGER,
    CONSTRAINT "homework_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "homework_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "levelId" INTEGER,
    "studentId" INTEGER,
    "teacherId" INTEGER,
    CONSTRAINT "exam_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "exam_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "exam_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "activitieOnStudents" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finish_at" DATETIME,
    "score" REAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    PRIMARY KEY ("studentId", "activityId"),
    CONSTRAINT "activitieOnStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "activitieOnStudents_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "homeworksOnStudents" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finish_at" DATETIME,
    "score" REAL NOT NULL,
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "homeworkId" INTEGER NOT NULL,
    CONSTRAINT "homeworksOnStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "homeworksOnStudents_homeworkId_fkey" FOREIGN KEY ("homeworkId") REFERENCES "homework" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "examsOnStudents" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taken_at" DATETIME NOT NULL,
    "score" REAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,

    PRIMARY KEY ("examId", "studentId"),
    CONSTRAINT "examsOnStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "examsOnStudents_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_levelToteacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_levelToteacher_A_fkey" FOREIGN KEY ("A") REFERENCES "level" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_levelToteacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_activityTostudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_activityTostudent_A_fkey" FOREIGN KEY ("A") REFERENCES "activity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_activityTostudent_B_fkey" FOREIGN KEY ("B") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_homeworkTostudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_homeworkTostudent_A_fkey" FOREIGN KEY ("A") REFERENCES "homework" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_homeworkTostudent_B_fkey" FOREIGN KEY ("B") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "last_login" DATETIME,
    "is_active" BOOLEAN DEFAULT true,
    "roleRole_id" INTEGER NOT NULL,
    CONSTRAINT "user_roleRole_id_fkey" FOREIGN KEY ("roleRole_id") REFERENCES "role" ("role_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("created_at", "email", "is_active", "last_login", "password_hash", "user_id", "username") SELECT "created_at", "email", "is_active", "last_login", "password_hash", "user_id", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_levelToteacher_AB_unique" ON "_levelToteacher"("A", "B");

-- CreateIndex
CREATE INDEX "_levelToteacher_B_index" ON "_levelToteacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_activityTostudent_AB_unique" ON "_activityTostudent"("A", "B");

-- CreateIndex
CREATE INDEX "_activityTostudent_B_index" ON "_activityTostudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_homeworkTostudent_AB_unique" ON "_homeworkTostudent"("A", "B");

-- CreateIndex
CREATE INDEX "_homeworkTostudent_B_index" ON "_homeworkTostudent"("B");
