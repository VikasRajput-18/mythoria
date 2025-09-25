import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AuthorProps {
  id: number;
  image?: string;
  name: string;
  bio?: string;
}

const Author = ({ id, image, name, bio }: AuthorProps) => {
  return (
    <Link
      href={`/authors/${id}`}
      key={id}
      className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 no-underline hover:opacity-75 transition-all duration-200 ease-in-out border border-transparent p-4 hover:border-mystic-400 rounded-lg shadow-none hover:shadow-2xl"
    >
      <div className="w-40 h-40 rounded-full mx-auto overflow-hidden border border-mystic-blue-900 p-1 bg-mystic-800">
        <Image
          src={image || "/assets/mythoria.png"}
          alt={name}
          width={180}
          height={180}
          className="w-full h-full object-cover rounded-full "
        />
      </div>
      <p className="text-white text-lg font-bold mt-2 text-center">{name}</p>
      {bio && (
        <p className="text-mystic-500 text-[14px] mt-1 text-center">{bio}</p>
      )}
    </Link>
  );
};

export default Author;
