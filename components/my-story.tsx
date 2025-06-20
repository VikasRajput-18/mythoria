"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bookmark,
  Dot,
  Loader2,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  addComment,
  getCommentsByStoryId,
  getStoryById,
} from "../api-service/api";
import { CommentType, Tag } from "../types";
import AuthorDetails from "./author-details";
import CustomInput from "./custom-input";
import CustomTags from "./custom-tags";
import LikeButton from "./like-button";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import Spinner from "./spinner";
import { timeAgo } from "../lib/upload-to-cloudinary";

const MyStory = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  // ✅ tell TypeScript: I know it's a string
  const storyId = id as string;

  if (!storyId) return null;

  const { data: story, isLoading } = useQuery({
    queryKey: ["singleStory", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });

  const {
    data: commentsList,
    refetch: refetchComments,
    isFetching: isFetchingComments,
  } = useQuery({
    queryKey: ["comments", storyId],
    queryFn: () => getCommentsByStoryId(storyId),
    enabled: !!storyId, // run on demand only
    placeholderData: (prev) => prev,
  });

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["singleStory", storyId] });
      queryClient.invalidateQueries({ queryKey: ["comments", storyId] });
      setCommentText("");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const handleAddComment = () => {
    if (!commentText) return toast.warning("Comment cannot be empty");
    addCommentMutation.mutate({ storyId, commentText });
  };

  const comments = commentsList?.comments || [];

  return (
    <section className="bg-mystic-800 w-full min-h-screen p-4 sm:p-8">
      {/* ✅ Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-20 w-20 animate-spin text-mystic-500" />
        </div>
      ) : (
        <div className="lg:flex items-start gap-x-8 space-y-8">
          <div className="flex-1 w-full">
            <div className="flex items-start gap-3">
              <Link href={"/"} className="mt-0.5">
                <ArrowLeft className="stroke-white" />
              </Link>
              <h2 className="text-base sm:text-xl md:text-2xl my-0 text-neutral-200">
                {story?.title}
              </h2>
            </div>
            <p className="text-neutral-400 text-[15px] sm:text-base">
              {story?.description}
            </p>

            {story?.tags?.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2 ">
                {story?.tags?.map((tag: Tag) => (
                  <CustomTags
                    key={tag.id}
                    id={tag.id}
                    value={tag.name}
                    hideIcon
                  />
                ))}
              </div>
            ) : null}

            <div className="my-7">
              {story?.coverImage ? (
                <Image
                  width={350}
                  height={300}
                  className="w-full max-w-2xl h-full max-h-[400px] object-contain bg-mystic-700 rounded-md"
                  src={story?.coverImage}
                  alt={story.title}
                />
              ) : null}
            </div>

            {/* Rich Text Content */}
            {story?.content && (
              <div
                className="prose prose-sm prose-invert max-w-none text-neutral-100"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            )}

            <div className="mt-8 w-full">
              <div className="flex items-stretch gap-2 w-full">
                <CustomInput
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add Comment"
                  className="w-full max-w-full"
                />
                <button
                  onClick={handleAddComment}
                  disabled={addCommentMutation.isPending}
                  className="bg-mystic-blue-900 px-8 py-2 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out cursor-pointer"
                >
                  {addCommentMutation.isPending ? (
                    <Spinner />
                  ) : (
                    <Send className="stroke-white" />
                  )}
                </button>
              </div>
              <div className="flex items-center mt-4 justify-between">
                <LikeButton
                  storyId={story?.id}
                  initialLiked={story?.likedByMe}
                  initialCount={story?.likeCount}
                />

                <button className="cursor-pointer text-[15px] sm:text-base flex items-center gap-1 group">
                  <MessageCircle className="stroke-mystic-500 group-hover:stroke-white" />
                  <p className="text-mystic-500 group-hover:text-white">
                    {story?.commentCount}
                  </p>
                </button>
                <button className="cursor-pointer text-[15px] sm:text-base flex items-center gap-1">
                  <Share2 className="stroke-mystic-500 hover:stroke-blue-500" />
                  {/* <p className="text-mystic-500 ">0</p> */}
                </button>
                <button className="cursor-pointer text-[15px] sm:text-base flex items-center gap-1">
                  <Bookmark className="stroke-mystic-500 hover:stroke-orange-400" />
                  {/* <p className="text-mystic-500 ">0</p> */}
                </button>
              </div>

              {isFetchingComments ? (
                <div className="flex items-center justify-center mt-4">
                  <Spinner />
                </div>
              ) : (
                comments?.length > 0 && (
                  <div className="bg-mystic-700 p-4 mt-4 rounded-lg space-y-2">
                    <p className="text-white text-lg md:text-xl font-semibold border-b border-mystic-600 pb-2 mb-4">
                      Comments ({story?.commentCount})
                    </p>
                    {comments?.map((comment: CommentType) => {
                      return (
                        <div key={comment?.id} className="">
                          <div className="flex items-center gap-2">
                            <div>
                              <Image
                                src={"/assets/mythoria.png"}
                                alt={comment?.author?.name}
                                width={80}
                                height={80}
                                className="w-14 h-14 rounded-full object-cover border border-mystic-blue-900"
                              />
                            </div>
                            <div>
                              <p className="text-mystic-500 text-xs flex items-center">
                                {comment?.author?.name}{" "}
                                <Dot className="stroke-mystic-500" />
                                {timeAgo(comment.createdAt)}
                              </p>
                              <p className="text-neutral-200">
                                {comment?.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          </div>
          <AuthorDetails author={story?.author} />
        </div>
      )}
    </section>
  );
};

export default MyStory;
