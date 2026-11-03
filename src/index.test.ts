import { describe, expect, it } from "vitest";

import * as ui from "./index";

// The entry is the package's whole public surface; a component that drops out of it breaks every
// consumer that imports it, with no error until their build.
describe("@nube/rubix-ui entry", () => {
  it("exports every component", () => {
    const names = [
      "cn",
      "Alert",
      "AlertTitle",
      "AlertDescription",
      "alertVariants",
      "Badge",
      "badgeVariants",
      "Button",
      "buttonVariants",
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
      "Checkbox",
      "Input",
      "Label",
      "Separator",
      "Skeleton",
      "Spinner",
      "Switch",
      "Table",
      "TableHeader",
      "TableBody",
      "TableRow",
      "TableHead",
      "TableCell",
      "Textarea",
    ];
    for (const n of names) expect(ui[n as keyof typeof ui], n).toBeDefined();
  });
});
