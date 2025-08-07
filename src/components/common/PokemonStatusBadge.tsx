import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
interface PokemonStatusBadgeProps {
  type: string;
  className?: string;
}

// TODO: need to create badge variant for pokemon types

export default function PokemonStatusBadge({
  type,
  className,
}: PokemonStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "rounded-full max-w-20 bg-gradient-to-b from-white/60 to-white/30 text-black text-sm flex justify-center capitalize text-center px-2 py-1 border-0",
        className
      )}
      variant="outline">
      {type}
    </Badge>
  );
}
