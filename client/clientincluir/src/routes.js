import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login/Login";

const PrivateRoute = ({
  component: Component,
  isAuth,
  isAlive,
  isAdmin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        false ? (
          <Component {...props} auth={true} />
        ) : (
          <Navigate
            to={{ pathname: "/login", state: { from: props.location } }}
          ></Navigate>
        )
      }
    />
  );
};

const AppRoutes = () => {
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />}></Route>
      {/* <PrivateRoute path="/" component={<Dashboard />}></PrivateRoute> */}
    </Routes>
  </BrowserRouter>;
};

export default AppRoutes;
