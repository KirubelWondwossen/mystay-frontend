import { StarIcon } from "@heroicons/react/24/solid";

export function AdminAppTitleValue({ title, value, star }) {
  return (
    <div className="flex gap-3 items-center px-4 py-">
      <span className="font-heading text-tSecondary font-semibold bg-[#f9fafb] p-3 rounded-md">
        {title}
      </span>
      {star ? (
        <div className="flex items-center">
          {Array.from({ length: star }, (_, i) => i + 1).map((_, i) => (
            <StarIcon className="w-5 text-[#FFD700]" key={i} />
          ))}
        </div>
      ) : (
        <span className="font-body text-tPrimary font-medium text-sm">
          {value}
        </span>
      )}
    </div>
  );
}
