// What a Combobox lists, and how its search narrows and groups it.
//
// One responsibility: the option model (type, filter, grouping).

export interface ComboboxOption {
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

/** Case-insensitive filter over value + label + description. */
export function matches(o: ComboboxOption, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    o.value.toLowerCase().includes(needle) ||
    (o.label ?? "").toLowerCase().includes(needle) ||
    (o.description ?? "").toLowerCase().includes(needle)
  );
}

export interface OptionGroup {
  name: string | undefined;
  /** Each option with its index in the filtered list (the keyboard's position). */
  items: Array<{ o: ComboboxOption; idx: number }>;
}

/** The filtered options in first-seen group order; ungrouped options come first. */
export function groupOptions(filtered: ComboboxOption[]): OptionGroup[] {
  const groups: OptionGroup[] = [];
  filtered.forEach((o, idx) => {
    const g = groups.find((x) => x.name === o.group);
    if (g) g.items.push({ o, idx });
    else groups.push({ name: o.group, items: [{ o, idx }] });
  });
  return groups;
}
