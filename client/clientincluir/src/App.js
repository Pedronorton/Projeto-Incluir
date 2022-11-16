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
import Cookie from "js-cookie";
import DataService from "./service/dataService";
import AppRoutes from "./routes";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { feedbackAlert, setAlert } = useAlert();
  const [vertical] = useState("top");
  const [horizontal] = useState("center");

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
      {/* <BrowserRouter>
        <Snackbar
          open={feedbackAlert ? feedbackAlert.active : false}
          place="bc"
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={2000}
          onClose={() =>
            setAlert({
              active: false,
              text: "",
              color: "",
              sevarity: "",
            })
          }
        >
          <Alert severity={feedbackAlert.sevarity} sx={{ width: "100%" }}>
            {feedbackAlert.text}
          </Alert>
        </Snackbar>
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
          <Route exact path="/clazz" element={<Clazz />}></Route>
          <Route exact path="/clazzTime" element={<ClazzTime />}></Route>
          <Route exact path="/presenca" element={<Presence />}></Route>
          <PrivateRoute
            isAuth={isAuth}
            isAlive={isAlive}
            isAdmin={isAdmin}
            path="/"
            component={Admin}
          />
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter> */}
      <AppRoutes />
    </div>
  );
}

export default App;
