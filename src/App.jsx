import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDasboard from "./pages/UserDashboard";
import About from "./pages/About";
import ProfileHome from "./pages/ProfileHome";
import ProfileInfo from "./pages/ProfileInfo";
import ProfileReservations from "./pages/ProfileReservations";
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
          <Route path="/profileinfo " element={<ProfileInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
