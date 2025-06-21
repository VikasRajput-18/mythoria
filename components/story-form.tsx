"use client";

import { BookOpenText, Info, Menu, ScrollText, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, KeyboardEvent, useEffect } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/app-context";
import { uploadImageToCloudinary } from "../lib/upload-to-cloudinary";
import { FormTypes, StoryType } from "../types";
import ClientOnlyRTE from "./client-only-RTE";
import CustomInput from "./custom-input";
import CustomSelect from "./custom-select";
import CustomTags from "./custom-tags";
import CustomTextArea from "./custom-textarea";
import CustomToggle from "./custom-toggle";
import { FileUpload } from "./file-upload";
import Spinner from "./spinner";

interface StoryFormProps {
  mode: "create" | "edit";
  onSubmit: (data: FormTypes) => void;
  initialData?: StoryType;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoryForm = ({
  mode,
  onSubmit,
  initialData,
  isSubmitting,
  setIsSubmitting,
}: StoryFormProps) => {
  const { toggleSidebar, formData, setFormData, tag, setTag } = useAppContext();

  // ✅ Initialize formData for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        genre: initialData.genre || "",
        content: initialData.content || "",
        tags:
          initialData.tags?.map((tag) => ({
            id: String(tag.id),
            name: tag.name,
          })) || [],
        audience: initialData.audience?.toLowerCase() || "",
        status: initialData?.published ? "publish" : "draft",
        type: (initialData.type?.toLowerCase() as "book" | "other") || "other",
        pages: initialData.pages || [], // only if you have pages in response
        thumbnail: initialData.coverImage || "",
        files: [],
      });
    }
  }, [mode, initialData, setFormData]);

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        thumbnail: reader.result as string,
        files: [file],
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.filter((p) => p.id !== id),
    }));
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (formData.tags.length >= 6) return;
    if (e.key === "Enter" && tag.trim() !== "") {
      e.preventDefault();
      const newTag = { id: String(Date.now()), name: tag.trim() };
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

  const handlePageChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.id === id ? { ...page, content: value } : page
      ),
    }));
  };

  const addNewPage = () => {
    setFormData((prev) => ({
      ...prev,
      pages: [...prev.pages, { id: String(Date.now()), content: "" }],
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleStatusChange = (value: "publish" | "draft") => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleTypeChange = (value: "book" | "other") => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let thumbnailUrl = formData.thumbnail;

      if (formData.files && formData.files.length > 0) {
        const file = formData.files[0];
        const cloudinaryRes = await uploadImageToCloudinary(file);
        thumbnailUrl = cloudinaryRes.secure_url;
      }

      const { files, ...storyData } = formData;

      onSubmit({
        ...storyData,
        thumbnail: thumbnailUrl,
      });
    } catch (err) {
      toast.error("Failed to upload image");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex gap-3 w-full justify-between flex-wrap-reverse">
        <div>
          <Menu
            className="stroke-white md:hidden cursor-pointer"
            onClick={toggleSidebar}
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            {mode === "create" ? "Create a new story" : "Edit story"}
          </h1>
        </div>
        <CustomToggle
          value={formData.status}
          onChange={handleStatusChange}
          options={[
            {
              value: "publish",
              label: (
                <div className="flex items-center gap-1">
                  <span>Publish</span>
                </div>
              ),
              activeClassName: "bg-green-600 text-white",
            },
            {
              value: "draft",
              label: (
                <div className="flex items-center gap-1">
                  <span>Draft</span>
                </div>
              ),
              activeClassName: "bg-rose-600 text-white",
            },
          ]}
        />
      </div>

      <p className="sm:text-lg max-w-2xl text-mystic-500">
        Your story needs a title and genre. You can add more details later.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <CustomToggle
          value={formData.type}
          onChange={handleTypeChange}
          options={[
            {
              value: "book",
              label: (
                <div className="flex items-center gap-1">
                  <BookOpenText />
                </div>
              ),
              activeClassName: "bg-green-600 text-white",
            },
            {
              value: "other",
              label: (
                <div className="flex items-center gap-1">
                  <ScrollText />
                </div>
              ),
              activeClassName: "bg-rose-600 text-white",
            },
          ]}
        />

        <div className="flex items-start gap-2 bg-mystic-900 p-3 rounded-lg border border-mystic-600 text-sm text-white">
          <Info className="w-4 h-4 mt-0.5 text-mystic-500" />
          <p className="text-neutral-300 flex-1">
            <span className="inline-flex items-start gap-1 ">
              <BookOpenText className="w-4 h-4" />
              <b>Book</b> will format your story in a classic book-style
              page-flip layout.
            </span>
            <br />
            <span className="inline-flex items-center gap-1 ">
              <ScrollText className="w-4 h-4" />
              <b>Scroll</b> lets users read your story in a modern vertical
              scroll format.
            </span>
          </p>
        </div>

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
          placeholder="Write a short description..."
        />

        {formData.type === "book" ? (
          <div className="space-y-6 w-full">
            {formData.pages.map((page, index) => (
              <div key={page.id} className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">Page {index + 1}</p>
                  <Trash2
                    className="stroke-red-500 cursor-pointer"
                    onClick={() => handleDelete(page.id)}
                  />
                </div>
                <ClientOnlyRTE
                  value={page.content}
                  onChange={(val) => handlePageChange(page.id, val)}
                />
              </div>
            ))}
            <button
              onClick={addNewPage}
              type="button"
              className="bg-mystic-700 hover:bg-mystic-600 text-white py-2 px-4 rounded-lg mt-2 cursor-pointer"
            >
              + Add New Page
            </button>
          </div>
        ) : (
          <ClientOnlyRTE
            value={formData.content}
            onChange={handleEditorChange}
          />
        )}

        <div>
          <label className="text-neutral-300 text-lg font-semibold">
            Thumbnail
          </label>
          <div className="w-full max-w-4xl border border-dashed bg-mystic-800 border-neutral-800 rounded-lg">
            <FileUpload
              onChange={handleFileUpload}
              value={formData.thumbnail}
            />
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
                    value={tag.name}
                    id={tag.id}
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
            placeholder="e.g., Fantasy, Adventure"
            className="flex-1"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <CustomSelect
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            label="Audience"
          >
            <option value="">Select Audience</option>
            <option value="general">General</option>
            <option value="teen">Teen</option>
            <option value="mature">Mature</option>
          </CustomSelect>
        </div>

        <div className="flex items-center gap-4 justify-end">
          <Link
            href={formData.type === "book" ? "/book-preview" : "/preview"}
            className="text-mystic-800 no-underline hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-white mt-8"
          >
            Preview
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className="cursor-pointer min-w-[120px] text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-8 flex items-center justify-center"
          >
            {isSubmitting ? (
              <Spinner />
            ) : mode === "create" ? (
              "Create"
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryForm;
