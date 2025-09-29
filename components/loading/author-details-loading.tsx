import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const AuthorDetailsLoading = () => {
  return (
    <>
      <section className={cn(`w-full p-4 sm:p-8 max-w-[1880px]`)}>
        {" "}
        <div className="w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-32 w-32 bg-mystic-400 rounded-full" />
            <div className="w-full flex-1">
              <Skeleton className="h-4 w-1/3 bg-mystic-400" />
              <Skeleton className="h-3 w-full bg-mystic-400 mt-2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-8">
          {Array.from({ length: 4 }).map((_, ind) => {
            return (
              <Skeleton
                key={ind}
                className="relativecol-span-12 md:col-span-6 2xl:col-span-4 hover:opacity-80 bg-mystic-400 rounded-xl h-[450px]"
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AuthorDetailsLoading;
