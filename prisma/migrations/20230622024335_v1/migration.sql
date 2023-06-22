-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "homepage" TEXT,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DECIMAL NOT NULL,
    "release_date" TEXT,
    "revenue" BIGINT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "vote_average" DECIMAL NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movie_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movieId" INTEGER,
    CONSTRAINT "Genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movieId" INTEGER,
    CONSTRAINT "Company_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CastMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cast_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "credit_id" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditId" INTEGER,
    CONSTRAINT "CastMember_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cast_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "credit_id" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditId" INTEGER,
    CONSTRAINT "CrewMember_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
