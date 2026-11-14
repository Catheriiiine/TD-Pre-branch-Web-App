"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({ children, className, sheet = false, ...props }: ComponentProps<typeof DialogPrimitive.Content> & { sheet?: boolean }) {
  return <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[3px]" />
    <DialogPrimitive.Content className={cn("fixed z-50 overflow-y-auto bg-white p-7 shadow-2xl outline-none", sheet ? "inset-y-0 right-0 w-full max-w-md" : "left-1/2 top-1/2 max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl", className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary" aria-label="Close panel"><X size={18} /></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>;
}
