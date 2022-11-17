import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clazz from "../views/Clazz/Clazz";
import ClazzTime from "../views/ClazzTime";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login/Login";
import Presence from "../views/Presence/Presence";
import Users from "../views/Users";

import { Privateroute } from "./PrivateRoute";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/clazz"
          element={
            <Privateroute>
              <Clazz />
            </Privateroute>
          }
        />
        <Route
          path="/"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        />
        <Route
          path="/users"
          element={
            <Privateroute>
              <Users />
            </Privateroute>
          }
        />
        <Route
          path="/clazzTime"
          element={
            <Privateroute>
              <ClazzTime />
            </Privateroute>
          }
        />
        <Route
          path="/presenca"
          element={
            <Privateroute>
              <Presence />
            </Privateroute>
          }
        />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
