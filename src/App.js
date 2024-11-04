// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Register from "./Register/Register";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}

export default App;
