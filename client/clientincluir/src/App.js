import * as React from "react";
import "./App.css";
import { useAlert } from "../src/context/Feedback/alertContext";
import { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
// import Cookie from "js-cookie";
import DataService from "./service/dataService";
import { useUser } from "./context/userContext";

import { Rotas } from "./routes";
import Cookies from "js-cookie";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { feedbackAlert, setAlert } = useAlert();
  const [vertical] = useState("top");
  const [horizontal] = useState("center");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { setIsAuth, setUser, setCredential } = useUser();
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

  useEffect(() => {
    const storageToken = Cookies.get("token");
    const storageMail = Cookies.get("userMail");
    DataService.getUserByEmail(storageMail, {
      headers: {
        Authorization: storageToken,
      },
    })
      .then((response) => {
        if (response.data.id !== undefined) {
          setIsAuth(true);
          setUser(response.data);
          // checkAdmin(response.data);
          setCredential(storageToken);
        } else {
          setIsAuth(false);
          Cookies.remove("token");
          Cookies.remove("userMail");
        }
      })
      .catch(() => {
        setIsAuth(false);
        Cookies.remove("token");
        Cookies.remove("userMail");
      });
  }, []);

  return (
    <div className="App">
      <Rotas />
    </div>
  );
}

export default App;
