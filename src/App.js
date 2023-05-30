import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Transfer } from './pages';



function App() {
  const [view, setView] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(window.web3);

  return (
    <div>
        <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
