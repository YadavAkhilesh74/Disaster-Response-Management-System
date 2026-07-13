import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportIncident from "./pages/ReportIncident";
import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidentDetails"
import About from "./pages/About";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ProtectedRoute><ReportIncident /></ProtectedRoute>} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/incidents/:id" element={<IncidentDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
       <ToastContainer
        position="top-right"
        autoClose={3000}
    />
    </>
  );
}

export default App;