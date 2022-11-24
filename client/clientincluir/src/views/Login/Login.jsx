import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useUser } from "../../context/userContext";
// import Container from "@material-ui/core/Container";

// import { makeStyles } from "@material-ui/core/styles";
// import styles from "./LoginStyle";
import "./loginStyle.css";
import MailIcon from "@mui/icons-material/Mail";

import LockIcon from "@material-ui/icons/Lock";
// import Loading from "components/Loading/loading";
import DataService from "../../service/dataService";
import { useUser } from "../../context/userContext";
// import { useAlert } from "../../context/Feedback/alertContext";
// import Grid from "@material-ui/core/Grid";
import Grid from "@mui/material/Grid";
// import theme from "../Login/ButtonTheme.js";
// import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect } from "react";
// import ErrorIcon from "@material-ui/icons/Error";
// import logo from "../../assets/img/logoBranco.png";
//contants
// import constants from "../../constants/Login/login";
// import alertConstants from "../../constants/Feedback/alert";
import { TextField, Button, InputAdornment } from "@mui/material";
import { useAlert } from "../../context/Feedback/alertContext";
import Cookies from "js-cookie";
// import ErrorIcon from "@mui/icons-material/Error";

// import { withRouter } from "react-router";
// const useStyles = makeStyles(styles);
// import darkGray from "../../constants/colors";
export default function Login() {
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { setCredential, setUser, language, setIsAuth, setIsAdmin } = useUser();
  const { setAlert } = useAlert();
  const [errorMail, setErrorMail] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (mail) {
      try {
        let arroba = mail.split("@");

        if (arroba.length === 2) {
          let point = arroba[1].split(".");

          if (point.length >= 2 && point[1] !== "" && point[1] !== " ") {
            // Confirma se email existe no Login
            setErrorMail(false);
          } else setErrorMail(true);
        } else setErrorMail(true);
      } catch (e) {
        alert(e);
      }
    } else {
      setErrorMail(false);
    }
  }, [mail]);

  const checkAdmin = (data) => {
    for (let i = 0; i < data.roles.length; i++) {
      const element = data.roles[i];
      if (element.name === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    }
  };

  const handleLogin = async () => {
    try {
      if (!errorMail) {
        // setLoading(true);
        // const name = user.split("@")[0];
        // let data = {
        //   email: mail,
        //   password: password,
        //   name: mail.split("@")[0],
        // };
        // const response = await DataService.signUp(data);
        // console.log(response);

        const data = {
          username: mail,
          password: password,
        };

        const responseUser = await DataService.login(data);
        setCredential(responseUser.headers.authorization);
        console.log(responseUser);
        console.log(responseUser.headers.authorization);
        setUser(responseUser.data);
        // checkAdmin(response.data);
        Cookies.set("userMail", mail);
        Cookies.set("token", responseUser.headers.authorization);
        setIsAuth(true);
        setLoading(false);
        history("/");
      } else {
        // setIsAuth(false);
        // setLoading(false);
        // setAlert({
        //   active: true,
        //   text: "Teste1",
        //   color: "warning",
        //   sevarity: "error",
        //   icon: ErrorIcon,
        // });
      }
    } catch (e) {
      setIsAuth(false);
      setLoading(false);
      setAlert({
        active: true,
        text: "Usuário ou senha incorretos",
        color: "danger",
        sevarity: "error",
        // icon: ErrorIcon,
      });

      Cookies.remove("token");
      Cookies.remove("userMail");
    }
  };
  const handleSendNewPassword = async () => {
    if (!errorMail && mail.length > 0) {
      try {
        // setLoading(true);
        await DataService.forgotPass(mail);
        // setLoading(false);
        // setAlert({
        //   active: true,
        //   text: "Teste3",

        //   color: "info",
        //   sevarity: "info",
        //   icon: ErrorIcon,
        // });
      } catch (e) {
        // setLoading(false);
        // setAlert({
        //   active: true,
        //   text: "Teste4",
        //   color: "error",
        //   sevarity: "error",
        //   icon: ErrorIcon,
        // });
      }
    } else {
      //   setAlert({
      //     active: true,
      //     text: "Teste5",
      //     color: "info",
      //     sevarity: "info",
      //     icon: ErrorIcon,
      //   });
    }
  };
  const _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        direction="column"
        item
        xs={4}
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          paddingBottom: "2rem",
        }}
      >
        <div className="wrapper-login">
          <h2 style={{ color: "#F9A61A" }}>Projeto Incluir</h2>
          {/* <img src={logo}></img> */}
        </div>
        {/* <Loading loading={loading} /> */}
        <div className="wrapper-inputs">
          {/* <ThemeProvider theme={theme.themeInput}> */}

          <TextField
            onKeyDown={(event) => _handleKeyDown(event)}
            label="Email"
            variant="outlined"
            error={errorMail}
            style={{ paddingBottom: 10 }}
            sx={{ color: "secondary" }}
            onChange={(el) => {
              setMail(el.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onKeyDown={(event) => _handleKeyDown(event)}
            label="Senha"
            variant="outlined"
            type="password"
            onChange={(el) => {
              setPassword(el.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon/>
                </InputAdornment>
              ),
            }}
          />

          {/* </ThemeProvider> */}
          <div className="forget-pass">
            <h3
              onClick={handleSendNewPassword}
              style={{
                marginTop: 0,
                fontSize: 12,
                color: "#F9A61A",
                cursor: "pointer",
              }}
            >
              Esqueci minha senha
            </h3>
          </div>
        </div>

        <Button
          style={{ width: "80%", marginBottom: 10 }}
          onClick={handleLogin}
          sx={{
            color: "white",
            backgroundColor: "#F36F21",
          }}
        >
          Login
        </Button>
        <Button
          style={{ width: "80%" }}
          onClick={() => {
            history("/signup");
          }}
          sx={{
            color: "white",
            backgroundColor: "#F36F21",
          }}
        >
          Registrar
        </Button>
      </Grid>
    </div>
  );
}
