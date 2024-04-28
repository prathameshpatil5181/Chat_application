/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `userCredentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Messages" (
    "mid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sentTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("mid")
);

-- CreateIndex
CREATE UNIQUE INDEX "userCredentials_id_key" ON "userCredentials"("id");
