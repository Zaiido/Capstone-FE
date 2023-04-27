import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Welcome />} path='/' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
