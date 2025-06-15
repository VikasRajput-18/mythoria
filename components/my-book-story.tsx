"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getStoryById } from "../api-service/api";
import HTMLFlipBook from "react-pageflip";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { title } from "process";

type Page = {
  id: number;
  content: string;
  pageNumber: number;
};

const MyBookStory = () => {
  const { id } = useParams();
  const flipBookRef = useRef<any>(null);
  const storyId = id as string;

  const [usePortrait, setUsePortrait] = useState(false); // spread = pair of pages
  const [currentSpread, setCurrentSpread] = useState(0); // spread = pair of pages
  const [totalSpreads, setTotalSpreads] = useState(0);
  const [goToInput, setGoToInput] = useState("");

  const { data: story, isLoading } = useQuery({
    queryKey: ["singleStory", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });

  // ✅ Dynamically control usePortrait based on screen width
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setUsePortrait(true);
      } else {
        setUsePortrait(false);
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleFlip = () => {
    if (flipBookRef.current) {
      const page = flipBookRef.current.pageFlip().getCurrentPageIndex();
      const spread = Math.floor(page / 2);
      setCurrentSpread(spread);
    }
  };

  const handleInit = () => {
    if (flipBookRef.current) {
      const pageCount = flipBookRef.current.pageFlip().getPageCount();
      const spreadCount = Math.ceil(pageCount / 2);
      setTotalSpreads(spreadCount);
    }
  };

  const goNext = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const goPrev = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleGoTo = () => {
    const num = parseInt(goToInput);
    if (!isNaN(num) && num >= 1 && num <= totalSpreads) {
      // Special case: cover is page 0
      const targetPage = num === 1 ? 1 : (num - 1) * 2 - 1;
      flipBookRef.current.pageFlip().flip(targetPage);
    }
    setGoToInput("");
  };

  if (!storyId) return null;

  return (
    <section className="bg-mystic-800 w-full min-h-screen p-4 sm:p-8 h-screen overflow-hidden flex justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-20 w-20 animate-spin text-gray-600" />
        </div>
      ) : (
        <div className="flex w-full sm:w-max flex-col space-y-4">
          <HTMLFlipBook
            startPage={0}
            // width={400}
            // height={600}
            width={400}
            height={600}
            size="fixed"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            drawShadow={true}
            flippingTime={800}
            usePortrait={usePortrait}
            startZIndex={1}
            autoSize={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            //   disableFlipByClick={false}
            //   clickEventForward={true}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            ref={flipBookRef}
            style={{}}
            onFlip={handleFlip}
            onInit={handleInit}
            onChangeOrientation={() => {}}
            onChangeState={() => {}}
            className="book-shadow"
            disableFlipByClick={true}
            clickEventForward={false}
          >
            {/* Cover Page */}
            <div className="p-8 overflow-hidden flex flex-col justify-center items-center bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin">
              <h1 className="text-4xl font-bold mb-4 text-[#5b4636] font-josefin">
                {story.title}
              </h1>
              <p className="text-[#7a6248] mb-4 font-josefin">
                {story.description}
              </p>
              <img
                src={story.coverImage}
                alt="Cover"
                className="aspect-auto max-h-[300px] w-full object-contain rounded "
              />
            </div>

            {/* Content Pages */}
            {story.pages.map((page: Page) => (
              <div
                key={page.id}
                className="p-8 bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin text-[#5b4636] prose max-w-none leading-relaxed font-josefin overflow-hidden"
                dangerouslySetInnerHTML={{ __html: page.content }}
              ></div>
            ))}

            {/* About Author Page */}
            <div className="p-8 bg-[#fdf6e3] border w-full h-full font-josefin text-mystic-700">
              <h2 className="text-xl font-bold mb-4 text-mystic-700">
                About the Author
              </h2>
              <p className="mb-2">
                <b>Name: </b>
                {story.author.name}
              </p>
              <p className="mb-2">
                <b>Email: </b> {story.author.email}
              </p>
              <p>
                <b>Story Title: </b> {story.title}
              </p>
            </div>
          </HTMLFlipBook>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={goPrev}
              disabled={currentSpread === 0}
              className="px-4 py-2 bg-mystic-700 text-white rounded disabled:opacity-50"
            >
              <ArrowLeft className="stroke-white" />
            </button>

            <span className="text-mystic-500">
              Page {currentSpread + 1} of {totalSpreads}
            </span>

            <button
              onClick={goNext}
              disabled={currentSpread >= totalSpreads - 1}
              className="px-4 py-2 bg-mystic-700 text-white rounded disabled:opacity-50"
            >
              <ArrowRight className="stroke-white" />
            </button>

            <input
              type="number"
              placeholder="Go to spread..."
              value={goToInput}
              onChange={(e) => setGoToInput(e.target.value)}
              className="px-2 py-1 border rounded text-white max-w-[80px]"
            />
            <button
              onClick={handleGoTo}
              className="px-4 py-2 bg-mystic-700 text-white rounded"
            >
              Go
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBookStory;
