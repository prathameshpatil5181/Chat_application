-- CreateTable
CREATE TABLE "group_messages" (
    "gid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sentTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "members" TEXT[],

    CONSTRAINT "group_messages_pkey" PRIMARY KEY ("gid")
);
