export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="font-heading text-lg text-tPrimary">{title}</p>
      <p className="font-body text-sm text-tSecondary mt-2">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
