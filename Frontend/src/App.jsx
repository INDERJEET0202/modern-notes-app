import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './pages/Auth/LoginForm'
import SignupForm from './pages/Auth/SignupForm'
import NotesPage from './pages/NotesPage/NotesPage';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
const userId = localStorage.getItem('userId');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

