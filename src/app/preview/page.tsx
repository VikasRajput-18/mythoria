"use client";
import CustomTags from "@/components/custom-tags";
import { Tag } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyBook() {
  const [storyData, setStoryData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("storyData");
    if (data) {
      try {
        setStoryData(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse storyData:", e);
      }
    }
  }, []);

  return (
    <section className="bg-mystic-800 w-full min-h-screen p-4 sm:p-8">
      <div className="lg:flex items-start gap-x-8 ">
        <div className="flex-1 w-full">
          <h2 className="text-xl md:text-2xl text-neutral-200">
            {storyData?.title}
          </h2>
          <p className="text-neutral-400">{storyData?.description}</p>

          {storyData?.tags?.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {storyData?.tags?.map((tag: Tag) => (
                <CustomTags key={tag.id} {...tag} hideIcon />
              ))}
            </div>
          ) : null}

          <div className="my-7">
            {storyData?.thumbnail ? (
              <Image
                width={350}
                height={300}
                className="w-full max-w-2xl h-full rounded-md"
                src={storyData?.thumbnail}
                alt={storyData.title}
              />
            ) : null}
          </div>

          {/* Rich Text Content */}
          {storyData?.content && (
            <div
              className="prose prose-sm prose-invert max-w-none text-neutral-100"
              dangerouslySetInnerHTML={{ __html: storyData.content }}
            />
          )}
        </div>
        <div className="md:max-w-[400px] sticky top-10 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
          tempore.
        </div>
      </div>
    </section>
  );
}
