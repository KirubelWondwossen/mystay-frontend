export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="font-heading text-lg text-tPrimary font-semibold">
        {title}
      </h3>
      <p className="font-body text-sm text-tSecondary mt-2">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
