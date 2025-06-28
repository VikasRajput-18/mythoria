"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import HTMLFlipBook from "react-pageflip";
import { useAppContext } from "../../context/app-context";

const BookPreview = () => {
  const { formData: story } = useAppContext();
  const router = useRouter();

  return (
    <section className="bg-mystic-800 w-full p-4 sm:p-8 h-screen overflow-hidden flex justify-center items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
            aria-label="Story Info"
          >
            <Info className="w-5 h-5 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs text-sm z-50 bg-mystic-700 p-4 rounded-xl">
          <h3 className="text-base font-semibold mb-2">Story Tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Swipe or click to flip pages.</li>
            <li>Use full screen for a better experience.</li>
            <li>Scroll if content overflows.</li>
          </ul>
        </PopoverContent>
      </Popover>

      <button
        onClick={() => router.back()}
        className="cursor-pointer absolute left-4 top-4 p-2 rounded-full bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
        aria-label="Story Info"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <HTMLFlipBook
        width={370}
        height={500}
        maxShadowOpacity={0.5}
        showCover={true}
        drawShadow={true}
        size="stretch" // ← better for responsiveness than "fixed"
        minWidth={300} // optional: define min/max
        maxWidth={500}
        minHeight={500}
        maxHeight={633}
        mobileScrollSupport={true}
        className="demo-book"
        {...({} as any)}
      >
        {/* Cover Page */}
        <div className="p-3 md:p-8 overflow-hidden flex flex-col justify-center items-center bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 !text-[#5b4636] font-josefin">
            {story.title}
          </h2>
          <p className="text-[#7a6248] mb-4 font-josefin text-[15px] sm:text-base">
            {story?.description}
          </p>
          {story?.thumbnail && (
            <img
              src={story?.thumbnail}
              alt="Cover"
              className="aspect-auto max-h-[200px] sm:max-h-[300px] w-full object-contain rounded-md "
            />
          )}
        </div>
        {story?.pages?.map((page: any) => (
          <div
            key={page?.id}
            className="relative p-3 md:p-8 bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin !text-[#5b4636] prose max-w-none leading-relaxed overflow-auto"
          >
            {/* Page HTML content */}
            <div dangerouslySetInnerHTML={{ __html: page?.content }} />
          </div>
        ))}
      </HTMLFlipBook>
    </section>
  );
};

export default BookPreview;
