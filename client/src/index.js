import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.scss';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:key" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
