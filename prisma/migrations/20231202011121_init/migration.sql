-- CreateTable
CREATE TABLE "login_attempt" (
    "attempt_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "ip_address" TEXT NOT NULL,
    "attempt_timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN,
    CONSTRAINT "login_attempt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "permission" (
    "permission_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "permission_name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "user_session" (
    "session_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "jwt_token" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    CONSTRAINT "user_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_login" DATETIME,
    "is_active" BOOLEAN DEFAULT true
);

-- CreateTable
CREATE TABLE "_permissionTorole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_permissionTorole_A_fkey" FOREIGN KEY ("A") REFERENCES "permission" ("permission_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_permissionTorole_B_fkey" FOREIGN KEY ("B") REFERENCES "role" ("role_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_roleTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_roleTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "role" ("role_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_roleTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_permissionTorole_AB_unique" ON "_permissionTorole"("A", "B");

-- CreateIndex
CREATE INDEX "_permissionTorole_B_index" ON "_permissionTorole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_roleTouser_AB_unique" ON "_roleTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_roleTouser_B_index" ON "_roleTouser"("B");
