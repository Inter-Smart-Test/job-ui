import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UnAuthLayout from "./UnAuthLayout";
import AuthLayout from "./AuthLayout";
import { AuthContext } from "../utils/AuthContext";

export default function Configuration() {
  const { user, setUser } = useContext(AuthContext);
  let asyncValue = {};
  const readData = async () => {
    try {
      const storedValue = await localStorage.getItem("user");
      if (storedValue !== null) {
        asyncValue = JSON.parse(storedValue);
        if (asyncValue !== null) {
          setUser(asyncValue);
        }
      }
    } catch (e) {
      console.log("Failed to fetch the input from storage", e);
    }
  };
  useEffect(() => {
    readData();
  }, []);
  console.log("user", user);
  return (
    <BrowserRouter>
      {user === null ? <UnAuthLayout /> : <AuthLayout />}
    </BrowserRouter>
  );
}
