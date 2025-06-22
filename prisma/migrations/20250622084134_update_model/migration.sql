-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_storyId_fkey";

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
