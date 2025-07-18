import { Skeleton } from "@/components/shadcn-ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-80 w-full" />
    </div>
  );
}

export function HeadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-16 w-full" />
    </div>
  );
}
