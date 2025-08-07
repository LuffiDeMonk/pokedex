import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassNames?: string;
  }
>(
  (
    { className, value, indicatorClassNames, ...props },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-6 w-full overflow-hidden rounded-sm bg-primary/20",
        className
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex items-center justify-end px-2 text-xs font-medium text-white bg-primary transition-all duration-500 ease-out",
          indicatorClassNames
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}></ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
