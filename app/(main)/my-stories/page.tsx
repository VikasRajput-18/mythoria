"use client";

import { Menu, Loader2 } from "lucide-react";
import React from "react";
import { useAppContext } from "../../../context/app-context";
import { useQuery } from "@tanstack/react-query";
import { getMyStories } from "../../../api-service/api";
import { cn } from "@/lib/utils";
import PlanLimitBar from "../../../components/plan-limit-bar";
import Story from "../../../components/story";
import { StoryType } from "../../../types";
import Image from "next/image";

const Page = () => {
  const { toggleSidebar, openSidebar } = useAppContext();
  const { data, isLoading } = useQuery({
    queryKey: ["stories", "me"],
    queryFn: getMyStories,
  });

  const stories = data?.stories || [];

  return (
    <div className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      <div className="flex items-center gap-2">
        <Menu
          className="stroke-white md:hidden flex-inline cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          My Stories
        </h1>
      </div>
      <p className="sm:text-lg max-w-2xl text-mystic-500">
        Pen it. Drop it. Make hearts skip a beat. ✍️💫
      </p>

      {/* ✅ Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-20 w-20 animate-spin text-mystic-500" />
        </div>
      )}

      {/* ✅ No Stories */}
      {!isLoading && stories.length === 0 && (
        <div className="pt-20 mt-20 flex flex-col items-center justify-center h-60 text-center">
          <Image
            src={"/assets/empty-page.png"}
            alt="No Story"
            width={300}
            height={300}
            className="object-contain "
          />
          <p className="text-lg text-mystic-500 max-w-sm">
            You haven’t written any stories yet. Start your first masterpiece
            today!
          </p>
        </div>
      )}

      {/* ✅ Story Grid */}
      {!isLoading && stories?.length > 0 && (
        <div className="grid grid-cols-12 gap-4 mt-8 space-y-2 mb-24">
          {stories.map((story: StoryType) => (
            <Story
              key={story.id}
              title={story.title}
              genre={story.genre}
              thumbnail={story.coverImage}
              description={story.description}
            />
          ))}
        </div>
      )}

      <PlanLimitBar />
    </div>
  );
};

export default Page;
