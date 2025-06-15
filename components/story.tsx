import { PenLine, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface StoryProps {
  title: string;
  genre: string;
  thumbnail: string;
  description: string;
  type: string;
  id: number;
  showDelete?: boolean;
  handleDeleteStory?: (id: number) => void;
}

const Story = ({
  title,
  genre,
  thumbnail,
  description,
  type,
  id,
  showDelete,
  handleDeleteStory,
}: StoryProps) => {
  const router = useRouter();

  let isBook = type === "BOOK";

  return (
    <div
      onClick={() => {
        if (isBook) {
          router.push(`/book/${id}`);
        } else {
          router.push(`/story/${id}`);
        }
      }}
      className="border no-underline border-mystic-400 p-3 rounded-xl bg-mystic-950/40 transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-lg shadow-mystic-600 group cursor-pointer col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 space-y-2 h-full"
    >
      <div className="w-full rounded-lg overflow-hidden aspect-video relative">
        <Image
          src={thumbnail}
          width={300}
          height={200}
          alt={title}
          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-200 ease-in-out"
        />
        <span className="inline-block text-xs font-medium bg-mystic-300 text-white px-2 py-0.5 rounded-full absolute top-2 left-2 truncate max-w-[140px]">
          {genre}
        </span>
        {showDelete ? (
          <div className="flex items-center gap-1 absolute right-2 top-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/story-edit/${id}`);
              }}
              className=" cursor-pointer  rounded-full p-2 bg-green-800"
            >
              <PenLine className="stroke-white w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                if (handleDeleteStory) {
                  e.stopPropagation();
                  handleDeleteStory(id);
                }
              }}
              className=" cursor-pointer rounded-full p-2 bg-rose-800"
            >
              <Trash2Icon className="stroke-white w-4 h-4" />
            </button>
          </div>
        ) : null}
      </div>
      <h3 className="text-white text-lg font-semibold line-clamp-1">{title}</h3>
      <p className="text-mystic-500 text-sm line-clamp-2">{description}</p>
    </div>
  );
};

export default Story;
