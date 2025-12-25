import {
  BuildingOffice2Icon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import RatingStars from "../ui/RatingStars";

export function HotelDetail({ hotel }) {
  if (!hotel) return null;
  return (
    <div className="flex flex-col items-start gap-4">
      <TextIcon icon={BuildingOffice2Icon}>
        <h3 className="text-3xl font-heading font-semibold text-tSecondary">
          {hotel.name}
        </h3>
      </TextIcon>
      <div className="flex gap-3 items-center">
        <StarIcon className="w-8" />
        <RatingStars star={hotel.rating} w={"6"} />
      </div>
      <TextIcon icon={MapPinIcon}>
        <p className="text-lg text-tSecondary font-body line-clamp-2">
          {hotel.address}
        </p>
      </TextIcon>
      <Description description={hotel.description} />
    </div>
  );
}
function TextIcon({ children, icon: Icon }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-3 items-center">
        <Icon className="w-8" />
        {children}
      </div>
    </div>
  );
}
function Description({ description }) {
  return (
    <div className={`flex flex-col gap-2 items-start`}>
      <span className="font-heading text-tSecondary font-semibold text-xl">
        About
      </span>
      <p
        className={`font-body text-tPrimary text-start max-w-lg leading-relaxed`}
      >
        {description}
      </p>
    </div>
  );
}
