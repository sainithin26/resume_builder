import React from "react";
import "./App.css";
import Body from "./components/Body/Body";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumeDetails from "./components/ResumeDetails/ResumeDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/resumeTemplate/:id" element={<ResumeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;