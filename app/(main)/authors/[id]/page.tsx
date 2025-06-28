"use client";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Menu } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchAuthorsWithId } from "../../../../api-service/api";
import { GenerateButton } from "../../../../components/author-details";
import { useAppContext } from "../../../../context/app-context";
import { StoryType } from "../../../../types";
import Link from "next/link";
import Spinner from "../../../../components/spinner";

const AuthorPage = () => {
  const { toggleSidebar, openSidebar } = useAppContext();
  const { id } = useParams();
  const storyId = id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["author", storyId],
    queryFn: () => fetchAuthorsWithId(storyId),
    placeholderData: (prev) => prev,
  });

  if (!storyId) return;
  const author = data?.author;

  return (
    <section className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-20">
          <Spinner className={"w-10 h-10"} />
        </div>
      ) : (
        <>
          <div className="mb-3 p-2 hover:bg-mystic-700 rounded-full w-max">
            <Link href={"/authors"} className="">
              <ArrowLeft className="stroke-white" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Menu
              className="stroke-white md:hidden flex-inline cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="flex items-start gap-6 flex-wrap flex-col md:flex-row">
            <div className="w-40 md:w-52 h-40 md:h-52 rounded-full overflow-hidden border border-mystic-blue-900 p-1 bg-mystic-800">
              <Image
                src={author?.profile?.image || "/assets/mythoria.png"}
                alt={author?.name || "NA"}
                width={250}
                height={250}
                className="w-full h-full object-cover rounded-full "
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                {author?.name}
              </h2>
              {author?.profile?.bio ? (
                <p className="sm:text-lg max-w-2xl text-mystic-500 text-left">
                  {author?.profile?.bio}
                </p>
              ) : null}
              <div className="min-w-3xs max-w-md w-full mt-6">
                <GenerateButton />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-8">
            {author?.stories?.map((story: StoryType) => {
              let isBook = story.type === "BOOK";
              return (
                <Link
                  href={isBook ? `/book/${story?.id}` : `/story/${story?.id}`}
                  className="col-span-12 md:col-span-6 2xl:col-span-4 hover:opacity-80  rounded-xl "
                  key={story?.id}
                >
                  <div className="w-full h-full max-w-[450px] md:h-[450px] p-1  rounded-xl overflow-hidden border border-transparent hover:border-mystic-300 relative">
                    <Image
                      src={story?.coverImage}
                      alt={story?.title}
                      width={350}
                      height={450}
                      className="w-full h-full bg-mystic-700 mask-b-from-0.5 object-contain rounded-lg"
                    />
                    <div className="absolute bottom-4 z-10 px-2 w-full">
                      <h2 className="truncate text-white text-lg">
                        {story.title}
                      </h2>
                      <p className="line-clamp-2  text-[14px] text-mystic-500">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default AuthorPage;
