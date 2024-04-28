-- AlterTable
ALTER TABLE "userCredentials" ADD COLUMN     "connections" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "profilePicture" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Hi there! i am using whatsapp';
