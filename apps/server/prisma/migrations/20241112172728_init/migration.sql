-- AlterTable
ALTER TABLE "userCredentials" ALTER COLUMN "status" SET DEFAULT 'Hi there! i am using ChitChat';

-- CreateTable
CREATE TABLE "Requests" (
    "rid" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("rid")
);

-- CreateIndex
CREATE INDEX "Requests_to_from_idx" ON "Requests"("to" DESC, "from");
