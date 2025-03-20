-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assistant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL DEFAULT 'vattjom',
    "app" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "question" TEXT NOT NULL DEFAULT 'Hur skulle du vilja utveckla Sundsvalls stadskärna?',
    "startText" TEXT NOT NULL DEFAULT 'Säg vad du tycker',
    "submitText" TEXT NOT NULL DEFAULT 'Skicka svar',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Assistant" ("app", "assistantId", "createdAt", "id", "name", "published", "question", "startText", "submitText", "updatedAt") SELECT "app", "assistantId", "createdAt", "id", "name", "published", "question", "startText", "submitText", "updatedAt" FROM "Assistant";
DROP TABLE "Assistant";
ALTER TABLE "new_Assistant" RENAME TO "Assistant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
