import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface StoryCardProps {
  thumbnail: string;
  title: string;
  genre: string;
}

const StoryCard = ({ thumbnail, title, genre }: StoryCardProps) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex items-stretch gap-4">
        <Image
          src={thumbnail}
          width={120}
          height={80}
          alt={title}
          className="rounded-md object-cover"
        />
        <div>
          <h4 className="text-white text-lg">{title}</h4>
          <p className="text-mystic-500">{genre}</p>
        </div>
      </div>
      <div>
        <ArrowRight className="stroke-white" />
      </div>
    </div>
  );
};

export default StoryCard;
