import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PokemonSearchCardLoading() {
  return (
    <Card>
      <CardDescription className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          {/* Image placeholder */}
          <Skeleton className="size-20 shrink-0 rounded-lg" />

          <div className="space-y-2">
            {/* ID placeholder */}
            <Skeleton className="h-3 w-10" />

            {/* Name placeholder */}
            <Skeleton className="h-5 w-24" />

            {/* Types placeholder */}
            <div className="flex gap-2">
              <Skeleton className="h-4 w-10 rounded-sm" />
              <Skeleton className="h-4 w-10 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Action button placeholder */}
        <Skeleton className="size-9" />
      </CardDescription>
    </Card>
  );
}
