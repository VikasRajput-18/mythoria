"use client";

import ClientOnlyRTE from "@/components/client-only-RTE";
import CustomInput from "@/components/custom-input";
import { FileUpload } from "@/components/file-upload";
import { useState } from "react";

const Create = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="flex-1 px-8 py-16 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Create a new story
      </h1>
      <p className="text-lg  max-w-2xl text-mystic-500">
        Your story needs a title and genre. You can add more details later.
      </p>

      <form className="mt-8 space-y-4">
        <CustomInput
          value=""
          label="Story Title"
          placeholder="Enter your story title..."
        />

        <CustomInput
          value=""
          label="Genre"
          placeholder="e.g., Fantasy, Adventure, Sci-Fi"
        />

        <ClientOnlyRTE />
        <div>
          <label htmlFor="" className="text-neutral-300 text-lg font-semibold">
            Thumbnail
          </label>
          <div className="w-full max-w-4xl  border border-dashed bg-white dark:bg-mystic-700 border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
