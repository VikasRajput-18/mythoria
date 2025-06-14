import Image from "next/image";
import React from "react";

interface StoryProps {
  title: string;
  genre: string;
  thumbnail: string;
  description: string;
}

const Story = ({ title, genre, thumbnail, description }: StoryProps) => {
  return (
    <div className="border border-mystic-400 p-3 rounded-xl bg-mystic-950/40 transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-lg shadow-mystic-600 group cursor-pointer col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 space-y-2 h-full">
      <div className="w-full rounded-lg overflow-hidden aspect-video relative">
        <Image
          src={thumbnail}
          width={300}
          height={200}
          alt={title}
          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-200 ease-in-out"
        />
        <span className="inline-block text-xs font-medium bg-mystic-300 text-white px-2 py-0.5 rounded-full absolute top-2 left-2">
          {genre}
        </span>
      </div>
      <h3 className="text-white text-lg font-semibold line-clamp-1">{title}</h3>
      <p className="text-mystic-500 text-sm line-clamp-2">{description}</p>
    </div>
  );
};

export default Story;
