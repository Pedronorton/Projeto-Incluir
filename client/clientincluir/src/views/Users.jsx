import React, { useEffect } from "react";
import { useState } from "react";
import dataService from "../service/dataService";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    createRows();
  }, [userList]);

  const fetchUsers = async () => {
    try {
      const storageToken = Cookies.get("token");

      const response = await dataService.getAllUsers({
        headers: {
          Authorization: storageToken,
        },
      });
      setUserList(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const createRows = () => {
    let list = [];
    userList.forEach((element) => {
      // const initialHour =
      //   String(initialDate.getHours()).padStart(2, "0") +
      //   ":" +
      //   String(initialDate.getMinutes()).padStart(2, "0");
      // let finalHour = "-";
      // if (element.endHour != null) {
      //   finalHour =
      //     String(finalDate.getHours()).padStart(2, "0") +
      //     ":" +
      //     String(finalDate.getMinutes()).padStart(2, "0");
      // }
      // const day =
      //   String(initialDate.getDay() - 1).padStart(2, "0") +
      //   "/" +
      //   String(initialDate.getMonth()).padStart(2, "0") +
      //   "/" +
      //   String(initialDate.getFullYear()).padStart(2, "0");
      let totalRegisteredHours = 0;
      let totalRegisteredHoursMinutes = 0;

      totalRegisteredHours = (element.registeredHours / 60) | 0;

      totalRegisteredHoursMinutes = element.registeredHours % 60;
      const data = {
        id: element.id,
        name: element.name,
        function: element.function,
        registeredHours:
          totalRegisteredHours +
          " h : " +
          totalRegisteredHoursMinutes.toFixed(0) +
          " m",
      };

      list.push(data);
    });
    setRows(list);
  };

  return (
    <div>
      {" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Fun????o</TableCell>
              <TableCell align="center">Horas registradas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.function}</TableCell>
                <TableCell align="center">{row.registeredHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
