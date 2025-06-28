"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { deleteStory, getMyStories } from "../../../api-service/api";
import CustomInput from "../../../components/custom-input";
import PlanLimitBar from "../../../components/plan-limit-bar";
import Story from "../../../components/story";
import { useAppContext } from "../../../context/app-context";
import useDebounce from "../../../hooks/use-debounce";
import { StoryType } from "../../../types";
import DeletePopup from "../../../components/delete-popup";

const Page = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { toggleSidebar, openSidebar } = useAppContext();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStory, setSelectedStory] = useState<{
    storyId: number;
    title: string;
  } | null>(null);
  const debouncedValue = useDebounce({ value: search, delay: 300 });

  const { data, isLoading } = useQuery({
    queryKey: ["myStories", debouncedValue, page],
    queryFn: () => getMyStories(debouncedValue, page),
    placeholderData: (prev) => prev,
  });

  const deleteStoryMutation = useMutation({
    mutationFn: deleteStory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const stories = data?.stories || [];
  const totalPages = data?.totalPages;

  // Open confirmation
  const confirmDeleteStory = ({
    storyId,
    title,
  }: {
    storyId: number;
    title: string;
  }) => {
    setSelectedStory({
      storyId,
      title,
    });
    setShowDialog(true);
  };

  const handleDeleteStory = (id: number) => {
    deleteStoryMutation.mutate(id);
  };

  return (
    <div className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      <div className="flex items-center gap-2">
        <Menu
          className="stroke-white xl:hidden flex-inline cursor-pointer"
          onClick={toggleSidebar}
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          My Stories
        </h2>
      </div>
      <p className="sm:text-lg max-w-2xl text-mystic-500">
        Pen it. Drop it. Make hearts skip a beat. ✍️💫
      </p>

      <div className="max-w-sm w-full mt-4">
        <CustomInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder="Search your stories..."
        />
      </div>

      {/* ✅ Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-20 w-20 animate-spin text-mystic-500" />
        </div>
      )}

      {/* ✅ No Stories */}
      {!isLoading && stories.length === 0 && (
        <div className="pt-20 mt-20 flex flex-col items-center justify-center h-60 text-center">
          <Image
            src={"/assets/empty-page.png"}
            alt="No Story"
            width={300}
            height={300}
            className="object-contain "
          />
          <p className="text-lg text-mystic-500 max-w-sm">
            You haven’t written any stories yet. Start your first masterpiece
            today!
          </p>
        </div>
      )}

      {/* ✅ Story Grid */}
      <div>
        {!isLoading && stories?.length > 0 && (
          <div className="grid grid-cols-12 gap-4 mt-8 space-y-2 mb-24">
            {stories?.map((story: StoryType) => (
              <Story
                key={story.id}
                id={story.id}
                title={story.title}
                genre={story.genre}
                thumbnail={story.coverImage}
                description={story.description}
                type={story.type}
                showDelete
                handleDeleteStory={(storyId) => confirmDeleteStory(storyId)}
              />
            ))}
          </div>
        )}
        {!isLoading && stories?.length > 0 && (
          <Pagination className="">
            <PaginationContent className="list-none ">
              <PaginationItem
                onClick={() => setPage((prev) => (prev <= 1 ? 1 : prev - 1))}
              >
                <PaginationPrevious
                  href="#"
                  className="text-mystic-500 no-underline"
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((i, ind) => {
                return (
                  <PaginationItem
                    key={ind + 1}
                    onClick={() => setPage(ind + 1)}
                    className={`${
                      ind + 1 === page
                        ? "bg-white text-mystic-300 rounded-lg flex items-center justify-center font-bold"
                        : "text-mystic-500"
                    }`}
                  >
                    <PaginationLink
                      className="text-mystic-500 no-underline"
                      href="#"
                    >
                      {ind + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem
                onClick={() =>
                  setPage((prev) => (prev < totalPages ? prev + 1 : totalPages))
                }
              >
                <PaginationNext
                  href="#"
                  className="text-mystic-500 no-underline"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <PlanLimitBar />

      <DeletePopup
        setShowDialog={setShowDialog}
        showDialog={showDialog}
        selectedStory={selectedStory}
        handleDeleteStory={handleDeleteStory}
      />
    </div>
  );
};

export default Page;
