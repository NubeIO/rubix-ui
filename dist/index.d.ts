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

export declare function Card({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardContent({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardDescription({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardFooter({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardHeader({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function CardTitle({ className, ...props }: React_2.ComponentProps<"div">): React_2.JSX.Element;

export declare function Checkbox({ className, ...props }: React_2.ComponentProps<"input">): React_2.JSX.Element;

export declare function cn(...inputs: ClassValue[]): string;

export declare const Collapsible: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & RefAttributes<HTMLDivElement>>;

export declare const CollapsibleContent: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & RefAttributes<HTMLDivElement>>;

export declare const CollapsibleTrigger: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & RefAttributes<HTMLButtonElement>>;

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

export declare function RubixUiProvider({ portalContainer, children }: RubixUiProviderProps): React_2.JSX.Element;

declare interface RubixUiProviderProps {
    /** The element popups render into. `null`/omitted ⇒ `document.body` (Radix's default). */
    portalContainer?: HTMLElement | null;
    children: React_2.ReactNode;
}

export declare const ScrollArea: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ScrollBar: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

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

export declare const Textarea: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & React_2.RefAttributes<HTMLTextAreaElement>>;

export declare function Tooltip({ ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Root>): React_2.JSX.Element;

export declare function TooltipContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Content>): React_2.JSX.Element;

export declare function TooltipProvider({ delayDuration, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Provider>): React_2.JSX.Element;

export declare const TooltipTrigger: React_2.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare function useDialogSurface(): HTMLElement | null;

/** The container for a Radix `Portal`'s `container` prop: the provider's element, else `undefined`. */
export declare function useOverlayContainer(): HTMLElement | undefined;

export { }
