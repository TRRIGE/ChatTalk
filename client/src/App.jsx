import React from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./pages/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Hero from "./pages/Hero.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
