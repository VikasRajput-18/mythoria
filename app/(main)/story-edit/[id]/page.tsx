"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import StoryForm from "../../../../components/story-form";
import { getStoryById, updateStory } from "../../../../api-service/api";

export default function Edit() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStoryById(storyId),
  });

  const update = useMutation({
    mutationFn: updateStory,
    onSuccess: () => {
      toast.success("Updated!");
      router.push("/");
    },
    onError: () => toast.error("Update failed"),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <StoryForm
      mode="edit"
      initialData={story}
      onSubmit={(data) => update.mutate({ id: storyId, ...data })}
    />
  );
}
