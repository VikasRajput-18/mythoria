
import { prisma } from "./prisma";

export async function getStoryByIdForMeta(id: string) {
  const story = await prisma.story.findUnique({
    where: { id: Number(id) },
    include: { author: true, tags: true },
  });
  return story;
}
