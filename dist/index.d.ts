import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import { JSX as JSX_2 } from 'react';
import { Loader2 } from 'lucide-react';
import * as React_2 from 'react';
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

export declare const Input: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React_2.RefAttributes<HTMLInputElement>>;

export declare const Label: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & React_2.RefAttributes<HTMLLabelElement>>;

export declare const Separator: React_2.ForwardRefExoticComponent<Omit<SeparatorProps, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

declare interface SeparatorProps extends React_2.ComponentProps<"div"> {
    orientation?: "horizontal" | "vertical";
    /** Purely visual (no semantic separation) — omit it from the a11y tree. */
    decorative?: boolean;
}

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

export { }
