"use client";

import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuthorDetails from "../../components/author-details";
import CustomInput from "../../components/custom-input";
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
                <CustomTags key={tag.id} {...tag} hideIcon />
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

          <div className="mt-8 w-full">
            <CustomInput
              value={""}
              onChange={() => {}}
              placeholder="Add Comment"
              className="w-full max-w-full"
            />
            <div className="flex items-center mt-4 justify-between">
              <button className="cursor-pointer flex items-center gap-1">
                <Heart className="stroke-mystic-500 hover:stroke-rose-500" />
                <p className="text-mystic-500">198</p>
              </button>
              <button className="cursor-pointer flex items-center gap-1">
                <MessageCircle className="stroke-mystic-500 hover:stroke-white" />
                <p className="text-mystic-500">198</p>
              </button>
              <button className="cursor-pointer flex items-center gap-1">
                <Share2 className="stroke-mystic-500 hover:stroke-blue-500" />
                <p className="text-mystic-500">198</p>
              </button>
              <button className="cursor-pointer flex items-center gap-1">
                <Bookmark className="stroke-mystic-500 hover:stroke-orange-400" />
                <p className="text-mystic-500">198</p>
              </button>
            </div>
          </div>
        </div>
        <AuthorDetails />
      </div>
    </section>
  );
}
