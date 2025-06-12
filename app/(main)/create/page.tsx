"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { BookOpenText, Info, Menu, ScrollText } from "lucide-react";
import Link from "next/link";
import ClientOnlyRTE from "../../../components/client-only-RTE";
import CustomInput from "../../../components/custom-input";
import CustomSelect from "../../../components/custom-select";
import CustomTags from "../../../components/custom-tags";
import CustomTextArea from "../../../components/custom-textarea";
import CustomToggle from "../../../components/custom-toggle";
import { FileUpload } from "../../../components/file-upload";
import { useAppContext } from "../../../context/app-context";

const Create = () => {
  const { toggleSidebar, formData, setFormData, tag, setTag, files, setFiles } =
    useAppContext();

  const [status, setStatus] = useState<"publish" | "draft">("publish");
  const [type, setType] = useState<"book" | "other">("other");

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
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
    // localStorage.setItem("storyData", JSON.stringify(formData));
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
            Create a new story
          </h1>
        </div>
        <CustomToggle
          value={status}
          onChange={setStatus}
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
          value={type}
          onChange={setType}
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
          <p className="text-neutral-300">
            <span className="inline-flex items-center gap-1 ">
              <BookOpenText className="w-4 h-4" />
              <b>Book</b> will format your story in a classic **book-style
              page-flip** layout.
            </span>
            <br />
            <span className="inline-flex items-center gap-1 ">
              <ScrollText className="w-4 h-4" />
              <b>Scroll</b>
              lets users read your story in a **modern vertical scroll** format.
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

        <ClientOnlyRTE value={formData.content} onChange={handleEditorChange} />

        <div>
          <label className="text-neutral-300 text-lg font-semibold">
            Thumbnail
          </label>
          <div className="w-full max-w-4xl border border-dashed  bg-mystic-800 border-neutral-800 rounded-lg">
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
            href={"/preview"}
            className="text-mystic-800 no-underline hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-white mt-8"
          >
            Preview
          </Link>
          <button
            type="submit"
            className="text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-8"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
