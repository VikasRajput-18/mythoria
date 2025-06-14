"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import PlanLimitBar from "../../components/plan-limit-bar";
import Story from "../../components/story";
import { useAppContext } from "../../context/app-context";
import { cn } from "../../lib/utils";
import { useQuery} from "@tanstack/react-query";
import { getAllStories, getCurrentUser } from "../../api-service/api";
import Image from "next/image";
import { StoryType } from "../../types";

const page = () => {
  const { toggleSidebar, openSidebar } = useAppContext();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });

  const { data: allStories, isLoading: isLoading2 } = useQuery({
    queryKey: ["myStories"],
    queryFn: getAllStories,
  });

  const stories = allStories?.stories || [];

  return (
    <div className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      <div className="flex items-center gap-2">
        <Menu
          className="stroke-white md:hidden flex-inline cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          Welcome to Mythoria
        </h1>
      </div>
      <p className="sm:text-lg  max-w-2xl text-mystic-500">
        Craft your legacy, one page at a time — unleash your imagination through
        stories, comics, and magical manuscripts.
      </p>

      <div className="flex items-center justify-end gap-4 mt-4">
        <button className="text-white cursor-pointer hover:opacity-85 transition-all duration-200 ease-in-out hover:scale-95 font-bold bg-mystic-400 rounded-lg px-3 sm:px-6 py-2">
          Upgrade Plan
        </button>
        <Link
          href={!data?.user ? "/sign-in" : "/create"}
          aria-disabled={isLoading}
          className="text-white hover:opacity-85 no-underline transition-all duration-200 ease-in-out hover:scale-95 font-bold rounded-lg px-3 sm:px-6 py-2 bg-mystic-blue-900"
        >
          Create New Story
        </Link>
      </div>

      {/* ✅ No Stories */}
      {!isLoading2 && stories.length === 0 && (
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
      {!isLoading2 && stories?.length > 0 && (
        <div className="grid grid-cols-12 gap-4 mt-8 space-y-2 mb-24 items-stretch">
          {stories?.map((story: StoryType) => (
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

export default page;
