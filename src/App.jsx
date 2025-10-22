import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Bookmarked from "./components/Bookmarked";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <div>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/bookmarks" element={<Bookmarked />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
};

export default App;
