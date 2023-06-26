import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import EmployeeCard from "./components/EmployeeCard/Employee";
import Manager from "./pages/Manager/Manager";
import { isLoggedIn } from "./utils/authService";

function App() {
  const isLoggedUser = isLoggedIn();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {!isLoggedUser ? (
            <Route path="*" element={<Navigate to="/login" />} />
          ) : (
            <Route path="/" element={<EmployeeCard />} />
          )}
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
