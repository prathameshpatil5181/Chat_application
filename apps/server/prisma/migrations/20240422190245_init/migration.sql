-- CreateTable
CREATE TABLE "Group" (
    "gid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Members" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Group_pkey" PRIMARY KEY ("gid")
);

-- CreateTable
CREATE TABLE "groupChat" (
    "gchatid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sentTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "groupChat_pkey" PRIMARY KEY ("gchatid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_gid_key" ON "Group"("gid");
