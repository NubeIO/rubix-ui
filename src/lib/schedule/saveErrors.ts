// A failed schedule save as one of the cases the editor answers differently:
//   - ChangedElsewhere: lb refused the `rev` (`schedule_stale`, "changed elsewhere"; `saveSchedule`
//     words it "Someone else changed this schedule"). The editor keeps the draft and offers a reload.
//   - BackendNeedsUpgrade: the node's lb predates the new record (`saveSchedule` sends nothing and
//     says "Backend needs upgrading: schedules can't be changed ..."). Save stays disabled.
//   - Unreadable: the stored row is in the old shape or does not decode (`schedule_old_shape`, or
//     `getSchedule`'s "in the old format"). The editor offers Recreate.
// Anything else is passed through as it came, to be shown in its own words.
//
// One responsibility: classify a save error. Pure.

export class ChangedElsewhere extends Error {
  readonly kind = "changed-elsewhere";
}
export class BackendNeedsUpgrade extends Error {
  readonly kind = "backend-needs-upgrade";
}
export class Unreadable extends Error {
  readonly kind = "unreadable";
}

export type SaveError = ChangedElsewhere | BackendNeedsUpgrade | Unreadable | Error;

export function toSaveError(e: unknown): SaveError {
  if (e instanceof ChangedElsewhere || e instanceof BackendNeedsUpgrade || e instanceof Unreadable) return e;
  const message = e instanceof Error ? e.message : String(e);
  if (/schedule_stale|changed elsewhere|someone else changed/i.test(message))
    return new ChangedElsewhere(message);
  if (/schedule_old_shape|old format|old shape/i.test(message)) return new Unreadable(message);
  if (/backend needs upgrading/i.test(message)) return new BackendNeedsUpgrade(message);
  return e instanceof Error ? e : new Error(message);
}
