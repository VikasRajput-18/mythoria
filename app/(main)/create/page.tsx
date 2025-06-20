"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addStory } from "../../../api-service/api";
import StoryForm from "../../../components/story-form";
import { useAppContext } from "../../../context/app-context";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/user-context";

const Create = () => {
  const queryClient = useQueryClient();
  const { setFormData, setTag } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUserContext();
  const router = useRouter();

  const createStory = useMutation({
    mutationFn: addStory,
    onSuccess: (data) => {
      toast.success(data.message);
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
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      setIsSubmitting(false);
      toast.error(message);
    },
  });

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, []);

  return (
    <StoryForm
      mode="create"
      onSubmit={(data) => createStory.mutate(data)}
      setIsSubmitting={setIsSubmitting}
      isSubmitting={isSubmitting}
    />
  );
};

export default Create;
