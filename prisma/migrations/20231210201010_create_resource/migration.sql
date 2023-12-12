-- CreateTable
CREATE TABLE "CourseProgress" (
    "progressID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentID" INTEGER,
    "courseID" INTEGER,
    "progressPercentage" INTEGER,
    "lastActivityTimestamp" DATETIME,
    CONSTRAINT "CourseProgress_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Courses" ("courseID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "CourseProgress_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Students" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Courses" (
    "courseID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseName" TEXT NOT NULL,
    "description" TEXT,
    "levelID" INTEGER,
    CONSTRAINT "Courses_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Levels" ("levelID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "ExamQuestions" (
    "examQuestionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "examID" INTEGER,
    "questionID" INTEGER,
    "questionOrder" INTEGER,
    CONSTRAINT "ExamQuestions_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "ExamQuestions_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exams" ("examID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "ExamResults" (
    "examResultID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "examID" INTEGER,
    "studentID" INTEGER,
    "score" INTEGER,
    "submissionTime" DATETIME,
    CONSTRAINT "ExamResults_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Students" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "ExamResults_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exams" ("examID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Exams" (
    "examID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherID" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "duration" INTEGER,
    "levelID" INTEGER,
    "courseID" INTEGER,
    CONSTRAINT "Exams_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Courses" ("courseID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Exams_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Levels" ("levelID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Exams_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teachers" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "FillInTheBlankQuestions" (
    "fillInTheBlankQuestionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionID" INTEGER,
    "correctAnswers" TEXT,
    CONSTRAINT "FillInTheBlankQuestions_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Levels" (
    "levelID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "levelName" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Materials" (
    "materialID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherID" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileURL" TEXT,
    "requiredLevelID" INTEGER,
    "courseID" INTEGER,
    CONSTRAINT "Materials_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Courses" ("courseID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Materials_requiredLevelID_fkey" FOREIGN KEY ("requiredLevelID") REFERENCES "Levels" ("levelID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Materials_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teachers" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Options" (
    "optionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionID" INTEGER,
    "optionText" TEXT NOT NULL,
    "isCorrect" BOOLEAN,
    CONSTRAINT "Options_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "OrderQuestions" (
    "orderQuestionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionID" INTEGER,
    "correctOrder" TEXT,
    CONSTRAINT "OrderQuestions_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Questions" (
    "questionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherID" INTEGER,
    "questionText" TEXT NOT NULL,
    "questionType" TEXT NOT NULL,
    CONSTRAINT "Questions_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "Teachers" ("teacherID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Students" (
    "studentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    CONSTRAINT "Students_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Teachers" (
    "teacherID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    CONSTRAINT "Teachers_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "UserActivities" (
    "activityID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER,
    "studentID" INTEGER,
    "materialID" INTEGER,
    "examID" INTEGER,
    "timestamp" DATETIME,
    "score" INTEGER,
    "courseID" INTEGER,
    CONSTRAINT "UserActivities_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Courses" ("courseID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserActivities_examID_fkey" FOREIGN KEY ("examID") REFERENCES "Exams" ("examID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserActivities_materialID_fkey" FOREIGN KEY ("materialID") REFERENCES "Materials" ("materialID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserActivities_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Students" ("studentID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserActivities_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Users" (
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "levelID" INTEGER,
    CONSTRAINT "Users_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Levels" ("levelID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "WordSearchQuestions" (
    "wordSearchQuestionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionID" INTEGER,
    "wordList" TEXT,
    CONSTRAINT "WordSearchQuestions_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "YesNoQuestions" (
    "yesNoQuestionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionID" INTEGER,
    "correctAnswer" BOOLEAN,
    CONSTRAINT "YesNoQuestions_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions" ("questionID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Students_1" ON "Students"("userID");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Teachers_1" ON "Teachers"("userID");
Pragma writable_schema=0;
