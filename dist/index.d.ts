import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ForwardRefExoticComponent } from 'react';
import { JSX as JSX_2 } from 'react';
import { Loader2 } from 'lucide-react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React_2 from 'react';
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
    variant?: "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Badge({ className, variant, pill, size, ...props }: React_2.ComponentProps<"span"> & VariantProps<typeof badgeVariants>): React_2.JSX.Element;

export declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "secondary" | "outline" | "success" | "warning" | "info" | "accent2" | null | undefined;
    pill?: boolean | null | undefined;
    size?: "default" | "count" | null | undefined;
} & ClassProp) | undefined) => string;

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
    variant?: "default" | "destructive" | "outline" | "solid" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "solid" | "ghost" | null | undefined;
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

export declare function Combobox({ options, value, onChange, placeholder, "aria-label": ariaLabel, allowCustom, clearable, disabled, size, renderValue, className, }: ComboboxProps): React_2.JSX.Element;

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
    className?: string;
}

export declare function CopyButton({ text, label, copiedLabel, variant, size, className, ariaLabel, }: Props): JSX_2.Element;

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

export declare const Input: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React_2.RefAttributes<HTMLInputElement>>;

export declare const Label: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & React_2.RefAttributes<HTMLLabelElement>>;

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

export declare const ScrollArea: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ScrollBar: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

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

export declare function Tooltip({ ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Root>): React_2.JSX.Element;

export declare function TooltipContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Content>): React_2.JSX.Element;

export declare function TooltipProvider({ delayDuration, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Provider>): React_2.JSX.Element;

export declare const TooltipTrigger: React_2.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare function useClipboard(resetMs?: number): Clipboard_2;

export declare function useDialogSurface(): HTMLElement | null;

/** The container for a Radix `Portal`'s `container` prop: the provider's element, else `undefined`. */
export declare function useOverlayContainer(): HTMLElement | undefined;

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
