// The foot of a paged table: which rows are shown of how many, how many to a page, and the way to the
// previous and next page. The page is counted from 0; the parent loads it (on the server, so every
// page follows the table's sort and filter). Hidden only when the table is empty, so a single page
// still says how many rows there are.
// One component per file.

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../lib/cn";
import { Button } from "./button";
import { Combobox } from "./combobox";

const PAGE_SIZES = [10, 25, 50, 100];
/** What a table starts with. */
const DEFAULT_PAGE_SIZE = 25;

interface PagerProps {
  /** The page shown, from 0. */
  page: number;
  /** Rows to a page. */
  size: number;
  /** Rows in the whole table (after its filter). */
  total: number;
  onPage: (page: number) => void;
  /** A new size starts again at the first page. */
  onSize: (size: number) => void;
  /** The sizes offered; `PAGE_SIZES` by default. */
  sizes?: number[];
  className?: string;
}

function Pager({ page, size, total, onPage, onSize, sizes = PAGE_SIZES, className }: PagerProps) {
  if (total === 0) return null;
  const pages = Math.max(1, Math.ceil(total / size));
  const from = page * size + 1;
  const to = Math.min(total, (page + 1) * size);
  return (
    <nav
      aria-label="Pages"
      data-slot="pager"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted",
        className,
      )}
    >
      <span>
        <b className="font-semibold text-fg">{from === to ? from : `${from}–${to}`}</b> of {total}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <span>Rows per page</span>
        <Combobox
          aria-label="Rows per page"
          size="sm"
          searchable={false}
          className="w-20"
          value={String(size)}
          onChange={(v) => v && onSize(Number(v))}
          options={sizes.map((n) => ({ value: String(n) }))}
        />
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <span>
          Page {page + 1} of {pages}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Previous page"
          disabled={page === 0}
          onClick={() => onPage(page - 1)}
        >
          <ChevronLeft aria-hidden />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Next page"
          disabled={page >= pages - 1}
          onClick={() => onPage(page + 1)}
        >
          <ChevronRight aria-hidden />
        </Button>
      </div>
    </nav>
  );
}

export { Pager, PAGE_SIZES, DEFAULT_PAGE_SIZE };
