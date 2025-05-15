import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import NoPage from "../pages/NoPage/NoPage";

export default function UnAuthLayout() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="admin-login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}
