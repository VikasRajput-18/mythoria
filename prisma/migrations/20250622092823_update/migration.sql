-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_storyId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
