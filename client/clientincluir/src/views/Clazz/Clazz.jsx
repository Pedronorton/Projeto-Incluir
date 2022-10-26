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
import QRCodeCanvas from "../QRCodeCanvas.jsx";
import Paper from "@mui/material/Paper";

import "./clazz.css";
export default function Clazz() {
  useEffect(() => {
    getAllClazz();
  }, []);

  const [listClazz, setListClazz] = useState([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [hour, setHour] = useState("");
  const [open, setOpen] = React.useState(false);

  const [QRCode, setQRCode] = useState({});

  const fetchQRCodes = async () => {
    try {
      const obj = {};
      const response = await DataService.getAllQRCode();
      response.data.forEach((element) => {
        obj[element.id] = element;
      });
      setQRCode(obj);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const handleChangeHour = (event) => {
    setHour(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllClazz = async () => {
    try {
      const response = await DataService.getAllClazz();

      setListClazz(response.data);
    } catch (e) {
      alert(e);
    }
  };
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  const generateQRCode = async (idClazz) => {
    const link = "http://192.168.0.104:8080/api/qrcode/" + idClazz;
    try {
      await DataService.getQRCodeByURL(link);
    } catch (e) {
      if (e.response.status == 404) {
        try {
          const response = await DataService.postQRCode(idClazz);
          let obj = {};
          const qrCode = response.data;
          obj[qrCode.url] = qrCode;

          setQRCode(obj);
        } catch (eQrCode) {
          console.log(eQrCode);
        }
      }
    }
    setShowQRCode(true);
  };
  const handleSubmit = async () => {
    let date = new Date();
    // console.log(hour);
    const data = {
      name: name,
      place: place,
    };
    if (hour == "eightClock") {
      date.setHours(8, 0, 0);
      data.hour = "nine";
    } else if (hour == "tenClock") {
      date.setHours(10, 0, 0);
      data.hour = "ten";
    }

    try {
      const response = await DataService.postClazz(data);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <Button
              variant="contained"
              color="success"
              className="button"
              onClick={handleClickOpen}
            >
              Adicionar
            </Button>
            <Button variant="contained" color="error" className="button">
              Deletar
            </Button>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adicionar</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                type="text"
                fullWidth
                variant="standard"
                onChange={(el) => setName(el.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="place"
                label="Sala"
                type="text"
                fullWidth
                variant="standard"
                onChange={(el) => setPlace(el.target.value)}
              />
              <div className="div-radios">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Dia</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="saturday"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="saturday"
                      control={<Radio />}
                      label="Sábado"
                      disabled
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="div-radios">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Horário
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleChangeHour}
                  >
                    <FormControlLabel
                      value="eightClock"
                      control={<Radio />}
                      label="8:00h - 10:00h"
                    />
                    <FormControlLabel
                      value="tenClock"
                      control={<Radio />}
                      label="10:00h - 12:30h"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSubmit}>Salvar</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Horário</TableCell>
                  <TableCell align="right">QRCode</TableCell>
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
                    <TableCell align="right">{row.calories}</TableCell>

                    <TableCell align="right">
                      <QRCodeCanvas
                        text={"http://192.168.0.104:8080/api/qrcode/"}
                      ></QRCodeCanvas>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
        </div>
        <ul>
          {listClazz.length > 0 &&
            listClazz.map((e) => {
              return (
                <div>
                  <li key={e.id}>{e.name}</li>
                  <Button
                    onClick={() => {
                      generateQRCode(e.id);
                    }}
                  >
                    Gerar QRCode
                  </Button>

                  {showQRCode && (
                    <QRCodeCanvas
                      text={"http://192.168.0.104:8080/api/qrcode/" + e.id}
                    ></QRCodeCanvas>
                  )}
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
