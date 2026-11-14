import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:pointer-events-none disabled:opacity-45", {
  variants: {
    variant: {
      default: "bg-primary text-white hover:bg-primary-hover",
      outline: "border border-line bg-white text-ink hover:bg-surface",
      ghost: "text-muted hover:bg-surface hover:text-ink",
    },
    size: { default: "h-11 px-4", sm: "h-9 px-3 text-xs", icon: "size-10" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export function Button({ className, variant, size, type = "button", ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button type={type} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
