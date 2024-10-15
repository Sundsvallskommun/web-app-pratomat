-- CreateTable
CREATE TABLE "UserSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Assistant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "app" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "question" TEXT NOT NULL DEFAULT 'Hur skulle du vilja utveckla Sundsvalls stadskärna?',
    "startText" TEXT NOT NULL DEFAULT 'Säg vad du tycker',
    "submitText" TEXT NOT NULL DEFAULT 'Skicka svar',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FinalQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assistantId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    CONSTRAINT "FinalQuestion_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinalAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    CONSTRAINT "FinalAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "FinalQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");
