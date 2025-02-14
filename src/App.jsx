import React, { useState, useEffect } from 'react';
import './App.css';
import Envelope from './Envelope';
import Photobooth from './Photoboth';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Admin from './Admin';

function App() {
  const [messageShown, setMessageShown] = useState(false);

  // Display the message after 2 seconds and then move to the photobooth
  useEffect(() => {
    setTimeout(() => {
      setMessageShown(true);
    }, 2000); // Wait 2 seconds to display message
  }, []);

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col justify-center items-center bg-pink-100">
        {/* Title at the top */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500">
            {messageShown ? "Happy Valentine's Day!" : ''}
          </h1>
        </div>

        {/* Envelope Component */}
        <Routes>
          <Route path="/" element={<Envelope messageShown={messageShown} />} />
        </Routes>

        {/* Photobooth Component (only displays when redirected) */}
        <Routes>
          <Route path="/photobooth" element={<Photobooth />} />
        </Routes>
      </div>

      {/* Routing to Admin Page */}
      <Routes>
        <Route path='adminadminadmin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
