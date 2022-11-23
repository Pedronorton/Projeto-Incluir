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
      const response = await dataService.getAllUsers();
      console.log(response);
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
      const data = {
        id: element.id,
        name: element.name,
        function: element.function,
        registeredHours: element.registeredHours,
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
              <TableCell align="center">Função</TableCell>
              <TableCell align="center">Horas registradas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
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
