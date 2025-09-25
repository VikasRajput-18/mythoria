import { Skeleton } from "@/components/ui/skeleton";

export default function AuthorLoading() {
  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 no-underline hover:opacity-75 transition-all duration-200 ease-in-out border border-transparent p-4 hover:border-mystic-400 rounded-lg shadow-none hover:shadow-2xl">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[175px] w-[175] rounded-full mx-auto bg-mystic-400" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] mx-auto bg-mystic-400" />
          <Skeleton className="h-4 w-11/12 bg-mystic-400 mx-auto" />
        </div>
      </div>
    </div>
  );
}
