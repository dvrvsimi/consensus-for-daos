import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";

const App = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };
  return (
    <div>
      <Router>
        {/* Adding Navbar to be visible on all pages */}
        <Routes>
          <Route path="/" element={<LandingPage onClick={handleClick} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
