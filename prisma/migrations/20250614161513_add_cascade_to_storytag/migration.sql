-- DropForeignKey
ALTER TABLE "StoryTag" DROP CONSTRAINT "StoryTag_storyId_fkey";

-- AddForeignKey
ALTER TABLE "StoryTag" ADD CONSTRAINT "StoryTag_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
