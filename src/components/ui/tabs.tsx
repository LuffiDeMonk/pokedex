import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tabTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap h-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2",
  {
    variants: {
      variant: {
        default:
          "data-[state=active]:border-blue-600 data-[state=active]:text-blue-600",
        grass:
          "data-[state=active]:text-pokemon-grass data-[state=active]:border-pokemon-grass",
        poison:
          "data-[state=active]:text-pokemon-poison data-[state=active]:border-pokemon-poison",
        fire: "data-[state=active]:text-pokemon-fire data-[state=active]:border-pokemon-fire",
        flying:
          "data-[state=active]:text-pokemon-flying data-[state=active]:border-pokemon-flying",
        water:
          "data-[state=active]:text-pokemon-water data-[state=active]:border-pokemon-water",
        bug: "data-[state=active]:text-pokemon-bug data-[state=active]:border-pokemon-bug",
        normal:
          "data-[state=active]:text-pokemon-normal data-[state=active]:border-pokemon-normal",
        electric:
          "data-[state=active]:text-pokemon-electric data-[state=active]:border-pokemon-electric",
        ground:
          "data-[state=active]:text-pokemon-ground data-[state=active]:border-pokemon-ground",
        fighting:
          "data-[state=active]:text-pokemon-fighting data-[state=active]:border-pokemon-fighting",
        psychic:
          "data-[state=active]:text-pokemon-psychic data-[state=active]:border-pokemon-psychic",
        rock: "data-[state=active]:text-pokemon-rock data-[state=active]:border-pokemon-rock",
        fairy:
          "data-[state=active]:text-pokemon-fairy data-[state=active]:border-pokemon-fairy",
        steel:
          "data-[state=active]:text-pokemon-steel data-[state=active]:border-pokemon-steel",
        ice: "data-[state=active]:text-pokemon-ice data-[state=active]:border-pokemon-ice",
        ghost:
          "data-[state=active]:text-pokemon-ghost data-[state=active]:border-pokemon-ghost",
        dragon:
          "data-[state=active]:text-pokemon-dragon data-[state=active]:border-pokemon-dragon",
        dark: "data-[state=active]:text-pokemon-dark data-[state=active]:border-pokemon-dark",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-16 items-center justify-center text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabTriggerVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-12 py-4",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, tabTriggerVariants };
