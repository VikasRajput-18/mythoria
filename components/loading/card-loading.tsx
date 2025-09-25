import { Skeleton } from "@/components/ui/skeleton";

export default function CardLoading() {
  return (
    <div className="border no-underline border-mystic-400 p-3 rounded-xl bg-mystic-950/40 transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-lg shadow-mystic-600 group cursor-pointer col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 space-y-2 h-full">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-full rounded-xl bg-mystic-400" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-mystic-400" />
          <Skeleton className="h-4 w-11/12 bg-mystic-400" />
        </div>
      </div>
    </div>
  );
}
