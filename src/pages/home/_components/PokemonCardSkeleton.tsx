import { Skeleton } from "@/components/ui/skeleton";

export const PokemonCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="relative bg-muted p-4 aspect-square flex items-center justify-center">
        <Skeleton className="size-full" />
      </div>

      {/* Info placeholder */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <Skeleton className="h-5 w-1/2 rounded" />

        {/* Types */}
        <div className="flex gap-2">
          <Skeleton className="h-4 w-10 rounded-full" />
          <Skeleton className="h-4 w-10 rounded-full" />
        </div>

        {/* Stats */}
        <div className="flex justify-between gap-2">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      </div>
    </div>
  );
};
