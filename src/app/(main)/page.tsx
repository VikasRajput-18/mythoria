import PlanLimitBar from "@/components/plan-limit-bar";
import Story from "@/components/story";
import { STORIES } from "@/constants/constants";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 px-8 py-16 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Welcome to Mythoria
      </h1>
      <p className="text-lg  max-w-2xl text-mystic-500">
        Craft your legacy, one page at a time — unleash your imagination through
        stories, comics, and magical manuscripts.
      </p>

      <div className="flex items-center justify-end gap-4 mt-4">
        <button className="text-white cursor-pointer hover:opacity-85 transition-all duration-200 ease-in-out hover:scale-95 font-bold bg-mystic-400 rounded-lg px-6 py-2">
          Upgrade Plan
        </button>
        <Link
          href="/create"
          className="text-white hover:opacity-85 transition-all duration-200 ease-in-out hover:scale-95 font-bold rounded-lg px-6 py-2 bg-mystic-blue-900"
        >
          Create New Story
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-8 space-y-2 mb-24">
        {STORIES.map((story, ind) => {
          return <Story key={ind} {...story} />;
        })}
      </div>
      <PlanLimitBar />
    </div>
  );
};

export default page;
