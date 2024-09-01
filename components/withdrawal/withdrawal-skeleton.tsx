import { Skeleton } from "@/components/ui/skeleton";

export function WithdrawalSkeleton() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col space-y-4 p-4 pt-8">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-[80%] h-8" />
      <Skeleton className="w-[60%] h-8" />
    </div>
  );
}
