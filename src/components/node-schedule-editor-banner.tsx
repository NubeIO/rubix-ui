// The one message under the editor's header, most pressing first: not saved (changed elsewhere), the
// latest version loaded with the edit on top, the backend needs upgrading, a save refused for another
// reason, or switched off. Copy from the design; the conflict copy drops who and when (brief,
// decision 2: lb does not store them).
//
// One responsibility: pick and draw the editor's banner.

import type { ReactNode } from "react";
import { CircleAlert, Info, Power, TriangleAlert, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import { cn } from "../lib/cn";

import type { Conflict } from "./node-schedule-editor-draft";

interface Props {
  conflict: Conflict;
  needsUpgrade: boolean;
  error: string | null;
  enabled: boolean;
  /** "Off = 0". */
  offText: string;
  canEdit: boolean;
  onReload?: () => void;
  onSwitchOn: () => void;
}

const TONE = {
  warning: "border-warning/35 bg-warning/8 [&>svg]:text-warning",
  info: "border-info/35 bg-info/8 [&>svg]:text-info",
  destructive: "",
};

export function EditorBanner({ conflict, needsUpgrade, error, enabled, offText, canEdit, onReload, onSwitchOn }: Props) {
  if (conflict?.kind === "conflict")
    return (
      <Banner
        tone="warning"
        icon={<TriangleAlert />}
        title="Not saved: changed elsewhere"
        body="Someone else saved this schedule after you opened it. Your edit is still here. Reload to get their version; your edit is kept on top so you can check it and save again."
        action={
          onReload && (
            <Button variant="solid" size="sm" onClick={onReload}>
              Reload, keep my edit
            </Button>
          )
        }
      />
    );
  if (conflict?.kind === "reloaded")
    return (
      <Banner
        tone="info"
        icon={<Info />}
        title="Loaded the latest version"
        body={`Your unsaved edit is applied on top of it: ${conflict.applied.join(" · ") || "none"}. Check it, then save, or discard your edit to keep the saved version.`}
      />
    );
  if (needsUpgrade)
    return (
      <Banner
        tone="warning"
        icon={<Upload />}
        title="This node's backend needs upgrading"
        body="It can't store names, values or dated entries yet. You can look and try changes, but nothing will save until the node is upgraded."
      />
    );
  if (error)
    return <Banner tone="destructive" icon={<CircleAlert />} title="Not saved" body={error} />;
  if (!enabled)
    return (
      <Banner
        tone="info"
        icon={<Power />}
        title="Switched off"
        body={`Dashboards and flows read ${offText} until it's switched back on. Boxes keep running the hours they already have.`}
        action={
          canEdit && (
            <Button variant="outline" size="sm" onClick={onSwitchOn}>
              Switch on
            </Button>
          )
        }
      />
    );
  return null;
}

interface BannerProps {
  tone: keyof typeof TONE;
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}

function Banner({ tone, icon, title, body, action }: BannerProps) {
  return (
    <div className="px-4 pt-3">
      <Alert
        role="alert"
        variant={tone === "destructive" ? "destructive" : "default"}
        className={cn("flex items-start gap-3", TONE[tone])}
      >
        {icon}
        <div className="grid min-w-0 flex-1 gap-0.5">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{body}</AlertDescription>
        </div>
        {action}
      </Alert>
    </div>
  );
}
