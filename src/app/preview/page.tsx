"use client";
import CustomInput from "@/components/custom-input";
import CustomTags from "@/components/custom-tags";
import { Tag } from "@/types";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyBook() {
  const [storyData, setStoryData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("storyData");
    if (data) {
      try {
        setStoryData(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse storyData:", e);
      }
    }
  }, []);

  return (
    <section className="bg-mystic-800 w-full min-h-screen p-4 sm:p-8">
      <div className="lg:flex items-start gap-x-8 ">
        <div className="flex-1 w-full">
          <h2 className="text-xl md:text-2xl text-neutral-200">
            {storyData?.title}
          </h2>
          <p className="text-neutral-400">{storyData?.description}</p>

          {storyData?.tags?.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {storyData?.tags?.map((tag: Tag) => (
                <CustomTags key={tag.id} {...tag} hideIcon />
              ))}
            </div>
          ) : null}

          <div className="my-7">
            {storyData?.thumbnail ? (
              <Image
                width={350}
                height={300}
                className="w-full max-w-2xl h-full rounded-md"
                src={storyData?.thumbnail}
                alt={storyData.title}
              />
            ) : null}
          </div>

          {/* Rich Text Content */}
          {storyData?.content && (
            <div
              className="prose prose-sm prose-invert max-w-none text-neutral-100"
              dangerouslySetInnerHTML={{ __html: storyData.content }}
            />
          )}

          <div className="mt-8 w-full">
            <CustomInput
              value={""}
              onChange={() => {}}
              placeholder="Add Comment"
              className="w-full max-w-full"
            />
            <div className="flex items-center mt-4 justify-between">
              <button className="cursor-pointer flex items-center gap-1">
                <Heart className="stroke-mystic-500 hover:stroke-rose-500" />
                <p className="text-mystic-500">198</p>
              </button>
              <button className="cursor-pointer flex items-center gap-1">
                <MessageCircle className="stroke-mystic-500 hover:stroke-white" />
                <p className="text-mystic-500">198</p>
              </button>
              <button className="cursor-pointer flex items-center gap-1">
                <Share2 className="stroke-mystic-500 hover:stroke-blue-500" />
                <p className="text-mystic-500">198</p>
              </button>
              <button className="cursor-pointer flex items-center gap-1">
                <Bookmark className="stroke-mystic-500 hover:stroke-orange-400" />
                <p className="text-mystic-500">198</p>
              </button>
            </div>
          </div>
        </div>
        <div className="md:max-w-[400px] sticky top-10 ">
          <div className="flex items-center gap-2">
            <div className="border-2 border-mystic-blue-900 rounded-full p-0.5">
              <Image
                src={
                  "https://scontent-del1-1.cdninstagram.com/v/t51.2885-19/503272151_18356863138147606_8698245624336229866_n.jpg?_nc_ht=scontent-del1-1.cdninstagram.com&_nc_cat=110&_nc_oc=Q6cZ2QEp9EJ7kzXokBDp2OJ5Xe4OwapeVTJJTF4Rh_QNmW619rxurMQvRGyQ11DLw1FEp38&_nc_ohc=7VRPTjfG49EQ7kNvwEpaIGi&_nc_gid=_T8f9RTy0iOf-2kJ1uE4iA&edm=AA5fTDYBAAAA&ccb=7-5&oh=00_AfNU4gfMnEekg-hBup-aK83IEELVRNa-WvN2EplofjtAFg&oe=684A2C5A&_nc_sid=7edfe2"
                }
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover"
                alt="Vikas Rajput"
              />
            </div>
            <div>
              <h3 className="text-white text-lg">Vikas Rajput</h3>
              <p className="text-neutral-300 text-sm max-w-[250px]">
                Writer of fantasy and science fiction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
