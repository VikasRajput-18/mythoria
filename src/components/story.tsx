import Image from "next/image";
import React from "react";

interface StoryProps {
  title: string;
  genre: string;
  thumbnail: string;
}

const Story = ({ title, genre, thumbnail }: StoryProps) => {
  return (
    <div className="p-3 rounded-xl transition-all duration-200 ease-in-out hover:scale-95 cursor-pointer col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 space-y-2">
      <div className="w-full  rounded-lg overflow-hidden">
        <Image
          src={thumbnail}
          width={300}
          height={250}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-white text-lg font-semibold break-words">{title}</h3>
      <p className="text-mystic-500 -mt-2">{genre}</p>
    </div>
  );
};

export default Story;
