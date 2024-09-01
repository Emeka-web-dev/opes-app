import { Skeleton } from "@/components/ui/skeleton";

export function ReferralSkeleton() {
  return (
    <div className="flex flex-col space-y-4 p-4 pt-16">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-[80%] h-8" />
      <Skeleton className="w-[60%] h-8" />
    </div>
  );
}
