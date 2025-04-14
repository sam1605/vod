import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import VersePage from "./components/VersePage";
import "./app.css";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/verse" element={<VersePage />} />
      </Routes>
    </Router>
  );
};

export default App;
