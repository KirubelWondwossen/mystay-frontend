import { useEffect, useState } from "react";
import { getHotel, getManagerInfo } from "../services/getAPi";
import { Loader } from "../components/ui/Loader";
import toast, { Toaster } from "react-hot-toast";

import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
// Leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Map } from "../components/ui/Map";
import { useAuth } from "../context/AuthContext";
import { HotelDetail } from "../components/hotel/HotelDetail";
import Button from "../components/ui/Button";
import { updateHotel } from "../services/patchAPI";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function ManagerHotelInfo() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [hotelId, setHotelId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const manager = await getManagerInfo(token);
        const id = manager.hotel.id;

        setHotelId(id);

        const hotelData = await getHotel(id);
        setHotel(hotelData);
      } catch (e) {
        setError(e.message);
        setHotel(null);
        setError("Hotel not found");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleUpdateHotel = async (data) => {
    try {
      setLoading(true);

      await updateHotel(hotelId, token, data);

      const updatedHotel = await getHotel(hotelId);
      setHotel(updatedHotel);
      toast.success("Hotel information updated successfully");
      setOpenModal(false);
    } catch (e) {
      console.error("Failed to update hotel", e);
      setError("Failed to update hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManagerLayout>
      {loading && <Loader loading={loading} />}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="max-w-[140rem] mx-auto flex flex-col gap-3">
          <ManagerTopComponents header="Hotel Information"></ManagerTopComponents>
          <ImageDetail>
            {hotel && hotel.exact_location && (
              <Map
                latitude={Number(hotel.exact_location.latitude)}
                longitude={Number(hotel.exact_location.longitude)}
                location={hotel.address}
              />
            )}
            <HotelDetail hotel={hotel} />
          </ImageDetail>
          <Button
            onClick={() => setOpenModal(true)}
            className="bg-primary rounded-lg p-2 text-white hover:bg-[#4338ca]"
          >
            Update Hotel
          </Button>
          <UpdateHotelModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            hotel={hotel}
            onSubmit={handleUpdateHotel}
          />
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            minWidth: "250px",
            maxWidth: "600px",
          },
        }}
      />
    </ManagerLayout>
  );
}

function ImageDetail({ children }) {
  return (
    <div className="w-full grid grid-cols-[1fr_0.8fr] gap-20 border border-primary-800 py-3 mb-8 relative">
      {children}
    </div>
  );
}

function UpdateHotelModal({ open, onClose, hotel, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    rating: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        description: hotel.description || "",
        address: hotel.address || "",
        rating: hotel.rating || "",
        latitude: hotel.exact_location?.latitude || "",
        longitude: hotel.exact_location?.longitude || "",
      });
    }
  }, [hotel]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name: formData.name,
      description: formData.description,
      address: formData.address,
      rating: Number(formData.rating),
      exact_location: {
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50">
      <div className="relative z-[2100] bg-white w-[600px] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-heading font-bold text-tSecondary mb-4">
          Update Hotel
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <LabelInput
            label="Hotel Name"
            name="name"
            type="text"
            value={formData.name}
            setFormData={setFormData}
          />

          <LabelInput
            label="Rating"
            name="rating"
            type="number"
            min={0}
            max={5}
            value={formData.rating}
            setFormData={setFormData}
          />

          <LabelInput
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            setFormData={setFormData}
          />

          <LabelInput
            label="Latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            setFormData={setFormData}
          />

          <LabelInput
            label="Longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            setFormData={setFormData}
          />

          <LabelInput
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            setFormData={setFormData}
          />

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <Button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#4338ca]"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LabelInput({ label, name, type, min, max, setFormData, value }) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  return (
    <div
      className={`flex flex-col gap-2 ${
        type === "textarea" ? "col-span-2" : ""
      }`}
    >
      <label className="font-body font-medium text-tSecondary">{label}</label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={handleChange}
          className="border h-24 border-[#d1d5db] rounded-md px-3 py-2"
          required
        />
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          className="border border-[#d1d5db] rounded-md px-3 py-2"
          required
        />
      )}
    </div>
  );
}

export default ManagerHotelInfo;
