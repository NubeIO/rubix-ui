// The editor's side sheet frame (day, names, add dated entry): the schedule's name over the sheet's title
// and a line of help, a scrolling body, and a footer of actions. Built on the shared Sheet.
//
// One responsibility: the sheet chrome the editor's three sheets share.

import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  scheduleName: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function EditorSheet({ open, onClose, scheduleName, title, description, children, footer }: Props) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-(--sheet-w-md)">
        <SheetHeader className="gap-1 border-b border-line pb-3.5 pr-12">
          <span className="text-caption text-ink-faint">{scheduleName}</span>
          <SheetTitle className="text-base">{title}</SheetTitle>
          <SheetDescription className="text-caption">{description}</SheetDescription>
        </SheetHeader>
        <div className="grid min-h-0 flex-1 content-start gap-3 overflow-y-auto p-4">{children}</div>
        <div className="flex flex-none justify-end gap-2 border-t border-line px-4 py-3">{footer}</div>
      </SheetContent>
    </Sheet>
  );
}
