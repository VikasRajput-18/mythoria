import CustomInput from "@/components/custom-input";
import React from "react";

const Create = () => {
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
      </form>
    </div>
  );
};

export default Create;
