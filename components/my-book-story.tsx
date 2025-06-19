"use client";

import { useQuery } from "@tanstack/react-query";
import { Info, Loader2, SquareMenu } from "lucide-react";
import { useParams } from "next/navigation";
import HTMLFlipBook from "react-pageflip";
import { getCurrentUser, getStoryById } from "../api-service/api";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import LikeButton from "./like-button";
import { useState } from "react";
import { useUserContext } from "../context/user-context";

type Page = {
  id: number;
  content: string;
  pageNumber: number;
};

const MyBookStory = () => {
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const storyId = id as string;

  const { user } = useUserContext();

  const { data: story, isLoading } = useQuery({
    queryKey: ["singleStory", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });

  if (!storyId) return null;

  return (
    <section className="bg-mystic-800 w-full p-4 sm:p-8 h-screen overflow-hidden flex justify-center items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
            aria-label="Story Info"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs text-sm z-50 bg-mystic-700 p-4 rounded-xl">
          <h3 className="text-base font-semibold mb-2">Story Tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Swipe or click to flip pages.</li>
            <li>Use full screen for a better experience.</li>
            <li>Scroll if content overflows.</li>
          </ul>
        </PopoverContent>
      </Popover>
      <div className="absolute top-4 left-4">
        <div className="relative">
          <button
            className="p-2 rounded-full cursor-pointer bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
            aria-label="Story Info"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <SquareMenu className="w-5 h-5 text-white" />
          </button>
          <div
            className={`absolute ${
              showMenu ? "left-12 scale-100" : "scale-0 left-0"
            } transition-all duration-200 ease-in-out top-0 bg-mystic-700 rounded-xl`}
          >
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-mystic-500 transition-colors z-50"
              aria-label="Story Info"
            >
              <LikeButton
                storyId={Number(storyId)}
                initialLiked={story?.like?.some(
                  (l: any) => l?.userId === user?.id
                )}
                initialCount={story?.like?.length}
              />
            </div>
          </div>
        </div>
      </div>

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
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 !text-[#5b4636] font-josefin">
              {story.title}
            </h1>
            <p className="text-[#7a6248] mb-4 font-josefin text-[15px] sm:text-base">
              {story.description}
            </p>
            <img
              src={story.coverImage}
              alt="Cover"
              className="aspect-auto max-h-[200px] sm:max-h-[300px] w-full object-contain rounded-md "
            />
          </div>

          {/* Content Pages */}
          {story?.pages.map((page: Page) => (
            // <div
            //   key={page.id}
            //   className="p-3 md:p-8 bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin !text-[#5b4636] prose max-w-none leading-relaxed overflow-auto"
            //   dangerouslySetInnerHTML={{ __html: page.content }}
            // ></div>
            <div
              key={page.id}
              className="relative p-3 md:p-8 bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin !text-[#5b4636] prose max-w-none leading-relaxed overflow-auto"
            >
              {/* Page HTML content */}
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
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
