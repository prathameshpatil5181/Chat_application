-- CreateTable
CREATE TABLE "userCredentials" (
    "id" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_Updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userCredentials_emailId_key" ON "userCredentials"("emailId");
