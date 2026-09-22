import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-elevated px-3 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-subtle transition-[box-shadow] duration-150 ease-out focus-visible:shadow-[var(--shadow-border-hover)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
