"use client";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { useAppContext } from "../../../context/app-context";
import CustomInput from "../../../components/custom-input";
import useDebounce from "../../../hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthors } from "../../../api-service/api";
import Spinner from "../../../components/spinner";
import { AuthorType } from "../../../types";
import Image from "next/image";
import Link from "next/link";

const Authors = () => {
  const [search, setSearch] = useState("");
  const { toggleSidebar, openSidebar } = useAppContext();
  const debouncedValue = useDebounce({ value: search, delay: 300 });

  const { data, isLoading } = useQuery({
    queryKey: ["authors", debouncedValue],
    queryFn: () => fetchAuthors(debouncedValue),
    placeholderData: (prev) => prev,
  });

  const authors = data?.authors || [];

  return (
    <section className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      <div className="flex items-center gap-2">
        <Menu
          className="stroke-white md:hidden flex-inline cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          Meet Our Authors
        </h1>
      </div>
      <p className="sm:text-lg max-w-2xl text-mystic-500">
        Discover the brilliant minds weaving magical tales and timeless stories
        for Mythoria. ✨📚
      </p>

      <div className="mt-8 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <CustomInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Search Authors..."
            className="max-w-3xl w-full"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-8">
          <Spinner className="w-10 h-10" />{" "}
        </div>
      ) : authors?.length > 0 ? (
        <div className="grid grid-cols-4  mt-8 items-stretch">
          {authors.map((author: AuthorType) => {
            return (
              <Link
                href={`/authors/${author.id}`}
                key={author?.id}
                className="col-span-4 md:col-span-2 lg:col-span-1 no-underline hover:opacity-75 transition-all duration-200 ease-in-out border border-transparent p-4 hover:border-mystic-400 rounded-lg shadow-none hover:shadow-2xl"
              >
                <div className="w-40 md:w-64 h-40 md:h-64 rounded-full mx-auto overflow-hidden border border-mystic-blue-900 p-1 bg-mystic-800">
                  <Image
                    src={author.image || "/assets/mythoria.png"}
                    alt={author.name}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover rounded-full "
                  />
                </div>
                <p className="text-white text-lg md:text-xl font-bold mt-2 text-center">
                  {author.name}
                </p>
                {author.bio && (
                  <p className="text-mystic-500 text-[14px] md:text-base mt-1 text-center">
                    {author.bio}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col gap-6 mt-8">
          <Image
            src={"/assets/authors-empty.png"}
            alt="Empty Author Page"
            width={300}
            height={300}
            className="w-40 h-40 md:w-80 md:h-80 object-contain"
          />
          <p className="mt-2 text-mystic-500 font-bold text-lg text-center md:text-2xl font-josefin">
            No authors found.
            <br />
            {search && "Try a different search or check back later!"}
          </p>
        </div>
      )}
    </section>
  );
};

export default Authors;
