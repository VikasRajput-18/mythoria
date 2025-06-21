"use client";

import {
  ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomTags from "../../components/custom-tags";
import { useAppContext } from "../../context/app-context";
import { Tag } from "../../types";

export default function MyBook() {
  const { formData: storyData } = useAppContext();

  return (
    <section className="bg-mystic-800 w-full min-h-screen p-4 sm:p-8">
      <div className="lg:flex items-start gap-x-8 space-y-8">
        <div className="flex-1 w-full">
          <div className="flex items-start gap-3">
            <Link href={"/create"} className="mt-0.5">
              <ArrowLeft className="stroke-white" />
            </Link>
            <h2 className="text-xl md:text-2xl my-0 text-neutral-200">
              {storyData?.title}
            </h2>
          </div>
          <p className="text-neutral-400">{storyData?.description}</p>

          {storyData?.tags?.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {storyData?.tags?.map((tag: Tag) => (
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
            {storyData?.thumbnail ? (
              <Image
                width={350}
                height={300}
                className="w-full max-w-2xl h-full max-h-[400px] object-contain bg-mystic-700 rounded-md"
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
      </div>
    </section>
  );
}
