"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import StoryForm from "../../../../components/story-form";
import { getStoryById, updateStory } from "../../../../api-service/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Edit() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStoryById(storyId),
  });

  const update = useMutation({
    mutationFn: updateStory,
    onSuccess: () => {
      toast.success("Updated!");
      setIsSubmitting(false);
      router.push("/");
    },
    onError: () => {
      setIsSubmitting(false);
      toast.error("Update failed");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-20 w-20 animate-spin text-mystic-500" />
      </div>
    );

  return (
    <StoryForm
      mode="edit"
      initialData={story}
      onSubmit={(data) => update.mutate({ id: storyId, ...data })}
      setIsSubmitting={setIsSubmitting}
      isSubmitting={isSubmitting}
    />
  );
}
