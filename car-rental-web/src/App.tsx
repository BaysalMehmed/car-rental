import React from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile';
import CreateProfile from './components/CreateProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
    <NavigationBar/>
    <div className='app-space'>
    <Routes>
    <Route path="/" element={<Profile/>}/>
      <Route path="/create" element={<CreateProfile/>}/>
    </Routes>
    </div>
    </BrowserRouter>
      
    
  );
}

export default App;
