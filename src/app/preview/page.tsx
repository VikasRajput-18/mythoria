"use client";
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

export default function MyBook() {
  return (
    <div className="bg-mystic-800 flex justify-center items-center overflow-hidden h-screen w-full p-4">
      <div className="w-full max-w-[900px] aspect-[3/2]">
        <HTMLFlipBook
          width={300}
          height={500}
          size="stretch"
          minWidth={315}
          maxWidth={800}
          minHeight={400}
          maxHeight={650}
          showCover
          drawShadow
          maxShadowOpacity={0.5}
          {...({} as any)}
          mobileScrollSupport
        //   disableFlipByClick
          swipeDistance={10}
        >
          {/* Cover */}
          <div className="page font-josefin bg-yellow-100 border border-yellow-300 shadow-xl rounded-md">
            <div className="page-content h-full flex flex-col justify-center items-center p-6">
              <h1 className="text-2xl font-bold text-mystic-800">
                📘 Mythoria
              </h1>
              <p className="text-brown-700 mt-4 text-center">
                An ancient world of magical tales
              </p>
            </div>
          </div>

          {/* Page 1 */}
          <div className="page bg-yellow-50 border border-yellow-200 shadow-inner rounded-md">
            <div className="page-content h-full p-6 text-mystic-800 leading-relaxed text-[15px] overflow-y-auto">
              <h2 className="text-lg font-bold text-mystic-700 mb-2">
                Chapter 1: The Awakening
              </h2>
              In the twilight of the forgotten lands, a child of fire was
              born...
            </div>
          </div>

          {/* Page 2 */}
          <div className="page bg-yellow-50 border border-yellow-200 shadow-inner rounded-md">
            <div className="page-content h-full p-6 text-mystic-800 leading-relaxed text-[15px] overflow-y-auto">
              <h2 className="text-lg font-bold text-mystic-700 mb-2">
                Chapter 2: The Forest of Whispers
              </h2>
              Trees spoke in echoes, leaves told secrets of the past... [Repeat
              content]
            </div>
          </div>

          {/* Page 3 */}
          <div className="page bg-yellow-50 border border-yellow-200 shadow-inner rounded-md">
            <div className="page-content h-full p-6 text-mystic-800 leading-relaxed text-[15px] overflow-y-auto">
              <h2 className="text-lg font-bold text-mystic-700 mb-2">
                Chapter 3: The Moonblade
              </h2>
              Forged in silence, the blade shimmered under moonlight, awaiting
              its destiny...
            </div>
          </div>

          {/* Back Cover */}
          <div className="page bg-yellow-200 border border-yellow-300 shadow-lg rounded-md">
            <div className="page-content h-full flex justify-center items-center text-mystic-800">
              <p className="text-center text-sm">
                ~ The End ~<br />
                Thank you for reading Mythoria
              </p>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
}
