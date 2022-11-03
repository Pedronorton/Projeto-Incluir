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
import React, { useEffect, useState } from "react";
import DataService from "../../service/dataService.js";
// import QRCodeCanvas from "../QRCodeCanvas.jsx";
import { QRCodeCanvas } from "qrcode.react";
import Paper from "@mui/material/Paper";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./presence.css";
export default function Presence() {
  const [listPresence, setListPresence] = useState([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [hour, setHour] = useState("");
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [qrCodeIds, setQrcodeIds] = useState([]);

  const [QRCode, setQRCode] = useState({});

  useEffect(() => {
    getAllPresence();
  }, []);

  useEffect(() => {
    createRows();
  }, [listPresence]);

  const getAllPresence = async () => {
    try {
      const response = await DataService.getAllPresence();
      setListPresence(response.data);
    } catch (e) {
      alert(e);
    }
  };

  const formatDate = () => {};

  const createRows = () => {
    let list = [];
    console.log(listPresence);
    listPresence.forEach((element) => {
      const initialDate = new Date(element.startedHour);
      const finalDate = new Date(element.endHour);
      const initialHour =
        String(initialDate.getHours()).padStart(2, "0") +
        ":" +
        String(initialDate.getMinutes()).padStart(2, "0");
      let finalHour = "-";
      if (element.endHour != null) {
        finalHour =
          String(finalDate.getHours()).padStart(2, "0") +
          ":" +
          String(finalDate.getMinutes()).padStart(2, "0");
      }
      const day =
        String(initialDate.getDate()).padStart(2, "0") +
        "/" +
        String(initialDate.getMonth()).padStart(2, "0") +
        "/" +
        String(initialDate.getFullYear()).padStart(2, "0");
      const data = {
        id: element.id,
        name: element.user.name,
        startHour: initialHour + "h",
        endHour: finalHour != "-" ? finalHour + "h" : "-",
        clazz: element.clazz.name,
        day: day,
        place: element.clazz.place,
        confirmation: element.confirmation,
      };

      list.push(data);
    });
    setRows(list);
  };
  return (
    <div>
      <div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">Aula</TableCell>
                  <TableCell align="center">Sala</TableCell>
                  <TableCell align="center">Dia</TableCell>
                  <TableCell align="center">Horário de entrada</TableCell>
                  <TableCell align="center">Horário de saída</TableCell>
                  <TableCell align="center">Confirmação</TableCell>
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
                    <TableCell align="center">{row.clazz}</TableCell>
                    <TableCell align="center">{row.place}</TableCell>
                    <TableCell align="center">{row.day}</TableCell>
                    <TableCell align="center">{row.startHour}</TableCell>
                    <TableCell align="center">{row.endHour}</TableCell>
                    <TableCell align="center">
                      {row.confirmation ? (
                        <div className="container-confirmation">
                          <div className="active"></div>
                        </div>
                      ) : (
                        <div className="container-confirmation">
                          <div className="not-active"></div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
