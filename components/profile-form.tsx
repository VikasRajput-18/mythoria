import React, { useEffect, useState } from "react";
import CustomInput from "./custom-input";
import CustomTextArea from "./custom-textarea";
import { useUserContext } from "../context/user-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { updateProfile } from "../api-service/api";
import { uploadImageToCloudinary } from "../lib/upload-to-cloudinary";
import Spinner from "./spinner";
import Overlay from "./overlay";

export interface ProfileFormTypes {
  fullName: string;
  email: string;
  bio: string;
  profilePic: string;
  files?: File[];
}

const ProfileForm = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      setIsSubmitting(false);
      toast.error(message);
    },
  });

  const [formData, setFormData] = useState<ProfileFormTypes>({
    fullName: "",
    email: "",
    bio: "",
    profilePic: "",
    files: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePic: reader.result as string,
        files: [file],
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
        profilePic: user?.profile?.image ?? "",
        bio: user?.profile?.bio ?? "",
      }));
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let profileUrl = formData.profilePic;
      if (formData.files && formData.files.length > 0) {
        const file = formData.files[0];
        const cloudinaryRes = await uploadImageToCloudinary(file);
        profileUrl = cloudinaryRes.secure_url;
      }
      updateProfileMutation.mutate({ ...formData, profilePic: profileUrl });
    } catch (err) {
      toast.error("Failed to upload image");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      {isSubmitting ? <Overlay /> : null}
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <p className="text-xl font-semibold text-mystic-500">Profile Photo</p>
        <label className="block w-[200px] h-[200px] md:w-[300px] md:h-[300px] border bg-mystic-800 border-mystic-blue-900 p-1 rounded-full overflow-hidden cursor-pointer hover:opacity-85">
          <img
            src={formData.profilePic || "/assets/mythoria.png"}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-full"
          />
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>

        <CustomInput
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          label="Full Name"
          placeholder="Enter Full Name"
        />
        <CustomInput
          value={formData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          placeholder="Enter Email"
        />

        <CustomTextArea
          value={formData.bio}
          onChange={handleChange}
          name="bio"
          label="Bio"
          rows={6}
          inputClassName="resize-none"
          placeholder="Enter about yourself!"
        />

        <div className="flex items-center justify-end mt-10">
          <button
            disabled={isSubmitting}
            type="submit"
            className="cursor-pointer min-w-[120px] text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-8 flex items-center justify-center"
          >
            {isSubmitting ? <Spinner /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
