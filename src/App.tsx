import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Feed from './components/feed/Feed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Feed />} path='/feed' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
