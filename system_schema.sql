-- Users Table
CREATE TABLE
  Users (
    UserID INT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    UserType VARCHAR(20) NOT NULL,
    LevelID INT,
    FOREIGN KEY (LevelID) REFERENCES Levels (LevelID)
  );

-- Teachers Table
CREATE TABLE
  Teachers (
    TeacherID INT PRIMARY KEY,
    UserID INT UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
  );

-- Students Table
CREATE TABLE
  Students (
    StudentID INT PRIMARY KEY,
    UserID INT UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
  );

-- Levels Table
CREATE TABLE
  Levels (
    LevelID INT PRIMARY KEY,
    LevelName VARCHAR(50) NOT NULL,
    Description TEXT
  );

-- Courses Table
--TODO Add teacher to course
CREATE TABLE
  Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(255) NOT NULL,
    Description TEXT,
    LevelID INT,
    FOREIGN KEY (LevelID) REFERENCES Levels (LevelID)
  );

-- Materials Table
CREATE TABLE
  Materials (
    MaterialID INT PRIMARY KEY,
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
    QuestionID INT PRIMARY KEY,
    TeacherID INT,
    QuestionText TEXT NOT NULL,
    QuestionType VARCHAR(50) NOT NULL,
    FOREIGN KEY (TeacherID) REFERENCES Teachers (TeacherID)
  );

-- Options Table
CREATE TABLE
  Options (
    OptionID INT PRIMARY KEY,
    QuestionID INT,
    OptionText TEXT NOT NULL,
    IsCorrect BOOLEAN,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- YesNoQuestions Table
CREATE TABLE
  YesNoQuestions (
    YesNoQuestionID INT PRIMARY KEY,
    QuestionID INT,
    CorrectAnswer BOOLEAN,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- WordSearchQuestions Table
CREATE TABLE
  WordSearchQuestions (
    WordSearchQuestionID INT PRIMARY KEY,
    QuestionID INT,
    WordList TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- FillInTheBlankQuestions Table
CREATE TABLE
  FillInTheBlankQuestions (
    FillInTheBlankQuestionID INT PRIMARY KEY,
    QuestionID INT,
    CorrectAnswers TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- OrderQuestions Table
CREATE TABLE
  OrderQuestions (
    OrderQuestionID INT PRIMARY KEY,
    QuestionID INT,
    CorrectOrder TEXT,
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- Exams Table
CREATE TABLE
  Exams (
    ExamID INT PRIMARY KEY,
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
    ExamQuestionID INT PRIMARY KEY,
    ExamID INT,
    QuestionID INT,
    QuestionOrder INT,
    FOREIGN KEY (ExamID) REFERENCES Exams (ExamID),
    FOREIGN KEY (QuestionID) REFERENCES Questions (QuestionID)
  );

-- ExamResults Table
CREATE TABLE
  ExamResults (
    ExamResultID INT PRIMARY KEY,
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
    ActivityID INT PRIMARY KEY,
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
    ProgressID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    ProgressPercentage INT,
    LastActivityTimestamp TIMESTAMP,
    FOREIGN KEY (StudentID) REFERENCES Students (StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses (CourseID)
  );
