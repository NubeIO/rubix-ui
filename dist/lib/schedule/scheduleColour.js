const e = [
  { value: "chart-1", label: "Violet", bg: "bg-chart-1" },
  { value: "chart-2", label: "Teal", bg: "bg-chart-2" },
  { value: "chart-3", label: "Orange", bg: "bg-chart-3" },
  { value: "chart-4", label: "Sky", bg: "bg-chart-4" },
  { value: "chart-5", label: "Pink", bg: "bg-chart-5" },
  { value: "chart-7", label: "Amber", bg: "bg-chart-7" },
  { value: "chart-8", label: "Blue", bg: "bg-chart-8" }
];
function r(l) {
  var a;
  return ((a = e.find((b) => b.value === l)) == null ? void 0 : a.bg) ?? "bg-chart-8";
}
export {
  e as SCHEDULE_COLOURS,
  r as scheduleColourClass
};
