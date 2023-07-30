import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.scss';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Account from './pages/Home/Account/Account';
import Groups from './pages/Home/Groups/Groups';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/dashboard/:key" element={<Home />} />
        <Route path="/dashboard/:key/account" element={<Account />} />
        <Route path="/dashboard/:key/groups" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
