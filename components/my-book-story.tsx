// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Info, Loader2, SquareMenu } from "lucide-react";
// import { useParams } from "next/navigation";
// import HTMLFlipBook from "react-pageflip";
// import { getStoryById } from "../api-service/api";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@radix-ui/react-popover";
// import LikeButton from "./like-button";
// import { useState } from "react";

// type Page = {
//   id: number;
//   content: string;
//   pageNumber: number;
// };

// const MyBookStory = () => {
//   const { id } = useParams();
//   const [showMenu, setShowMenu] = useState(false);
//   const storyId = id as string;

//   if (!storyId) return null;
//   const { data: story, isLoading } = useQuery({
//     queryKey: ["singleStory", storyId],
//     queryFn: () => getStoryById(storyId),
//     enabled: !!storyId,
//   });

//   return (
//     <section className="bg-mystic-800 w-full p-4 sm:p-8 h-screen overflow-hidden flex justify-center items-center book__story">
//       <Popover>
//         <PopoverTrigger asChild>
//           <button
//             className="absolute top-4 right-4 p-2 rounded-full bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
//             aria-label="Story Info"
//           >
//             <Info className="w-5 h-5 text-white" />
//           </button>
//         </PopoverTrigger>
//         <PopoverContent className="max-w-xs text-sm z-50 bg-mystic-700 p-4 rounded-xl">
//           <h3 className="text-base font-semibold mb-2">Story Tips:</h3>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Swipe or click to flip pages.</li>
//             <li>Use full screen for a better experience.</li>
//             <li>Scroll if content overflows.</li>
//           </ul>
//         </PopoverContent>
//       </Popover>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-full">
//           <Loader2 className="h-20 w-20 animate-spin text-gray-600" />
//         </div>
//       ) : (
//         <>
//           <div className="absolute top-4 left-4 z-10">
//             <div className="relative">
//               <button
//                 className="p-2 rounded-full cursor-pointer bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
//                 aria-label="Story Info"
//                 onClick={() => setShowMenu((prev) => !prev)}
//               >
//                 <SquareMenu className="w-5 h-5 text-white" />
//               </button>
//               <div
//                 className={`absolute ${
//                   showMenu ? "left-12 scale-100" : "scale-0 left-0"
//                 } transition-all duration-200 ease-in-out top-0 bg-mystic-700 rounded-xl`}
//               >
//                 <div
//                   className="p-2 rounded-full cursor-pointer  transition-colors z-50"
//                   aria-label="Story Info"
//                 >
//                   <LikeButton
//                     storyId={story?.id}
//                     initialLiked={story?.likedByMe}
//                     initialCount={story?.likeCount}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <HTMLFlipBook
//             width={370}
//             height={500}
//             maxShadowOpacity={0.5}
//             showCover={true}
//             drawShadow={true}
//             size="stretch" // ← better for responsiveness than "fixed"
//             minWidth={300} // optional: define min/max
//             maxWidth={500}
//             minHeight={500}
//             maxHeight={633}
//             mobileScrollSupport={true}
//             className="demo-book"
//             {...({} as any)}
//           >
//             {/* Cover Page */}
//             <div className="p-3 md:p-8 overflow-hidden flex flex-col justify-center items-center bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin">
//               <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 !text-[#5b4636] font-josefin">
//                 {story.title}
//               </h2>
//               <p className="text-[#7a6248] mb-4 font-josefin text-[15px] sm:text-base">
//                 {story.description}
//               </p>
//               <img
//                 src={story.coverImage}
//                 alt="Cover"
//                 className="aspect-auto max-h-[200px] sm:max-h-[300px] w-full object-cover rounded-md "
//               />
//             </div>
//             {story?.pages.map((page: Page) => (
//               <div
//                 key={page.id}
//                 className="relative p-3 md:p-8 bg-[#fdf6e3] border-2 border-[#c4b69f] shadow-inner w-full h-full font-josefin !text-[#5b4636] prose max-w-none leading-relaxed overflow-auto"
//               >
//                 {/* Page HTML content */}
//                 <div dangerouslySetInnerHTML={{ __html: page.content }} />
//               </div>
//             ))}

//             {/* About Author Page */}
//             <div className="p-8 bg-[#fdf6e3] border w-full h-full font-josefin text-mystic-700">
//               <h2 className="text-xl font-bold mb-4 text-mystic-700">
//                 About the Author
//               </h2>
//               <p className="mb-2">
//                 <b>Name: </b>
//                 {story.author.name}
//               </p>
//               <p className="mb-2">
//                 <b>Email: </b> {story.author.email}
//               </p>
//               <p>
//                 <b>Story Title: </b> {story.title}
//               </p>
//             </div>
//           </HTMLFlipBook>
//         </>
//       )}
//     </section>
//   );
// };

// export default MyBookStory;

"use client";

import { useQuery } from "@tanstack/react-query";
import { Info, Loader2, SquareMenu } from "lucide-react";
import { useParams } from "next/navigation";
import HTMLFlipBook from "react-pageflip";
import { getStoryById } from "../api-service/api";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import LikeButton from "./like-button";
import { useState } from "react";
import Link from "next/link";

type Page = {
  id: number;
  content: string;
  pageNumber: number;
};

const MyBookStory = () => {
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const storyId = id as string;

  if (!storyId) return null;
  const { data: story, isLoading } = useQuery({
    queryKey: ["singleStory", storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
  });

  return (
    <section className="bg-mystic-800 w-full p-4 sm:p-8 h-screen overflow-hidden flex justify-center items-center book__story">
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

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-20 w-20 animate-spin text-gray-600" />
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 z-10">
            <div className="relative">
              <button
                className="p-2 rounded-full cursor-pointer bg-mystic-600 hover:bg-mystic-500 transition-colors z-50"
                aria-label="Story Info"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <SquareMenu className="w-5 h-5 text-white" />
              </button>
              <div
                className={`absolute ${
                  showMenu ? "left-12 scale-100" : "scale-0 left-0"
                } transition-all duration-200 ease-in-out top-0 bg-mystic-700 rounded-xl`}
              >
                <div
                  className="p-2 rounded-full cursor-pointer  transition-colors z-50"
                  aria-label="Story Info"
                >
                  <LikeButton
                    storyId={story?.id}
                    initialLiked={story?.likedByMe}
                    initialCount={story?.likeCount}
                  />
                </div>
              </div>
            </div>
          </div>

          <HTMLFlipBook
            width={370}
            height={500}
            maxShadowOpacity={0.5}
            showCover={true}
            drawShadow={true}
            size="stretch"
            minWidth={300}
            maxWidth={500}
            minHeight={500}
            maxHeight={633}
            mobileScrollSupport={true}
            className="demo-book"
            {...({} as any)}
          >
            {/* Cover Page - Old Book Style */}
            <div className="p-3 md:p-8 overflow-hidden flex flex-col justify-center items-center bg-gradient-to-b from-amber-900 to-amber-800 border-4 border-amber-950 shadow-lg w-full h-full font-josefin relative">
              {/* Book spine effect */}
              {/* <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-b from-amber-950 to-amber-900"></div> */}
              {/* Worn edges effect */}
              {/* <div className="absolute inset-0 border-8 border-transparent border-t-amber-950/30 border-l-amber-950/30 border-b-amber-950/20 border-r-amber-950/20 pointer-events-none"></div> */}

              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-amber-50 font-josefin relative z-10 text-center">
                {story.title}
              </h2>
              <p className="text-amber-200 mb-4 font-josefin text-[15px] sm:text-base relative z-10 text-center">
                {story.description}
              </p>
              <img
                src={story.coverImage}
                alt="Cover"
                className="aspect-auto max-h-[200px] sm:max-h-[300px] w-full object-cover rounded-sm border border-amber-950 shadow-inner relative z-10"
              />
            </div>

            {/* Pages with aged paper look */}
            {story?.pages.map((page: Page) => (
              <div
                key={page.id}
                className="relative p-3 md:p-8 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 border border-amber-200 shadow-inner w-full h-full font-josefin text-amber-900 prose max-w-none leading-relaxed overflow-auto"
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none"></div>
                {/* Page HTML content */}
                <div
                  className="relative z-10"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
                {/* Page number */}
                <div className="absolute bottom-4 right-4 text-amber-700/70 text-sm">
                  {page.pageNumber}
                </div>
                {/* Worn edge effect */}
                <div className="absolute inset-0 border-4 border-transparent border-t-amber-300/30 border-l-amber-300/30 border-b-amber-300/20 border-r-amber-300/20 pointer-events-none"></div>
              </div>
            ))}

            {/* About Author Page */}
            <div className="relative p-8 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 border border-amber-200 w-full h-full font-josefin text-amber-900 overflow-auto">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-4 text-amber-800 border-b border-amber-200 pb-2">
                  About the Author
                </h2>
                <p className="mb-2 text-amber-800">
                  <b className="">Name: </b>
                  <Link
                    className="text-amber-800"
                    href={`/authors/${story?.author?.id}`}
                  >
                    {story.author.name}
                  </Link>
                </p>
                
                <p className="mb-2">
                  <b className="text-amber-800">Email: </b> {story.author.email}
                </p>
                <p>
                  <b className="text-amber-800">Story Title: </b> {story.title}
                </p>
              </div>
              {/* Worn edge effect */}
              <div className="absolute inset-0 border-4 border-transparent border-t-amber-300/30 border-l-amber-300/30 border-b-amber-300/20 border-r-amber-300/20 pointer-events-none"></div>
            </div>
          </HTMLFlipBook>
        </>
      )}
    </section>
  );
};

export default MyBookStory;
