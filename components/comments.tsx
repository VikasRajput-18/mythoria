import { Dot, Trash2Icon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { timeAgo } from "../lib/upload-to-cloudinary";
import { CommentType } from "../types";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api-service/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useUserContext } from "../context/user-context";

type CommentsProps = {
  comments: CommentType[];
  commentCount: number;
  storyId: string;
  storyAuthorId: number;
  totalCount?: number;
  limit?: number;
  skip?: number;
  loadMoreFn?: () => void;
  setComments: Dispatch<SetStateAction<[] | CommentType[]>>;
};

const Comments = ({
  storyAuthorId,
  storyId,
  comments,
  commentCount = 0,
  totalCount = 0,
  limit,
  skip,
  loadMoreFn,
  setComments,
}: CommentsProps) => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["singleStory", storyId] });
      queryClient.invalidateQueries({
        queryKey: ["comments", storyId, limit, skip],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const handleDeleteComment = (storyId: number, commentId: number) => {
    // Optimistically update local list:
    setComments((prev: CommentType[]) =>
      prev.filter((c: CommentType) => c.id !== commentId)
    );
    // Fire mutation:
    deleteCommentMutation.mutate({ storyId, commentId });
  };

  return (
    comments?.length > 0 && (
      <div className="bg-mystic-700 p-4 mt-4 rounded-lg space-y-2">
        <p className="text-white text-lg font-semibold border-b border-mystic-600 pb-2 mb-4">
          Comments ({commentCount})
        </p>
        {comments?.map((comment: CommentType) => {
          return (
            <div key={comment?.id} className="">
              <div className="flex items-start gap-2">
                <div>
                  <Image
                    src={
                      comment?.author?.profile?.image || "/assets/mythoria.png"
                    }
                    alt={comment?.author?.name}
                    width={80}
                    height={80}
                    className="w-14 h-14 rounded-full object-cover border border-mystic-blue-900"
                  />
                </div>
                <div className="w-full flex-1">
                  <div className="flex items-center gap-2 justify-between w-full">
                    <p className="text-mystic-500 text-xs flex items-center">
                      {comment?.author?.name}{" "}
                      <Dot className="stroke-mystic-500 -mt-0.5" />
                      {timeAgo(comment.createdAt)}
                    </p>

                    {(comment?.author?.id === user?.id ||
                      storyAuthorId === user?.id) && (
                      <button
                        onClick={() =>
                          handleDeleteComment(comment?.storyId, comment?.id)
                        }
                        className="cursor-pointer p-2 rounded-full group hover:bg-rose-900"
                      >
                        <Trash2Icon className="size-4 stroke-rose-600 group-hover:stroke-rose-400" />
                      </button>
                    )}
                  </div>
                  <p className="text-neutral-200 text- sm:text-sm">
                    {comment?.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {comments?.length < totalCount && (
          <button
            onClick={loadMoreFn}
            className="text-mystic-500 mt-6 cursor-pointer"
          >
            Load More...
          </button>
        )}
      </div>
    )
  );
};

export default Comments;
