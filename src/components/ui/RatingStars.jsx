import { StarIcon } from "@heroicons/react/24/solid";

export default function RatingStars({ star, w }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: star }, (_, i) => i + 1).map((_, i) => (
        <StarIcon className={`w-${w} text-[#FFD700]`} key={i} />
      ))}
    </div>
  );
}
