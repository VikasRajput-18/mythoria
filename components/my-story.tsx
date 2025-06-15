"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { getStoryById } from "../api-service/api";
import { Tag } from "../types";
import AuthorDetails from "./author-details";
import CustomInput from "./custom-input";
import CustomTags from "./custom-tags";
import Image from "next/image";
import Link from "next/link";

const MyStory = () => {
  const { id } = useParams();

  // ✅ tell TypeScript: I know it's a string
  const storyId = id as string;

  if (!storyId) return null;

  const { data: story, isLoading } = useQuery({
    queryKey: ["singleStory", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });


  return (
    <section className="bg-mystic-800 w-full min-h-screen p-4 sm:p-8">
      {/* ✅ Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-20 w-20 animate-spin text-mystic-500" />
        </div>
      ) : (
        <div className="lg:flex items-start gap-x-8 space-y-8">
          <div className="flex-1 w-full">
            <div className="flex items-start gap-3">
              <Link href={"/"} className="mt-0.5">
                <ArrowLeft className="stroke-white" />
              </Link>
              <h2 className="text-base sm:text-xl md:text-2xl my-0 text-neutral-200">
                {story?.title}
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-base">
              {story?.description}
            </p>

            {story?.tags?.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {story?.tags?.map((tag: Tag) => (
                  <CustomTags
                    key={tag.id}
                    id={tag.id}
                    value={tag.name}
                    hideIcon
                  />
                ))}
              </div>
            ) : null}

            <div className="my-7">
              {story?.coverImage ? (
                <Image
                  width={350}
                  height={300}
                  className="w-full max-w-2xl h-full max-h-[400px] object-contain bg-mystic-700 rounded-md"
                  src={story?.coverImage}
                  alt={story.title}
                />
              ) : null}
            </div>

            {/* Rich Text Content */}
            {story?.content && (
              <div
                className="prose prose-sm prose-invert max-w-none text-neutral-100"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            )}

            <div className="mt-8 w-full">
              <CustomInput
                value={""}
                onChange={() => {}}
                placeholder="Add Comment"
                className="w-full max-w-full"
              />
              <div className="flex items-center mt-4 justify-between">
                <button className="cursor-pointer text-xs sm:text-base flex items-center gap-1">
                  <Heart className="stroke-mystic-500 hover:stroke-rose-500" />
                  <p className="text-mystic-500 ">198</p>
                </button>
                <button className="cursor-pointer text-xs sm:text-base flex items-center gap-1">
                  <MessageCircle className="stroke-mystic-500 hover:stroke-white" />
                  <p className="text-mystic-500 ">198</p>
                </button>
                <button className="cursor-pointer text-xs sm:text-base flex items-center gap-1">
                  <Share2 className="stroke-mystic-500 hover:stroke-blue-500" />
                  <p className="text-mystic-500 ">198</p>
                </button>
                <button className="cursor-pointer text-xs sm:text-base flex items-center gap-1">
                  <Bookmark className="stroke-mystic-500 hover:stroke-orange-400" />
                  <p className="text-mystic-500 ">198</p>
                </button>
              </div>
            </div>
          </div>
          <AuthorDetails author={story?.author} />
        </div>
      )}
    </section>
  );
};

export default MyStory;
