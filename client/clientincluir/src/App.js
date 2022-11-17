import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Clazz from "./views/Clazz/Clazz";
import Presence from "./views/Presence/Presence";
import ClazzTime from "./views/ClazzTime";
import Login from "./views/Login/Login";
import { Snackbar } from "@mui/material";
import { useAlert } from "../src/context/Feedback/alertContext";
import { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
// import Cookie from "js-cookie";
import DataService from "./service/dataService";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Rotas } from "./routes";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { feedbackAlert, setAlert } = useAlert();
  const [vertical] = useState("top");
  const [horizontal] = useState("center");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  // useEffect(() => {
  //   const storageToken = Cookie.get("token");
  //   const storageMail = Cookie.get("userMail");

  //   DataService.getUserByEmail(storageMail, {
  //     headers: {
  //       Authorization: storageToken,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.data.id !== undefined) {
  //         setIsAuth(true);
  //         setUser(response.data);
  //         checkAdmin(response.data);
  //         setCredential(storageToken);
  //       } else {
  //         setIsAuth(false);
  //         Cookie.remove("token");
  //         Cookie.remove("userMail");
  //       }
  //     })
  //     .catch(() => {
  //       setIsAuth(false);
  //       Cookie.remove("token");
  //       Cookie.remove("userMail");
  //     });
  // }, []);

  return (
    <div className="App">
      <Rotas />
    </div>
  );
}

export default App;
