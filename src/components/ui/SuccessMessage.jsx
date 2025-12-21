export function SuccessMessage({ title, description }) {
  return (
    <div className="bg-white p-8 rounded-md shadow-md text-center max-w-md">
      <h3 className="font-heading text-xl text-primary font-semibold">
        {title}
      </h3>
      {description && (
        <p className="font-body text-sm text-tSecondary mt-3">{description}</p>
      )}
    </div>
  );
}
