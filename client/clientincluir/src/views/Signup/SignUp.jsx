import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useUser } from "../../context/userContext";
// import Container from "@material-ui/core/Container";

// import { makeStyles } from "@material-ui/core/styles";
// import styles from "./LoginStyle";
import "./signupStyle.css";
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
import { TextField, Button } from "@mui/material";
import { useAlert } from "../../context/Feedback/alertContext";
import Cookies from "js-cookie";
// import ErrorIcon from "@mui/icons-material/Error";

// import { withRouter } from "react-router";
// const useStyles = makeStyles(styles);
// import darkGray from "../../constants/colors";
export default function SignUp() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userFunction, setUserFunction] = useState("");

  const [loading, setLoading] = useState(false);
  const { setCredential, setUser, language, setIsAuth, setIsAdmin } = useUser();
  const { setAlert } = useAlert();
  const [errorMail, setErrorMail] = useState(false);
  const history = useNavigate();

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

  const _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleCreateUser = async () => {
    const data = {
      name: name,
      function: userFunction,
      username: mail,
      password: password,
    };
    try {
      const response = await DataService.signUp(data);

      Cookies.set("refreshToken", response.data.refreshToken);
      Cookies.set("@token", response.data.token);
      Cookies.set("@username", response.data.username);
      handleLogin();
    } catch (e) {
      // saving error
      alert(e);
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
          backgroundColor: "#313040",
          borderRadius: 20,
          paddingBottom: "2rem",
        }}
      >
        <div className="wrapper-login">
          <h2 style={{ color: "white" }}>Cadastro</h2>
          {/* <img src={logo}></img> */}
        </div>
        {/* <Loading loading={loading} /> */}
        <div className="wrapper-inputs">
          {/* <ThemeProvider theme={theme.themeInput}> */}

          <TextField
            onKeyDown={(event) => _handleKeyDown(event)}
            label="Nome"
            variant="outlined"
            style={{ paddingBottom: 10 }}
            sx={{ color: "white" }}
            onChange={(el) => {
              setName(el.target.value);
            }}
          />
          <TextField
            onKeyDown={(event) => _handleKeyDown(event)}
            label="Email"
            variant="outlined"
            error={errorMail}
            style={{ paddingBottom: 10 }}
            onChange={(el) => {
              setMail(el.target.value);
            }}
          />
          <TextField
            onKeyDown={(event) => _handleKeyDown(event)}
            label="Função"
            variant="outlined"
            style={{ paddingBottom: 10 }}
            onChange={(el) => {
              setUserFunction(el.target.value);
            }}
          />
          <TextField
            onKeyDown={(event) => _handleKeyDown(event)}
            label="Senha"
            variant="outlined"
            style={{ paddingBottom: 10 }}
            type="password"
            onChange={(el) => {
              setPassword(el.target.value);
            }}
          />
        </div>

        <Button
          style={{ width: "80%", marginBottom: 10 }}
          onClick={handleCreateUser}
          sx={{
            color: "black",
            backgroundColor: "#7DC78D",
          }}
        >
          Criar
        </Button>
      </Grid>
    </div>
  );
}
