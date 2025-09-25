import { prisma } from "../../../lib/prisma";
import MyStory from "../../../components/my-story";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const story = await prisma.story.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
      tags: { include: { tag: true } }, // Correct relation based on your schema
      _count: { select: { comments: true, like: true } }, // Added engagement metrics
    },
  });

  if (!story) {
    return {
      title: "Story Not Found | Mythoria Stories",
      description: "The requested story could not be found on Mythoria Stories",
      robots: "noindex", // Prevent indexing of 404 pages
    };
  }

  // Prepare SEO elements using only available fields
  const tagsText = story.tags.map((storyTag) => storyTag.tag.name).join(", ");
  const engagementText = [
    story._count.comments > 0 && `${story._count.comments} comments`,
    story._count.like > 0 && `${story._count.like} likes`,
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    title: `${story.title} | By ${story.author.name} | Mythoria Stories`,
    description: [
      story.description,
      story.genre && `Genre: ${story.genre}`,
      tagsText && `Tags: ${tagsText}`,
      engagementText,
    ]
      .filter(Boolean)
      .join(" - "),

    alternates: {
      canonical: `https://www.mythoria-stories.com/story/${id}`,
    },

    openGraph: {
      title: `${story.title} | Free ${story.genre || "Story"} on Mythoria`,
      description: story.description.substring(0, 160),
      url: `https://www.mythoria-stories.com/story/${id}`,
      type: story.type === "BOOK" ? "book" : "article",
      ...(story.type === "BOOK" && {
        book: {
          author: story.author.name,
          releaseDate: story.createdAt.toISOString(),
        },
      }),
      images: story.coverImage
        ? [
            {
              url: new URL(
                story.coverImage,
                "https://www.mythoria-stories.com"
              ).toString(),
              width: 800,
              height: 600,
              alt: `${story.title} cover image`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: `${story.title} by ${story.author.name}`,
      description: story.description.substring(0, 100),
      images: story.coverImage
        ? [
            new URL(
              story.coverImage,
              "https://www.mythoria-stories.com"
            ).toString(),
          ]
        : undefined,
    },

    other: {
      ...(story.genre && { "article:section": story.genre }),
      "article:published_time": story.createdAt.toISOString(),
      "article:modified_time": story.updatedAt.toISOString(),
    },
  };
}
export default function Page({ params }: { params: { id: string } }) {
  return <MyStory />;
}
