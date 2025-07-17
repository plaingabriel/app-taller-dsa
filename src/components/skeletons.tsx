import { Skeleton } from "@/components/shadcn-ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
