import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    suffixIcon?: React.ReactNode;
    prefixIcon?: React.ReactNode;
  }
>(({ className, type, suffixIcon, prefixIcon, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 h-10 w-full rounded-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
        "focus-within:ring-1 focus-within:ring-ring focus-within:border-ring", // highlight wrapper on input focus
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}>
      {prefixIcon}
      <input
        className="flex-1 h-full bg-transparent outline-none text-base md:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        type={type}
        ref={ref}
        {...props}
      />
      {suffixIcon}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
