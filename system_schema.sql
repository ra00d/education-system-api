-- Users Table
CREATE TABLE
  Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    UserType VARCHAR(20) NOT NULL,
    LevelID INT,
    FOREIGN KEY (LevelID) REFERENCES Levels (LevelID)
  );

-- Teachers Table
CREATE TABLE
  Teachers (
    TeacherID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INT UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
  );

-- Students Table
CREATE TABLE
  Students (
    StudentID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INT UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
  );

-- Levels Table
CREATE TABLE
  Levels (
    LevelID INTEGER PRIMARY KEY AUTOINCREMENT,
    LevelName VARCHAR(50) NOT NULL,
    Description TEXT
  );

-- Courses Table
--TODO Add teacher to course
CREATE TABLE
  Courses (
    CourseID INTEGER PRIMARY KEY AUTOINCREMENT,
    CourseName VARCHAR(255) NOT NULL,
    Description TEXT,
    LevelID INT,
    FOREIGN KEY (LevelID) REFERENCES Levels (LevelID)
  );

-- Materials Table
CREATE TABLE
  Materials (
    MaterialID INTEGER PRIMARY KEY AUTOINCREMENT,
    TeacherID INT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    FileURL VARCHAR(255),
    RequiredLevelID INT,
    CourseID INT,
    FOREIGN KEY (TeacherID) REFERENCES Teachers (TeacherID),
    FOREIGN KEY (RequiredLevelID) REFERENCES Levels (LevelID),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID)
  );

-- Questions Table
CREATE TABLE
  Questions (
    QuestionID INTEGER PRIMARY KEY AUTOINCREMENT,
    TeacherID INT,
    QuestionText TEXT NOT NULL,
    QuestionType VARCHAR(50) NOT NULL,
    FOREIGN KEY (TeacherID) REFERENCES Teachers (TeacherID)
  );

-- Options Table
CREATE TABLE
  Options (
    OptionID INTEGER PRIMARY KEY AUTOINCREMENT,
    QuestionID INT,
    OptionText TEXT NOT NULL,
    IsCorrect BOOLEAN,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- YesNoQuestions Table
CREATE TABLE
  YesNoQuestions (
    YesNoQuestionID INTEGER PRIMARY KEY AUTOINCREMENT,
    QuestionID INT,
    CorrectAnswer BOOLEAN,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- WordSearchQuestions Table
CREATE TABLE
  WordSearchQuestions (
    WordSearchQuestionID INTEGER PRIMARY KEY AUTOINCREMENT,
    QuestionID INT,
    WordList TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- FillInTheBlankQuestions Table
CREATE TABLE
  FillInTheBlankQuestions (
    FillInTheBlankQuestionID INTEGER PRIMARY KEY AUTOINCREMENT,
    QuestionID INT,
    CorrectAnswers TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- OrderQuestions Table
CREATE TABLE
  OrderQuestions (
    OrderQuestionID INTEGER PRIMARY KEY AUTOINCREMENT,
    QuestionID INT,
    CorrectOrder TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- Exams Table
CREATE TABLE
  Exams (
    ExamID INTEGER PRIMARY KEY AUTOINCREMENT,
    TeacherID INT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    StartTime TIMESTAMP,
    EndTime TIMESTAMP,
    Duration INT,
    LevelID INT,
    CourseID INT,
    FOREIGN KEY (TeacherID) REFERENCES Teachers (TeacherID),
    FOREIGN KEY (LevelID) REFERENCES Levels (LevelID),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID)
  );

-- ExamQuestions Table
CREATE TABLE
  ExamQuestions (
    ExamQuestionID INTEGER PRIMARY KEY AUTOINCREMENT,
    ExamID INT,
    QuestionID INT,
    QuestionOrder INT,
    FOREIGN KEY (ExamID) REFERENCES Exams (ExamID),
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- ExamResults Table
CREATE TABLE
  ExamResults (
    ExamResultID INTEGER PRIMARY KEY AUTOINCREMENT,
    ExamID INT,
    StudentID INT,
    Score INT,
    SubmissionTime TIMESTAMP,
    FOREIGN KEY (ExamID) REFERENCES Exams (ExamID),
    FOREIGN KEY (StudentID) REFERENCES Students (StudentID)
  );

-- UserActivities Table
CREATE TABLE
  UserActivities (
    ActivityID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INT,
    StudentID INT,
    MaterialID INT,
    ExamID INT,
    Timestamp TIMESTAMP,
    Score INT,
    CourseID INT,
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (StudentID) REFERENCES Students (StudentID),
    FOREIGN KEY (MaterialID) REFERENCES Materials (MaterialID),
    FOREIGN KEY (ExamID) REFERENCES Exams (ExamID),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID)
  );

-- CourseProgress Table
CREATE TABLE
  CourseProgress (
    ProgressID INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentID INT,
    CourseID INT,
    ProgressPercentage INT,
    LastActivityTimestamp TIMESTAMP,
    FOREIGN KEY (StudentID) REFERENCES Students (StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID)
  );
