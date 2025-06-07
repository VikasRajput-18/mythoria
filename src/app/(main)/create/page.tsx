"use client";

import ClientOnlyRTE from "@/components/client-only-RTE";
import CustomInput from "@/components/custom-input";
import CustomSelect from "@/components/custom-select";
import CustomTags from "@/components/custom-tags";
import CustomTextArea from "@/components/custom-textarea";
import CustomToggle from "@/components/custom-toggle";
import { FileUpload } from "@/components/file-upload";
import { useAppContext } from "@/context/app-context";
import { FormTypes } from "@/types";
import { Eye, Menu, X } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

const Create = () => {
  const [formData, setFormData] = useState<FormTypes>({
    title: "",
    description: "",
    genre: "",
    content: "",
    tags: [],
    audience: "",
    status: "draft",
    thumbnail: "",
  });
  const { toggleSidebar, openSidebar } = useAppContext();
  const [tag, setTag] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    const file = files[0]; // Only take the first file
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        thumbnail: reader.result as string,
      }));
      setFiles([file]);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (formData.tags.length > 6) return;
    if (e.key === "Enter" && tag.trim() !== "") {
      e.preventDefault();
      const newTag = { id: crypto.randomUUID(), value: tag.trim() };
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setTag("");
    }
  };

  const handleRemoveTag = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== id),
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("storyData", JSON.stringify(formData));
  };

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex gap-3  w-full justify-between flex-wrap-reverse">
        <div className="">
          <Menu
            className="stroke-white md:hidden flex-inline cursor-pointer"
            onClick={toggleSidebar}
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            Create a new story
          </h1>
        </div>
        <CustomToggle
          label="Status"
          value={formData.status}
          onChange={(newStatus: "draft" | "publish") =>
            setFormData((prev) => ({ ...prev, status: newStatus }))
          }
        />
      </div>
      <p className="sm:text-lg max-w-2xl text-mystic-500">
        Your story needs a title and genre. You can add more details later.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <CustomInput
          value={formData.title}
          onChange={handleChange}
          name="title"
          label="Story Title"
          placeholder="Enter your story title..."
        />
        <CustomTextArea
          value={formData.description}
          onChange={handleChange}
          label="Short Description"
          name="description"
          placeholder="Write a short description about your story..."
        />

        <ClientOnlyRTE value={formData.content} onChange={handleEditorChange} />
        <div>
          <label htmlFor="" className="text-neutral-300 text-lg font-semibold">
            Thumbnail
          </label>
          <div className="w-full max-w-4xl  border border-dashed bg-white dark:bg-mystic-700 border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
        <div className="flex items-start gap-4 flex-wrap">
          <div className="max-w-lg w-full">
            <CustomInput
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleAddTag}
              name="tags"
              label="Tags"
              placeholder="Press Enter to add tag..."
              maxLength={32}
            />
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <CustomTags
                    key={tag.id}
                    {...tag}
                    handleRemoveTag={handleRemoveTag}
                  />
                ))}
              </div>
            )}
          </div>
          <CustomInput
            value={formData.genre}
            onChange={handleChange}
            name="genre"
            label="Genre"
            placeholder="e.g., Fantasy, Adventure, Sci-Fi"
            className="flex-1"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <CustomSelect
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            label="Audience"
            className=""
          >
            <option value="">Select Audience</option>
            <option value="general">General</option>
            <option value="teen">Teen</option>
            <option value="mature">Mature</option>
          </CustomSelect>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Link
            href={"/preview"}
            className="text-mystic-800 no-underline hover:opacity-85 transition-all duration-200 ease-in-out hover:scale-95 font-bold rounded-lg px-6 py-3 bg-white cursor-pointer mt-8 "
          >
            Preview
          </Link>
          <button
            type="submit"
            className="text-white hover:opacity-85 transition-all duration-200 ease-in-out hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 cursor-pointer mt-8"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
