import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ForwardRefExoticComponent } from 'react';
import { JSX as JSX_2 } from 'react';
import { Loader2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React_2 from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { VariantProps } from 'class-variance-authority';

export declare function Accordion({ className, defaultValue, children, ...props }: AccordionProps): React_2.JSX.Element;

export declare function AccordionContent({ className, children, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function AccordionItem({ value, className, children, ...props }: React_2.ComponentProps<"div"> & {
    value: string;
}): React_2.JSX.Element;

declare interface AccordionProps extends Omit<React_2.ComponentProps<"div">, "onChange"> {
    /** Only `single` (one open item) is implemented — the Customizer's shape. */
    type?: "single";
    collapsible?: boolean;
    defaultValue?: string;
}

export declare function AccordionTrigger({ className, children, ...props }: React_2.ComponentProps<"button">): React_2.JSX.Element;

export declare function Alert({ className, variant, ...props }: React_2.ComponentProps<"div"> & VariantProps<typeof alertVariants>): React_2.JSX.Element;

export declare function AlertDescription({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function AlertTitle({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "info" | "success" | "warning" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function AllSchedulesCalendar({ schedules, onOpen, now: fixed }: AllSchedulesCalendarProps): JSX_2.Element;

export declare interface AllSchedulesCalendarProps {
    schedules: NodeSchedule[];
    /** Open a schedule (its name in a week row). */
    onOpen?: (id: string) => void;
    /** The current instant (epoch ms). Omitted, the calendar follows the clock. */
    now?: number;
}

export declare class BackendNeedsUpgrade extends Error {
    readonly kind = "backend-needs-upgrade";
}

export declare function Badge({ className, variant, pill, size, ...props }: React_2.ComponentProps<"span"> & VariantProps<typeof badgeVariants>): React_2.JSX.Element;

export declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "info" | "success" | "warning" | "outline" | "secondary" | "accent2" | null | undefined;
    pill?: boolean | null | undefined;
    size?: "default" | "count" | null | undefined;
} & ClassProp) | undefined) => string;

/** What boxes running the schedule write. The default value is `names[0].value`. */
export declare interface BoxOutput {
    used: boolean;
    min: number;
    max: number;
}

export declare function Breadcrumb({ ...props }: React_2.ComponentProps<"nav">): React_2.JSX.Element;

export declare function BreadcrumbEllipsis({ className, ...props }: React_2.ComponentProps<"span">): React_2.JSX.Element;

export declare function BreadcrumbItem({ className, ...props }: React_2.ComponentProps<"li">): React_2.JSX.Element;

export declare function BreadcrumbLink({ asChild, className, ...props }: React_2.ComponentProps<"a"> & {
    asChild?: boolean;
}): React_2.JSX.Element;

export declare function BreadcrumbList({ className, ...props }: React_2.ComponentProps<"ol">): React_2.JSX.Element;

export declare function BreadcrumbPage({ className, ...props }: React_2.ComponentProps<"span">): React_2.JSX.Element;

export declare function BreadcrumbSeparator({ children, className, ...props }: React_2.ComponentProps<"li">): React_2.JSX.Element;

export declare const Button: React_2.ForwardRefExoticComponent<Omit<React_2.ClassAttributes<HTMLButtonElement> & React_2.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | "solid" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "solid" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & ClassProp) | undefined) => string;

/** Whether *some* clipboard strategy is available at all. Useful for hiding a copy affordance entirely
 *  in a context where neither path can work (a non-DOM environment). Note this is deliberately NOT used
 *  to gate on secure-context: an insecure page can still copy via the legacy path. */
export declare function canWriteText(): boolean;

export declare function Card({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardContent({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardDescription({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardFooter({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardHeader({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardTitle({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare class ChangedElsewhere extends Error {
    readonly kind = "changed-elsewhere";
}

export declare function Checkbox({ className, ...props }: React_2.ComponentProps<"input">): React_2.JSX.Element;

declare interface Clipboard_2 {
    /** True for ~`resetMs` after a successful copy (drives the "Copied" affordance). */
    copied: boolean;
    /** Set when the last copy failed (denied / no clipboard); cleared on the next attempt. */
    error: string | null;
    /** Copy `text`; resolves to whether it succeeded. Never throws. */
    copy: (text: string) => Promise<boolean>;
}
export { Clipboard_2 as Clipboard }

export declare function cn(...inputs: ClassValue[]): string;

export declare interface CollapseProps {
    open: boolean;
    children: React_2.ReactNode;
    className?: string;
}

export declare const Collapsible: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & RefAttributes<HTMLDivElement>>;

export declare const CollapsibleContent: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & RefAttributes<HTMLDivElement>>;

export declare const CollapsibleTrigger: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & RefAttributes<HTMLButtonElement>>;

export declare function ColorSwatchPicker({ palette, value, onChange, "aria-label": ariaLabel, allowCustom, className, }: ColorSwatchPickerProps): React_2.JSX.Element;

declare interface ColorSwatchPickerProps {
    palette: Swatch[];
    value: string;
    onChange: (value: string) => void;
    "aria-label": string;
    /** Show a hex input to type a custom `#rrggbb` (committed on blur/Enter when valid). */
    allowCustom?: boolean;
    className?: string;
}

export declare function Combobox({ options, value, onChange, placeholder, "aria-label": ariaLabel, allowCustom, clearable, disabled, size, renderValue, searchable, chip, className, }: ComboboxProps): React_2.JSX.Element;

export declare interface ComboboxOption {
    value: string;
    /** Display label (defaults to the value). */
    label?: string;
    /** Optional group header this option renders under. */
    group?: string;
    /** Optional one-line description rendered under the label. */
    description?: string;
    /** Optional CSS color rendered as a swatch dot before the label. */
    swatch?: string;
}

declare interface ComboboxProps {
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** The accessible name of the trigger (and `<name> search` for the filter input). */
    "aria-label": string;
    /** Commit free-typed text as the value on Enter (the labeled escape hatch, e.g. no frames yet). */
    allowCustom?: boolean;
    /** Show an inline clear (×) on the trigger when a value is set; clicking it commits `""` (— none —). */
    clearable?: boolean;
    disabled?: boolean;
    /** `md` (36px, 14px text) matches `Input` and `Select` in a form; `sm` (32px, 12px) is the chrome
     *  size for a toolbar or a dense row. */
    size?: "md" | "sm";
    /** Draw the trigger's VALUE yourself: a tag beside a variable, a name with its id. Called only
     *  while a value is set, with the option it matches when there is one. Return nothing to keep the
     *  default text. */
    renderValue?: (value: string, option: ComboboxOption | undefined) => React_2.ReactNode;
    /** Show the search box at the top of the list (default). Off for a short, fixed list that reads
     *  better as a plain menu; the arrow keys and Enter still work. */
    searchable?: boolean;
    /** Draw the trigger as a filter chip named `chip`: "⊕ Site" (dashed) while the value is `""`, then
     *  "Site · Adelaide Depot" (accent) with a clear button that sets it back to `""`. `renderValue`
     *  draws the part after the dot (a shorter name than the list shows, say). */
    chip?: string;
    className?: string;
}

export declare function CopyButton({ text, label, copiedLabel, variant, size, className, ariaLabel, }: Props): JSX_2.Element;

/** A dated entry. Under `events` it adds open hours; under `exception` it switches the schedule off
 *  (a closure, a changed-hours day, a holiday). */
export declare interface DatedEntry {
    name?: string;
    label?: string;
    kind?: DatedKind;
    dates: DateWindow[];
    value?: number;
    color?: string;
    /** Repeat every year. Only on `closed` and `holiday` exceptions. */
    yearly?: boolean;
}

/** A date that differs from the week, stored the way the Schedule Groups extension stores it (both
 *  pages edit the same records; `writeNodeSchedule` has the form):
 *  - extra: the default name runs `start`..`end` on `date`, on top of the week;
 *  - changed: only `hours` run (the default name) on each day `date`..`to`; the week's hours for those
 *    days are replaced. Never yearly;
 *  - closed: Off all day from `date` to `to` (inclusive), optionally every year;
 *  - holiday: Off all day on `date`, optionally every year.
 *  An entry the editor does not write itself (a box's own, without a `kind`) is `kept`: shown, and
 *  written back exactly as it was read. */
export declare interface DatedItem {
    /** The key stem (`c1731...`; `h-2026-12-25` for a holiday), stable while the record is unchanged so
     *  a reload can tell entries apart. A kept entry's is `kept:<map>:<key>`. */
    id: string;
    kind: DatedKind;
    label: string;
    /** `YYYY-MM-DD`, local. */
    date: string;
    /** The last day of a range, inclusive. */
    to?: string;
    /** Extra hours (and a kept part-day entry): its minutes on `date`, `end` inclusive. */
    start?: number;
    end?: number;
    /** Changed hours: the hours left open each day, `end` inclusive. */
    hours?: {
        start: number;
        end: number;
    }[];
    /** A kept entry's own name; the editor's own entries run the default name. */
    name?: string;
    /** Every year. Only closed and holiday (lb and the extension refuse it elsewhere). */
    yearly?: boolean;
    /** Read from a box's own entry: written back verbatim. */
    kept?: {
        map: "events" | "exception";
        key: string;
    };
}

/** What a dated entry is for: lb's addition beside rubix-ce's structure. */
export declare type DatedKind = "closed" | "changed" | "extra" | "holiday";

export declare function DatePicker({ value, onChange, min, max, placeholder, weekStart, format, size, disabled, "aria-label": ariaLabel, className, }: DatePickerProps): React_2.JSX.Element;

declare interface DatePickerProps {
    /** "YYYY-MM-DD", or "" for none. */
    value: string;
    onChange: (value: string) => void;
    /** The first day that can be picked ("YYYY-MM-DD"). */
    min?: string;
    /** The last day that can be picked ("YYYY-MM-DD"). */
    max?: string;
    placeholder?: string;
    /** The week's first day: 1 = Monday (default), 0 = Sunday. */
    weekStart?: number;
    /** How the field shows a picked day; "31 Oct 2026" by default. */
    format?: (iso: string) => string;
    /** `md` (36px) matches `Input`; `sm` (32px) is the dense size for a toolbar or a row. */
    size?: "md" | "sm";
    disabled?: boolean;
    "aria-label"?: string;
    className?: string;
}

/** One dated window: local wall time `YYYY-MM-DDTHH:mm` in the schedule's zone, the end exact. */
export declare interface DateWindow {
    start: string;
    end: string;
}

/** Minutes in a day. "24:00" (the end of the day) is this. */
export declare const DAY_MINS = 1440;

/** One block of the resolved day. `end` inclusive; `item` is the dated entry that put it there. */
export declare interface DaySpan {
    start: number;
    end: number;
    name: string;
    item?: DatedItem;
}

/** What a table starts with. */
export declare const DEFAULT_PAGE_SIZE = 25;

export declare function Dialog({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Root>): React_2.JSX.Element;

export declare function DialogClose({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Close>): React_2.JSX.Element;

export declare const DialogContent: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    showClose?: boolean;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const DialogDescription: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare function DialogFooter({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function DialogHeader({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare const DialogOverlay: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare function DialogPortal({ container, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Portal>): React_2.JSX.Element;

export declare const DialogSurfaceContext: React_2.Context<HTMLElement | null>;

export declare const DialogTitle: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare function DialogTrigger({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Trigger>): React_2.JSX.Element;

export declare function DropdownMenu({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Root>): React_2.JSX.Element;

export declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): React_2.JSX.Element;

export declare function DropdownMenuContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Content>): React_2.JSX.Element;

export declare function DropdownMenuGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Group>): React_2.JSX.Element;

export declare function DropdownMenuItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): React_2.JSX.Element;

export declare function DropdownMenuLabel({ className, inset, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): React_2.JSX.Element;

export declare function DropdownMenuPortal({ container, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Portal>): React_2.JSX.Element;

export declare function DropdownMenuRadioGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): React_2.JSX.Element;

export declare function DropdownMenuRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): React_2.JSX.Element;

export declare function DropdownMenuSeparator({ className, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Separator>): React_2.JSX.Element;

export declare function DropdownMenuShortcut({ className, ...props }: React_2.ComponentProps<"span">): React_2.JSX.Element;

export declare function DropdownMenuSub({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Sub>): React_2.JSX.Element;

export declare function DropdownMenuSubContent({ className, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): React_2.JSX.Element;

export declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): React_2.JSX.Element;

export declare function DropdownMenuTrigger({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): React_2.JSX.Element;

export declare function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps): JSX_2.Element;

declare interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    /** The hint under the title. */
    description?: ReactNode;
    /** The teaching action, usually ONE `<Button>`. Omit when the caller may not create anything. */
    action?: ReactNode;
    className?: string;
}

/** "31 Oct 2026": the default way a picked day is shown. */
export declare function formatDay(iso: string): string;

/** Minutes → "HH:MM". */
export declare function hhmm(mins: number): string;

export declare const Input: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React_2.RefAttributes<HTMLInputElement>>;

export declare const Label: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & React_2.RefAttributes<HTMLLabelElement>>;

/** Today in the browser's own zone, as "YYYY-MM-DD". */
export declare function localToday(): string;

/** Up to six names, Off included. */
export declare const MAX_NAMES = 6;

export declare function Menubar({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Root>): React_2.JSX.Element;

export declare function MenubarCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): React_2.JSX.Element;

export declare function MenubarContent({ className, align, alignOffset, sideOffset, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Content>): React_2.JSX.Element;

export declare function MenubarGroup({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Group>): React_2.JSX.Element;

export declare function MenubarItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): React_2.JSX.Element;

export declare function MenubarLabel({ className, inset, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): React_2.JSX.Element;

export declare function MenubarMenu({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Menu>): React_2.JSX.Element;

export declare function MenubarPortal({ container, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Portal>): React_2.JSX.Element;

export declare function MenubarRadioGroup({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.RadioGroup>): React_2.JSX.Element;

export declare function MenubarRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.RadioItem>): React_2.JSX.Element;

export declare function MenubarSeparator({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Separator>): React_2.JSX.Element;

export declare function MenubarShortcut({ className, ...props }: React_2.ComponentProps<"span">): React_2.JSX.Element;

export declare function MenubarSub({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Sub>): React_2.JSX.Element;

export declare function MenubarSubContent({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.SubContent>): React_2.JSX.Element;

export declare function MenubarSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): React_2.JSX.Element;

export declare function MenubarTrigger({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Trigger>): React_2.JSX.Element;

/** A local wall moment: `YYYY-MM-DD` and the minute of that day. */
export declare interface Moment {
    date: string;
    minute: number;
}

/** The tone of the name at `index` (0 = the default). Past the fifth name it stays pink. */
export declare function nameColour(index: number): NameTone;

/** A name's position: 0 for Off, 1..5 for the others, the index `nameColour` takes. */
export declare function nameIndex(doc: Pick<NodeSchedule, "names">, name: string | null): number;

export declare function NameSwatch({ index, className }: {
    index: number;
    className?: string;
}): JSX_2.Element;

export declare interface NameTone {
    /** The CSS custom property, or null for the default. */
    token: string | null;
    /** A CSS colour for inline styles and SVG. */
    css: string;
    /** Tailwind classes: fill, border, ink. */
    bg: string;
    border: string;
    text: string;
}

/** A name and the value it sends. */
export declare interface NameValue {
    name: string;
    value: number;
}

export declare interface NodeSchedule {
    id: string;
    name: string;
    description: string;
    /** A chart token name ("chart-8"): marks the schedule only, never its names. */
    color: string;
    timezone: string;
    /** Off: dashboards and flows read Off; boxes keep their hours. */
    enabled: boolean;
    /** `[0]` is Off (the default); the rest are `config.names` in order. */
    names: NameValue[];
    /** Seven days, Monday first, each sorted and non-overlapping. Off blocks are not listed. */
    week: Seg[][];
    dated: DatedItem[];
    output: BoxOutput;
    /** The revision the record was read at; a save sends it back. */
    rev: number;
    /** The record this was read from. Fields the editor does not edit ride through on save. */
    source: ScheduleRecord;
}

export declare function NodeScheduleEditor(props: NodeScheduleEditorProps): JSX_2.Element;

export declare interface NodeScheduleEditorProps {
    /** The schedule, read with `readNodeSchedule`. Null while it loads. */
    schedule: NodeSchedule | null;
    /** The record can't be read (old format): no editor, Recreate keeps the name and id. */
    unreadable?: {
        id: string;
        name: string;
    };
    /** The node's backend predates the new record: editing works, Save is off with the reason. */
    backendNeedsUpgrade?: boolean;
    /** Save the draft (send it with `writeNodeSchedule`; it carries the rev it was read at). Resolve
     *  with the stored rev; reject with the save error (`toSaveError` sorts it). */
    onSave?: (doc: NodeSchedule) => Promise<{
        rev: number;
    } | void>;
    /** Fetch the latest saved version, for "Reload, keep my edit". */
    onReload?: () => Promise<NodeSchedule>;
    /** Delete was asked for (the page confirms). */
    onDelete?: () => void;
    /** Recreate an unreadable schedule under the same id and name. */
    onRecreate?: (id: string, name: string) => void;
    /** Close button in the header; omitted, there is none. */
    onClose?: () => void;
    /** Told whenever the draft gains or loses unsaved edits (a page's leave guard). */
    onDirtyChange?: (dirty: boolean) => void;
    host?: "schedules" | "groups";
    /** The page's own last tab: Used by, Boxes. */
    extraTab?: {
        label: string;
        render: () => ReactNode;
    };
    readOnly?: boolean;
    hideSettings?: boolean;
    title?: string;
    subtitle?: string;
    /** The Save button's words; Groups says "Save and send to 12 boxes". */
    saveLabel?: string;
    /** The current instant (epoch ms). Omitted, the editor follows the clock minute by minute. */
    now?: number;
}

export declare interface NowAndNext {
    /** Now, in the schedule's zone. */
    at: Moment;
    enabled: boolean;
    now: Running & {
        /** When it stops (the next change), or null when nothing changes within the horizon. */
        until: Moment | null;
        /** The closed or holiday entry that makes today Off, when that is why it is Off. */
        closed?: DatedItem;
    };
    next: (Running & {
        from: Moment;
        until: Moment | null;
    }) | null;
}

export declare function nowAndNext(doc: NodeSchedule, instant: number): NowAndNext;

/** The editor's default name. UI only: lb never stores it. */
export declare const OFF = "Off";

export declare const PAGE_SIZES: number[];

export declare function Pager({ page, size, total, onPage, onSize, sizes, className }: PagerProps): JSX_2.Element | null;

declare interface PagerProps {
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

/** A time typed any usual way → minutes: "13:05", "13.05", "1305", "105" (= 01:05), "13" (= 13:00) or
 *  "24:00". `undefined` when it is none of those. */
export declare function parseTime(s: string): number | undefined;

export declare function Popover({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Root>): React_2.JSX.Element;

export declare function PopoverAnchor({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Anchor>): React_2.JSX.Element;

export declare function PopoverContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Content>): React_2.JSX.Element;

export declare const PopoverTrigger: React_2.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

declare interface Props {
    /** The text to copy. Disabled when empty. */
    text: string;
    /** Optional label beside the icon (e.g. "Copy JSON"). Omit for an icon-only button. */
    label?: string;
    /** Label shown for ~1.5s after a successful copy. Defaults to "Copied". */
    copiedLabel?: string;
    variant?: "default" | "solid" | "outline" | "ghost";
    size?: "default" | "sm" | "icon";
    className?: string;
    /** aria-label for the icon-only form (defaults to "copy to clipboard"). */
    ariaLabel?: string;
}

export declare function Radio({ className, ...props }: React_2.ComponentProps<"input">): React_2.JSX.Element;

export declare function readNodeSchedule(record: ScheduleRecord): NodeSchedule;

export declare function resolveDay(doc: Pick<NodeSchedule, "week" | "dated" | "names">, date: string): ResolvedDay;

export declare interface ResolvedDay {
    date: string;
    /** 0 = Monday ... 6 = Sunday. */
    weekday: number;
    /** The blocks that run, Off left out, sorted. */
    spans: DaySpan[];
    /** The closed or holiday entry that makes the whole day Off. */
    closed?: DatedItem;
    /** Every dated entry that touched the day, in the order applied. */
    items: DatedItem[];
}

export declare interface RevealProps {
    children: React_2.ReactNode;
    className?: string;
}

export declare interface RubixUiMotion {
    /** Wraps a tab panel each time it mounts (an entrance). */
    Reveal?: React_2.ComponentType<RevealProps>;
    /** Wraps an accordion item's body; shows it while `open`, hides it otherwise. */
    Collapse?: React_2.ComponentType<CollapseProps>;
}

export declare function RubixUiProvider({ portalContainer, motion, children, }: RubixUiProviderProps): React_2.JSX.Element;

declare interface RubixUiProviderProps {
    /** The element popups render into. `null`/omitted ⇒ `document.body` (Radix's default). */
    portalContainer?: HTMLElement | null;
    /** Animation primitives for Tabs and Accordion. Omitted ⇒ no animation. */
    motion?: RubixUiMotion;
    children: React_2.ReactNode;
}

export declare interface Running {
    name: string;
    value: number;
}

export declare type SaveError = ChangedElsewhere | BackendNeedsUpgrade | Unreadable | Error;

export declare const SCHEDULE_COLOURS: ScheduleColour[];

export declare interface ScheduleColour {
    value: string;
    label: string;
    /** Tailwind fill class, written out whole so Tailwind generates it. */
    bg: string;
}

/** The fill class for a stored colour; unknown values draw blue. */
export declare function scheduleColourClass(value: string | undefined): string;

/** rubix-ce's schedule document. Each map may be absent; absent reads as empty. */
export declare interface ScheduleDocument {
    /** The names an entry may use. Missing: `["Default"]`, default `"Default"`. */
    config?: {
        names?: string[];
        default_name?: string;
    };
    schedules: {
        weekly?: Record<string, WeeklyEntry>;
        events?: Record<string, DatedEntry>;
        exception?: Record<string, DatedEntry>;
    };
}

/** One global schedule record. */
export declare interface ScheduleRecord {
    id: string;
    name: string;
    description?: string;
    /** The schedule's own colour, `#rrggbb`. */
    color?: string;
    enabled: boolean;
    timezone: string;
    use_utc: boolean;
    priority: number;
    enable_payload?: boolean;
    min_payload?: number;
    max_payload?: number;
    default_payload?: number;
    schedule: ScheduleDocument;
    /** The stored revision. Every save sends it back: the host refuses a save whose `rev` is not the
     *  stored one, and `0` means "create; must not exist yet". */
    rev: number;
}

export declare const ScrollArea: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ScrollBar: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

/** One block of one day: `name` runs from `start` to `end`, both minutes, `end` inclusive. */
export declare interface Seg {
    start: number;
    end: number;
    name: string;
}

/** `md` (36px, 14px text) is the form size and matches `Input`; `sm` (32px, 12px) is the chrome size
 *  for a toolbar or a dense row. The native numeric `size` attribute is not exposed: a list box is a
 *  different control. */
export declare function Select({ className, size, ...props }: Omit<React_2.ComponentProps<"select">, "size"> & {
    size?: "md" | "sm";
}): React_2.JSX.Element;

export declare const Separator: React_2.ForwardRefExoticComponent<Omit<SeparatorProps, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

declare interface SeparatorProps extends React_2.ComponentProps<"div"> {
    orientation?: "horizontal" | "vertical";
    /** Purely visual (no semantic separation) — omit it from the a11y tree. */
    decorative?: boolean;
}

export declare function Sheet({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Root>): React_2.JSX.Element;

export declare const SheetContent: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    side?: "top" | "right" | "bottom" | "left";
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const SheetDescription: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare function SheetHeader({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare const SheetTitle: React_2.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX_2.Element;

export declare function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>): JSX_2.Element;

export declare interface Swatch {
    /** The stored color value (a semantic name or a hex literal). */
    value: string;
    /** The CSS color painted on the swatch. */
    css: string;
    /** Human name for the tooltip/label — the stored `value` is a storage key ("accent"), not what an
     *  author calls the color ("Theme accent"). Absent ⇒ the value reads well enough on its own. */
    label?: string;
}

export declare const Switch: React_2.ForwardRefExoticComponent<Omit<SwitchProps, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

declare interface SwitchProps extends Omit<React_2.ComponentProps<"button">, "onChange" | "type"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export declare function Table({ className, ...props }: React_2.ComponentProps<"table">): React_2.JSX.Element;

export declare function TableBody({ className, ...props }: React_2.ComponentProps<"tbody">): React_2.JSX.Element;

export declare function TableCell({ className, ...props }: React_2.ComponentProps<"td">): React_2.JSX.Element;

export declare function TableHead({ className, ...props }: React_2.ComponentProps<"th">): React_2.JSX.Element;

export declare function TableHeader({ className, sticky, ...props }: React_2.ComponentProps<"thead"> & {
    /** Pin the header so it stays put while rows scroll (matches the `DataView` treatment). */
    sticky?: boolean;
}): React_2.JSX.Element;

export declare function TableRow({ className, ...props }: React_2.ComponentProps<"tr">): React_2.JSX.Element;

export declare function Tabs({ value, onValueChange, className, ...props }: TabsProps): React_2.JSX.Element;

export declare function TabsContent({ value, className, children, ...props }: TabsContentProps): React_2.JSX.Element | null;

declare interface TabsContentProps extends React_2.ComponentProps<"div"> {
    value: string;
}

export declare function TabsList({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

declare interface TabsProps extends React_2.ComponentProps<"div"> {
    value: string;
    onValueChange: (v: string) => void;
}

export declare function TabsTrigger({ value, className, ...props }: TabsTriggerProps): React_2.JSX.Element;

declare interface TabsTriggerProps extends React_2.ComponentProps<"button"> {
    value: string;
}

export declare const Textarea: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React_2.RefAttributes<HTMLTextAreaElement>>;

export declare function TimeField({ value, onChange, className, onKeyDown, onBlur, ...props }: TimeFieldProps): React_2.JSX.Element;

declare interface TimeFieldProps extends Omit<React_2.ComponentProps<"input">, "value" | "onChange"> {
    value: string;
    onChange: (text: string) => void;
}

export declare function Tooltip({ ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Root>): React_2.JSX.Element;

export declare function TooltipContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Content>): React_2.JSX.Element;

export declare function TooltipProvider({ delayDuration, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Provider>): React_2.JSX.Element;

export declare const TooltipTrigger: React_2.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare function toSaveError(e: unknown): SaveError;

export declare class Unreadable extends Error {
    readonly kind = "unreadable";
}

export declare function useClipboard(resetMs?: number): Clipboard_2;

export declare function useDialogSurface(): HTMLElement | null;

/** The container for a Radix `Portal`'s `container` prop: the provider's element, else `undefined`. */
export declare function useOverlayContainer(): HTMLElement | undefined;

/** The value a name sends; Off's is the box output default. Unknown names read as Off. */
export declare function valueOf(doc: Pick<NodeSchedule, "names">, name: string | null): number;

/** `instant` (epoch ms) as local wall time in `zone`. */
export declare function wallAt(instant: number, zone: string): Moment;

/** A weekly entry: open on `days` (lowercase day names) from `start` to `end`, `HH:MM` local wall time,
 *  the end INCLUSIVE to the minute (`17:59` runs to 17:59:59), never past midnight. A missing `enable`
 *  means on; a missing `value` means 0. */
export declare interface WeeklyEntry {
    name?: string;
    days: string[];
    start: string;
    end: string;
    value?: number;
    color?: string;
    enable?: boolean;
}

export declare function WeekStrip({ doc, className }: {
    doc: Pick<NodeSchedule, "week" | "names">;
    className?: string;
}): JSX_2.Element;

export declare function writeNodeSchedule(doc: NodeSchedule): ScheduleRecord;

/**
 * Copy `text` to the system clipboard. Resolves to whether it succeeded; never throws.
 *
 * Works in a secure context (HTTPS / localhost / the Tauri webview) via the async Clipboard API, and in
 * an insecure one (plain HTTP on a LAN address) via the legacy `execCommand` fallback.
 *
 * **Call it directly from the user-gesture handler.** The legacy fallback is only honoured inside the
 * gesture's own task, so `await`-ing something else first will break copying for HTTP users while
 * continuing to work for you on localhost:
 *
 * ```ts
 * onClick={() => void writeText(text)}          // ✅
 * onClick={async () => { await load(); writeText(text) }}   // ❌ gesture spent — HTTP users get nothing
 * ```
 */
export declare function writeText(text: string): Promise<boolean>;

export { }
