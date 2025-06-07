import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// COMPONENTS
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import BurgerMenu from "@components/BurgerMenu";
import ScrollToTop from "@components/ScrollToTop";

// PAGES
import Home from "@pages/Home";
import About from "@pages/About";
import Services from "@pages/Services";
import Contact from "@pages/Contact";
import MissionVision from "@pages/MissionVision";
import Location from "@pages/Location";
import Projects from "@pages/Projects";
import Program from "@pages/Program";
import DefaultPage from "@pages/DefaultPage";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      {/* Pass toggle function to Navbar */}
      <Navbar onToggleMenu={() => setMenuOpen(true)} />

      {/* Conditionally render BurgerMenu */}
      <AnimatePresence>
        {menuOpen && <BurgerMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          <Route path="/location" element={<Location />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/program" element={<Program />} />
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
