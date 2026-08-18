"use client";

import type { DragEvent, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

function blockSave(event: MouseEvent | DragEvent) {
  event.preventDefault();
}

/** Deters casual save/copy on photography. Contact text is never wrapped in this. */
export function ProtectedMedia({ children, className }: Props) {
  return (
    <div
      className={cn("select-none", className)}
      onContextMenu={blockSave}
      onDragStart={blockSave}
    >
      {children}
    </div>
  );
}
