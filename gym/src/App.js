import "./App.css";
import REGISTER from "./Components/Register";
import LOGIN from "./Components/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Containers/Layout";
import Admin from "./Components/Admin";
import { useState } from "react";
import ViewOrders from "./Components/ViewOrders";
import { useSelector } from "react-redux";
import NotFound from "./Components/NotFound";

function App() {
  const login = useSelector((state) => state.login.login);
  return (
    <div className="body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/Register" element={<REGISTER />} />
          {login && <Route path="/admin" element={<Admin />} />}
          {login && <Route path="/allorders" element={<ViewOrders />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
