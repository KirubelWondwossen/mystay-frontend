import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDasboard from "./pages/UserDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDasboard />} />
      </Routes>
    </Router>
  );
}

export default App;
