-- AlterTable
ALTER TABLE "socketConnections" ADD COLUMN     "connections" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "groups" TEXT NOT NULL DEFAULT '';
