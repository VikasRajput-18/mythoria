"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeStory } from "../api-service/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function LikeButton({
  storyId,
  initialLiked,
  initialCount,
}: {
  storyId: number;
  initialLiked: boolean;
  initialCount: number;
}) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount || 0);

  const likeStoryMutation = useMutation({
    mutationFn: likeStory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["stories", "singleStory"] });
      setLiked(data.liked);
      setCount((prev) => (data.liked ? prev + 1 : prev - 1));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

  const toggleLike = async () => {
    likeStoryMutation.mutate(storyId);
  };

  return (
    <button
      onClick={toggleLike}
      disabled={likeStoryMutation.isPending}
      className="group cursor-pointer text-[15px] sm:text-base flex items-center gap-1"
    >
      <Heart
        className={`group-hover:stroke-rose-500  ${
          liked ? "stroke-rose-500 fill-rose-500" : "stroke-mystic-500"
        }`}
      />
      <p
        className={`!text-base group-hover:text-rose-500 ${
          liked ? "text-rose-500" : "text-mystic-500"
        }`}
      >
        {count}
      </p>
    </button>
  );
}
