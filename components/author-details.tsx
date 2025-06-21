import Image from "next/image";
import React from "react";
import StoryCard from "./story-card";

interface AuthorState {
  id: number;
  name: string;
  email: string;
  profile?: {
    image?: string;
    bio?: string;
  };
}

interface AuthorDetailsProps {
  author: AuthorState;
}

export const GenerateButton = () => {
  return (
    <button className="w-full py-5 cursor-pointer rounded-full flex items-center justify-center gap-3 bg-[#1C1A1C] transition-all duration-[450ms] ease-in-out hover:bg-gradient-to-t active:bg-gradient-to-t hover:from-[#A47CF3] active:from-[#A47CF3] hover:to-[#683FEA] active:to-[#683FEA] hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),0px_0px_0px_4px_rgba(255,255,255,0.2),0px_0px_180px_0px_#9917FF] active:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4),inset_0px_-4px_0px_0px_rgba(0,0,0,0.2),0px_0px_0px_4px_rgba(255,255,255,0.2),0px_0px_180px_0px_#9917FF] hover:-translate-y-0.5 active:-translate-y-0.5 group">
      <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        className="fill-[#AAAAAA] transition-all duration-[800ms] ease-in-out group-hover:fill-white group-hover:scale-110 group-active:fill-white group-active:scale-110"
      >
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
      </svg>
      <span className=" text-[#AAAAAA] font-semibold text-base md:text-lg group-hover:text-white group-active:text-white">
        Subscribe
      </span>
    </button>
  );
};

const AuthorDetails = ({ author }: AuthorDetailsProps) => {
  return (
    <div className="w-full lg:max-w-[400px] sticky top-10 ">
      <div className="flex items-center gap-2">
        <div className="border-2 border-mystic-blue-900 rounded-full p-0.5">
          <Image
            src={author?.profile?.image || "/assets/mythoria.png"}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover"
            alt={author?.name}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-lg">{author?.name}</h3>
          {author?.profile?.bio && (
            <p className="text-neutral-300 text-sm lg:max-w-[250px]">
              {author?.profile?.bio}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 w-full flex justify-end">
        <GenerateButton />
      </div>
      <div>
        <h3 className="text-white">Other stories by {author.name}</h3>
        <div className="mt-4 space-y-8">
          <StoryCard
            thumbnail={"/assets/lost_city.png"}
            title="The Lost City"
            genre="Fantasy"
          />
          <StoryCard
            thumbnail={"/assets/curse_of_the_cursed.png"}
            title="Curse of the Cursed"
            genre="Horror"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
