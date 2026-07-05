import type { TaskStatus } from "../../types";

const options: Array<{ value: TaskStatus; label: string }> = [
  { value: "not-started", label: "Not started" },
  { value: "needs-review", label: "Needs review" },
  { value: "not-ready", label: "Not ready" },
  { value: "ready", label: "Practice ready" },
];

export function StatusSelect({
  value,
  onChange,
  label,
}: {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
  label: string;
}) {
  return (
    <label className="status-select-label">
      <span className="sr-only">{label}</span>
      <select className="status-select" value={value} onChange={(event) => onChange(event.target.value as TaskStatus)}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
