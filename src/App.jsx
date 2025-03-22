import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// COMPONENTS
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import BurgerMenu from "./components/BurgerMenu";

// PAGES
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
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
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
