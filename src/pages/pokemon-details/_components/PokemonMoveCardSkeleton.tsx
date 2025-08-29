import { Skeleton } from "@/components/ui/skeleton";

export default function PokemonMoveCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card p-4 rounded-lg shadow-elevation-1 border border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {/* Title + Badge */}
            <div className="flex items-center space-x-3 mb-2">
              <Skeleton className="h-5 w-32 rounded-md" /> {/* move name */}
              <Skeleton className="h-5 w-12 rounded-full" /> {/* type badge */}
            </div>

            {/* Effect description */}
            <Skeleton className="h-4 w-full rounded mb-2" />
            <Skeleton className="h-4 w-3/4 rounded mb-3" />

            {/* Info row */}
            <div className="flex items-center space-x-4 text-sm flex-wrap">
              <Skeleton className="h-4 w-20 rounded" /> {/* Learn method */}
              <Skeleton className="h-4 w-16 rounded" /> {/* Power */}
              <Skeleton className="h-4 w-20 rounded" /> {/* Accuracy */}
              <Skeleton className="h-4 w-12 rounded" /> {/* PP */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
