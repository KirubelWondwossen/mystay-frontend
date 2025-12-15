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
import Login from "./pages/Login";
import ManagerApplication from "./pages/ManagerApplication";
import AdminApplication from "./pages/AdminApplication";
import AdminApplicationDetails from "./pages/AdminApplicationDetalis";
import ManagerProfile from "./pages/ManagerProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
          <Routes>
            <Route path="/" element={<UserDasboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/profilehome" element={<ProfileHome />} />
            <Route
              path="/profilereservations"
              element={<ProfileReservations />}
            />
            <Route path="/profileinfo" element={<ProfileInfo />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/managerhome" element={<ManagerHome />} />
            <Route path="/managerbookings" element={<ManagerBookings />} />
            <Route path="/managerhome" element={<ManagerHome />} />
            <Route
              path="/managerbookingsdetail"
              element={<ManagerBookingsDetail />}
            />
            <Route path="/managerrooms" element={<ManagerRooms />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/managerapplication"
              element={<ManagerApplication />}
            />
            <Route
              path="/adminapplication"
              element={
                <ProtectedRoute>
                  <AdminApplication />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminapplicationdetails"
              element={<AdminApplicationDetails />}
            />
            <Route path="/managerprofile" element={<ManagerProfile />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
