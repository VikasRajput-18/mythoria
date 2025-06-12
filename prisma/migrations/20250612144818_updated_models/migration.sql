-- CreateEnum
CREATE TYPE "StoryType" AS ENUM ('BOOK', 'OTHER');

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "type" "StoryType" NOT NULL DEFAULT 'OTHER',
ALTER COLUMN "content" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "storyId" INTEGER NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
