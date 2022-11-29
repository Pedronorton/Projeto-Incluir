import React, { useEffect } from "react";
import { useUser } from "../context/userContext";

import { Navigate } from "react-router-dom";
import ResponsiveAppBar from "../navbar/navbar";
import Cookies from "js-cookie";

export function Privateroute({ children }) {
  const { isAuth, user } = useUser();
  useEffect(() => {
    console.log(isAuth);
    console.log(user);
  }, []);

  return isAuth ? (
    <div>
      <ResponsiveAppBar /> {children}
    </div>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
}
