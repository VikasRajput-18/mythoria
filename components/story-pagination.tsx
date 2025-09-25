import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import React, { Dispatch, SetStateAction } from "react";

interface StoryPaginationProps {
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const StoryPagination = ({
  setPage,
  totalPages,
  page,
}: StoryPaginationProps) => {
  return (
    <Pagination className="">
      <PaginationContent className="list-none ">
        <PaginationItem
          onClick={() => setPage((prev) => (prev <= 1 ? 1 : prev - 1))}
          className="cursor-pointer"
        >
          <PaginationPrevious className="text-mystic-500 no-underline" />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((i, ind) => {
          return (
            <PaginationItem
              key={ind + 1}
              onClick={() => setPage(ind + 1)}
              className={`cursor-pointer ${
                ind + 1 === page
                  ? "bg-white text-mystic-300 rounded-lg flex items-center justify-center font-bold"
                  : "text-mystic-500"
              }`}
            >
              <PaginationLink className="text-mystic-500 no-underline">
                {ind + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : totalPages))
          }
          className="cursor-pointer"
        >
          <PaginationNext className="text-mystic-500 no-underline" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default StoryPagination;
