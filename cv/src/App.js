import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CV from './Template1/Template1'; // Đường dẫn đến template CV
import './App.css';
import Home from './Home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home />
            } 
          />
          <Route path="/CV1" element={<CV />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
