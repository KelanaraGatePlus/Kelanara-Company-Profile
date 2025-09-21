import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import News from "./components/pages/News";
import NewsDetails from "./components/pages/NewsDetails";
import Contact from "./components/pages/Contact";
import Project from "./components/pages/Project";
import ProjectDetails from "./components/pages/ProjectDetails";
import Interpartnership from "./components/pages/Interpartnership";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/kelanara" element={<Project />} />
        <Route path="/media" element={<News />} />
        <Route path="/media/:id" element={<NewsDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/interpartnership" element={<Interpartnership />} />
      </Routes>
    </Router>
  );
}

export default App;