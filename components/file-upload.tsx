import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";
import { cn } from "../lib/utils";

export const FileUpload = ({
  onChange,
  value,
  headerText = "Upload Thumbnail",
  uploadProfile,
}: {
  onChange?: (files: File[]) => void;
  value?: string;
  headerText?: string;
  uploadProfile?: boolean;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const imageFile = newFiles[0];
    if (!imageFile || !imageFile.type.startsWith("image/")) return;
    setFile(imageFile);
    onChange?.([imageFile]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => console.log(error),
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-4 md:p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="flex flex-col items-center justify-center">
          {!uploadProfile && (
            <>
              <p className="relative z-20 font-bold text-neutral-300 text-base">
                {headerText}
              </p>
              <p className="relative z-20 text-neutral-400 text-base mt-2 text-center">
                Drag and drop or click to upload a single image
              </p>
            </>
          )}

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file || value ? (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  "relative z-40 bg-neutral-900 flex flex-col items-start md:h-auto p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
                )}
              >
                <Image
                  src={value ? value : file ? URL.createObjectURL(file) : ""}
                  alt="Uploaded preview"
                  width={300}
                  height={250}
                  className="w-full max-h-60 object-contain rounded-md mb-4"
                />
                {file && (
                  <>
                    <div className="flex justify-between w-full items-center gap-4">
                      <p className="text-base text-mystic-500 truncate max-w-[200px]">
                        {file?.name}
                      </p>
                      <p className="rounded-lg px-2 py-1 text-sm bg-mystic-800 text-mystic-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex justify-between w-full mt-2 text-sm text-mystic-500">
                      <p className=" bg-mystic-800 px-1 py-0.5 rounded">
                        {file.type}
                      </p>
                      <p>
                        Modified:{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                layoutId="file-upload"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
              >
                {isDragActive ? (
                  <p className="text-neutral-600 text-center">
                    Drop it
                    <Upload className="h-4 w-4 text-neutral-400 mt-1" />
                  </p>
                ) : (
                  <Upload className="h-4 w-4 text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex  bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-neutral-950"
                  : "bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
