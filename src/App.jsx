import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDasboard from "./pages/UserDashboard";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Router>
        <Routes>
          <Route path="/" element={<UserDasboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
