import { prisma } from "../../../lib/prisma";
import MyBookStory from "../../../components/my-book-story";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const story = await prisma.story.findUnique({
    where: { id: Number(id) },
    include: { author: true, tags: true },
  });

  if (!story) {
    return {
      title: "Story Not Found",
    };
  }

  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      images: [
        {
          url: story.coverImage!, // make sure this is absolute, e.g. https://yourdomain.com/...
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
      images: [story.coverImage!],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <MyBookStory />;
}
