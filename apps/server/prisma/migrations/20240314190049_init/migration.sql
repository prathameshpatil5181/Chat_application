-- CreateTable
CREATE TABLE "testuser" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testuser_pkey" PRIMARY KEY ("id")
);
