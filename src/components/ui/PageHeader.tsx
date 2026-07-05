export function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </header>
  );
}
