import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-1 text-sm capitalize font-semibold transition-colors text-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        grass:
          "bg-pokemon-grass border-pokemon-grass shadow-sm shadow-pokemon-grass/80",
        poison:
          "bg-pokemon-poison border-pokemon-poison shadow-sm shadow-pokemon-poison/80",
        fire: "bg-pokemon-fire border-pokemon-fire shadow-sm shadow-pokemon-fire/80",
        flying:
          "bg-pokemon-flying border-pokemon-flying shadow-sm shadow-pokemon-flying/80",
        water:
          "bg-pokemon-water border-pokemon-water shadow-sm shadow-pokemon-water/80",
        bug: "bg-pokemon-bug border-pokemon-bug shadow-sm shadow-pokemon-bug/80",
        normal:
          "bg-pokemon-normal border-pokemon-normal shadow-sm shadow-pokemon-normal/80",
        electric:
          "bg-pokemon-electric border-pokemon-electric shadow-sm shadow-pokemon-electric/80",
        ground:
          "bg-pokemon-ground border-pokemon-ground shadow-sm shadow-pokemon-ground/80",
        fighting:
          "bg-pokemon-fighting border-pokemon-fighting shadow-sm shadow-pokemon-fighting/80",
        psychic:
          "bg-pokemon-psychic border-pokemon-psychic shadow-sm shadow-pokemon-psychic/80",
        rock: "bg-pokemon-rock border-pokemon-rock shadow-sm shadow-pokemon-rock/80",
        fairy:
          "bg-pokemon-fairy border-pokemon-fairy shadow-sm shadow-pokemon-fairy/80",
        steel:
          "bg-pokemon-steel border-pokemon-steel shadow-sm shadow-pokemon-steel/80",
        ice: "bg-pokemon-ice border-pokemon-ice shadow-sm shadow-pokemon-ice/80",
        ghost:
          "bg-pokemon-ghost border-pokemon-ghost shadow-sm shadow-pokemon-ghost/80",
        dragon:
          "bg-pokemon-dragon border-pokemon-dragon shadow-sm shadow-pokemon-dragon/80",
        dark: "bg-pokemon-dark border-pokemon-dark shadow-sm shadow-pokemon-dark/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
