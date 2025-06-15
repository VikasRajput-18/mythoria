import { getStoryById } from "../../../api-service/api";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const story = await getStoryById(params.id);

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
          url: story.coverImage, // must be absolute URL!
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
      images: [story.coverImage],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <MyStory />;
}
