// The package's one entry. Everything a consumer may use is exported here; anything not listed is
// internal.
//
// The stylesheet import is what makes `dist/rubix-ui.css` (the `./scoped.css` export) exist. The JS
// bundle does not load it: the rubix-ai app compiles these components' classes with its own Tailwind,
// and an extension adds the stylesheet to its own `styles` (see README).
import "./styles/scoped.css";

export { cn } from "./lib/cn";

export { Alert, AlertTitle, AlertDescription, alertVariants } from "./components/alert";
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
