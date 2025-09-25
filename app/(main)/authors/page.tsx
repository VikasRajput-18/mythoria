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
import PageHeader from "../../../components/header/page-header";
import Author from "../../../components/authors/author";
import AuthorLoading from "../../../components/loading/author-loading";

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
      <PageHeader
        Icon={
          <Menu
            className="stroke-white xl:hidden flex-inline cursor-pointer"
            onClick={toggleSidebar}
          />
        }
        title={"Meet Our Authors"}
        description="Discover the brilliant minds weaving magical tales and timeless stories
        for Mythoria. ✨📚"
      />

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
        <div className="grid grid-cols-12  mt-8 items-stretch">
          {Array.from({ length: 6 }).map((_, ind) => {
            return <AuthorLoading key={ind} />;
          })}
        </div>
      ) : authors?.length > 0 ? (
        <div className="grid grid-cols-12  mt-8 items-stretch">
          {authors.map((author: AuthorType) => {
            return (
              <Author
                key={author.id}
                id={author.id}
                image={author.image}
                name={author.name}
                bio={author.bio}
              />
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
