"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import StoryForm from "../../../../components/story-form";
import { getStoryById, updateStory } from "../../../../api-service/api";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/app-context";
import { useUserContext } from "../../../../context/user-context";

export default function Edit() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setFormData, setTag } = useAppContext();
  const { user } = useUserContext();

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", storyId],
    queryFn: () => getStoryById(storyId),
  });

  const update = useMutation({
    mutationFn: updateStory,
    onSuccess: () => {
      toast.success("Updated!");
      setFormData({
        title: "",
        description: "",
        content: "",
        thumbnail: "",
        files: [],
        pages: [],
        tags: [],
        type: "other",
        genre: "",
        audience: "",
        status: "draft",
      });
      setTag(""); // ✅ Also reset tag input
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["stories", "myStories"] });
      router.push("/");
    },
    onError: () => {
      setIsSubmitting(false);
      toast.error("Update failed");
    },
  });

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, []);

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
