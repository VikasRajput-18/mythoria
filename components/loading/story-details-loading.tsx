import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const StoryDetailLoading = () => {
  return (
    <>
      <div className="flex-1 w-full">
        <Skeleton className="h-4 w-1/2 bg-mystic-400" />
        <Skeleton className="h-4 w-10/12 bg-mystic-400 mt-2" />
        <Skeleton className="h-[300px] w-full max-h-[400px] max-w-[600px] rounded-md bg-mystic-400 mt-4" />
        <Skeleton className="h-4 w-1/2 bg-mystic-400 mt-4" />
        <Skeleton className="h-4 w-2/6 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-1/3 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-1/5 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-1/2 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-10/12 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-1/6 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-2/5 bg-mystic-400 mt-2" />
        <Skeleton className="h-4 w-3/4 bg-mystic-400 mt-2" />
      </div>
      <div className="w-full lg:max-w-[400px] sticky top-10">
        <div className="flex items-center gap-2">
          <Skeleton className="h-20 w-20 bg-mystic-400 rounded-full" />
          <div className="w-full flex-1">
            <Skeleton className="h-4 w-1/2 bg-mystic-400" />
            <Skeleton className="h-3 w-full bg-mystic-400 mt-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetailLoading;
