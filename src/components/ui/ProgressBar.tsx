export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="progress-bar-wrap" aria-label={label ?? `${value}% complete`}>
      <span className="progress-bar-fill" style={{ width: `${value}%` }} />
    </div>
  );
}
