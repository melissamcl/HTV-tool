import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './styles/main.scss';
import NewUpload from './components/NewUpload';
import Inventory from './components/Inventory';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={Home} /> */}
          <Route path="/new-upload" element={<NewUpload />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* <Route path="*" element={<NotFound />} /> 404 Not Found */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
