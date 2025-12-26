import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { searchHotel } from "../../services/getAPi";
import { Link } from "react-router-dom";
import RatingStars from "../ui/RatingStars";

function Search() {
  const [value, setValue] = useState("");
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value || value.length < 2) {
      setHotels([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchHotel(value);
        setHotels(data);
        setOpen(true);
      } catch (e) {
        console.error("Search failed", e);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative w-[30rem]">
      {/* Search input */}
      <div className="rounded-2xl shadow-lg flex items-center px-5">
        <input
          type="search"
          className="dark:bg-surfaceDark text-heading text-lg p-5 focus:outline-none w-full"
          placeholder="Search hotels..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="bg-primary p-4 rounded-full">
          <MagnifyingGlassIcon className="w-6 h-6 text-white" />
        </span>
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-surfaceDark shadow-xl rounded-xl z-50 overflow-hidden">
          {loading && <p className="p-4 text-sm text-muted">Searching…</p>}

          {!loading && hotels.length === 0 && (
            <p className="p-4 text-sm text-muted">No hotels found</p>
          )}

          {!loading &&
            hotels.map((hotel) => (
              <Link
                key={hotel.id}
                to={`/hotel/${hotel.id}`}
                className="block px-5 py-4 hover:bg-gray-100 dark:hover:bg-surfaceDark/80 transition"
              >
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-heading text-start">
                    {hotel.name} ·
                  </p>
                  <RatingStars w={"4"} star={hotel.rating} />
                </div>
                <p className="text-sm text-muted flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {hotel.address}
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default Search;
