// The package's one entry. Everything a consumer may use is exported here; anything not listed is
// internal.
//
// The stylesheet import is what makes `dist/rubix-ui.css` (the `./scoped.css` export) exist. The JS
// bundle does not load it: the rubix-ai app compiles these components' classes with its own Tailwind,
// and an extension adds the stylesheet to its own `styles` (see README).
import "./styles/scoped.css";

export { cn } from "./lib/cn";
export { RubixUiProvider } from "./lib/provider";
export { useOverlayContainer } from "./lib/overlay";
export type { RubixUiMotion, RevealProps, CollapseProps } from "./lib/motion";
export { writeText, canWriteText, useClipboard, type Clipboard } from "./lib/clipboard";

export { Alert, AlertTitle, AlertDescription, alertVariants } from "./components/alert";
export { DatePicker } from "./components/date-picker";
export { EmptyState } from "./components/empty-state";
export { Pager, PAGE_SIZES, DEFAULT_PAGE_SIZE } from "./components/pager";
export { Radio } from "./components/radio";
export { TimeField } from "./components/time-field";
export { parseTime, hhmm, DAY_MINS } from "./lib/time";
export { formatDay, localToday } from "./lib/date";
export { Badge, badgeVariants } from "./components/badge";
export { Button, buttonVariants } from "./components/button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card";
export { Checkbox } from "./components/checkbox";
export { Input } from "./components/input";
export { Label } from "./components/label";
export { Separator } from "./components/separator";
export { Skeleton } from "./components/skeleton";
export { Spinner } from "./components/spinner";
export { Switch } from "./components/switch";
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./components/table";
export { Textarea } from "./components/textarea";
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./components/collapsible";
export { Combobox, type ComboboxOption } from "./components/combobox";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogSurfaceContext,
  useDialogSurface,
} from "./components/dialog";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/dropdown-menu";
export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./components/menubar";
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "./components/popover";
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./components/sheet";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/tooltip";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/breadcrumb";
export { ColorSwatchPicker, type Swatch } from "./components/color-swatch";
export { CopyButton } from "./components/copy-button";
export { Select } from "./components/select";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs";
export { nameColour, type NameTone } from "./lib/colour/nameColour";
export { SCHEDULE_COLOURS, scheduleColourClass, type ScheduleColour } from "./lib/colour/scheduleColour";
export type {
  ScheduleEntryKind,
  ScheduleSpan,
  ScheduleNote,
  ScheduleDay,
  ScheduleMoment,
  ScheduleRef,
  ScheduleWeekRow,
  ScheduleChip,
  ScheduleMonthDay,
  ScheduleListEntry,
  ScheduleLegendItem,
} from "./components/schedule-calendar-types";
export { ScheduleWeekCalendar, type ScheduleWeekCalendarProps } from "./components/schedule-week-calendar";
export { ScheduleWeekRows, type ScheduleWeekRowsProps } from "./components/schedule-week-rows";
export { ScheduleMonthGrid, type ScheduleMonthGridProps } from "./components/schedule-month-grid";
export {
  AllSchedulesView,
  CHIP_LIMIT,
  type AllSchedulesViewProps,
  type AllSchedulesViewMode,
} from "./components/all-schedules-view";
export { WeekStrip, type WeekStripSegment } from "./components/week-strip";
export { NameSwatch } from "./components/name-swatch";
export { FilterTiles, type FilterTile, type FilterTilesProps } from "./components/filter-tiles";
export { FacetChip, type FacetChipProps } from "./components/facet-chip";
