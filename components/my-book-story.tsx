"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { getStoryById } from "../api-service/api";

type Page = {
  id: number;
  content: string;
  pageNumber: number;
};

const MyBookStory = () => {
  const { id } = useParams();
  const storyId = id as string;

  const { data: story, isLoading } = useQuery({
    queryKey: ["singleStory", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });

  if (!storyId) return null;

  return (
    <section className="bg-mystic-800 w-full p-4 sm:p-8 h-screen overflow-hidden flex justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-20 w-20 animate-spin text-gray-600" />
        </div>
      ) : (
        <HTMLFlipBook
          width={370}
          height={500}
          maxShadowOpacity={0.5}
          showCover={true}
          drawShadow={true}
          size="stretch" // ← better for responsiveness than "fixed"
          minWidth={300} // optional: define min/max
          maxWidth={500}
          minHeight={500}
          maxHeight={633}
          mobileScrollSupport={true}
          className="demo-book"
          {...({} as any)}
        >
          {/* Cover Page */}
          <div className="p-3 md:p-8 overflow-hidden flex flex-col justify-center items-center bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-[#5b4636] font-josefin">
              {story.title}
            </h1>
            <p className="text-[#7a6248] mb-4 font-josefin text-xs sm:text-base">
              {story.description}
            </p>
            <img
              src={story.coverImage}
              alt="Cover"
              className="aspect-auto max-h-[200px] sm:max-h-[300px] w-full object-contain rounded-md "
            />
          </div>

          {/* Content Pages */}
          {story.pages.map((page: Page) => (
            <div
              key={page.id}
              className="p-3 md:p-8 bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin text-[#5b4636] prose max-w-none leading-relaxed overflow-auto"
              dangerouslySetInnerHTML={{ __html: page.content }}
            ></div>
          ))}

          {/* About Author Page */}
          <div className="p-8 bg-[#fdf6e3] border w-full h-full font-josefin text-mystic-700">
            <h2 className="text-xl font-bold mb-4 text-mystic-700">
              About the Author
            </h2>
            <p className="mb-2">
              <b>Name: </b>
              {story.author.name}
            </p>
            <p className="mb-2">
              <b>Email: </b> {story.author.email}
            </p>
            <p>
              <b>Story Title: </b> {story.title}
            </p>
          </div>
        </HTMLFlipBook>
      )}
    </section>
  );
};

export default MyBookStory;
