export function HoteDescription({ description }) {
  return (
    <div
      className={`flex gap-3 ${
        description?.length > 77 ? "items-start" : "items-center"
      }  px-4`}
    >
      <span className="font-heading text-tSecondary font-semibold bg-[#f9fafb] p-3 rounded-md">
        Hotel Description
      </span>
      <p
        className={`font-body text-sm text-tPrimary text-start max-w-lg leading-relaxed `}
      >
        {description}
      </p>
    </div>
  );
}
