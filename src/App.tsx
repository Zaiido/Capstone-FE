import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Feed from './components/feed/Feed';
import Network from './components/network/Network';
import Messages from './components/messages/Messages';
import Garden from './components/garden/Garden';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Feed />} path='/feed' />
        <Route element={<Network />} path='/network' />
        <Route element={<Messages />} path='/messages' />
        <Route element={<Garden />} path='/garden' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
