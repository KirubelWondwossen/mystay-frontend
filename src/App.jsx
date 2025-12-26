import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDasboard from "./pages/UserDashboard";
import About from "./pages/About";
import ProfileHome from "./pages/ProfileHome";
import ProfileInfo from "./pages/ProfileInfo";
import ProfileReservations from "./pages/ProfileReservations";
import WishList from "./pages/Wishlist";
import ManagerHome from "./pages/ManagerHome";
import ManagerBookings from "./pages/ManagerBookings";
import ManagerBookingsDetail from "./pages/ManagerBookingsDetail";
import ManagerRooms from "./pages/ManagerRooms";
import ManagerApplication from "./pages/ManagerApplication";
import AdminApplication from "./pages/AdminApplication";
import AdminApplicationDetails from "./pages/AdminApplicationDetalis";
import ManagerProfile from "./pages/ManagerProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import ManagerLogin from "./pages/ManagerLogin";
import AdminManagerList from "./pages/AdminManagersList";
import AdminManagerDetail from "./pages/AdminManagerDetail";
import GuestRoomDetail from "./pages/GuestRoomDetail";
import HotelInfo from "./pages/HotelInfo";
import ManagerHotelInfo from "./pages/ManagerHotelInfo";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Routes>
          {/* Guest */}
          <Route path="/" element={<UserDasboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/home" element={<ProfileHome />} />
          <Route
            path="/guest/reservations/:id"
            element={<ProfileReservations />}
          />
          <Route path="/profile/info" element={<ProfileInfo />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route
            path="/hotel/:hotelId/room/:roomId"
            element={<GuestRoomDetail />}
          />

          {/* Manager  */}
          <Route path="/manager/login" element={<ManagerLogin />} />
          <Route
            path="/manager/home"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/bookings"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerBookingsDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/rooms"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/profile/:id"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/hotel/info"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerHotelInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/manager/application" element={<ManagerApplication />} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/application"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/application/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminApplicationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminManagerDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/managerslist"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminManagerList />
              </ProtectedRoute>
            }
          />
          <Route path="/hotel/:id" element={<HotelInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
