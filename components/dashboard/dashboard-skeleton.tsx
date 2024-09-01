import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Skeleton className="h-3 w-[200px]" />
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full hidden lg:flex" />
      </div>
      <div className="flex flex-col py-6 gap-y-4">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-[80%] h-8" />
        <Skeleton className="w-[60%] h-8" />
      </div>
    </div>
  );
}
