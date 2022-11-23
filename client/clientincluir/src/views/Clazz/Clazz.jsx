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
import QRCodeDocument from "../../components/QRCodeDocument";

import "./clazz.css";
export default function Clazz() {
  const [listClazz, setListClazz] = useState([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [hour, setHour] = useState("");
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [qrCodeIds, setQrcodeIds] = useState([]);

  const [QRCode, setQRCode] = useState({});

  useEffect(() => {
    getAllClazz();
    fetchQRCodes();
  }, []);

  useEffect(() => {
    createRows();
  }, [listClazz, QRCode]);

  const fetchQRCodes = async () => {
    try {
      const obj = {};
      const response = await DataService.getAllQRCode();
      response.data.forEach((element) => {
        const key = element.key.split("-")[0];
        obj[key] = element;
      });
      setQRCode(obj);
    } catch (e) {
      alert(e);
    }
  };

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

  const createRows = () => {
    let list = [];
    listClazz.forEach((element) => {
      const initialDate = new Date(element.initialHour);
      const finalDate = new Date(element.finalHour);
      const initialHour =
        String(initialDate.getHours()).padStart(2, "0") +
        ":" +
        String(initialDate.getMinutes()).padStart(2, "0");
      const finalHour =
        String(finalDate.getHours()).padStart(2, "0") +
        ":" +
        String(finalDate.getMinutes()).padStart(2, "0");
      const data = {
        id: element.id,
        name: element.name,
        hour: initialHour + "h - " + finalHour + "h",
        place: element.place,
      };
      if (QRCode[element.id] != null) {
        data.qrCode = QRCode[element.id];
        insertIdQRCode(QRCode[element.id].id);
      }
      list.push(data);
    });
    setRows(list);
  };

  const insertIdQRCode = (id) => {
    let list = [...qrCodeIds];
    if (!list.includes(id)) {
      list.push(id);
      setQrcodeIds(list);
    }
  };

  const generateQRCode = async (idClazz) => {
    const date = new Date();
    const data = {
      idClazz: idClazz,
      key: idClazz + "-" + date,
    };
    try {
      // await DataService.getQRCodeByKey(key);
      const response = await DataService.postQRCode(data);
      let obj = { ...QRCode };
      const qrCode = response.data;
      console.log(response.data);
      if (qrCode && qrCode.key.includes("-")) {
        const key = qrCode.key.split("-")[0];
        obj[key] = qrCode;

        setQRCode(obj);
        insertIdQRCode(qrCode.id);
      }
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    let list = [...listClazz];
    let date = new Date();
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
      list.push(response.data);
      setListClazz(list);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="button-container">
            <Button
              variant="contained"
              className="button"
              onClick={handleClickOpen}
              style={{ backgroundColor: '#F36F21'}}
            >
              Adicionar
            </Button>
            <PDFDownloadLink
              document={<QRCodeDocument obj={QRCode} />}
              fileName="qrcode.pdf"
            >
              <Button variant="contained" className="button" style={{ backgroundColor: '#F36F21' }}>
                Download
              </Button>
            </PDFDownloadLink>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">Horário</TableCell>
                  <TableCell align="center">Sala</TableCell>
                  <TableCell align="center">Ações</TableCell>
                  <TableCell align="center">QRCode</TableCell>
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
                    <TableCell align="center">{row.hour}</TableCell>
                    <TableCell align="center">{row.place}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#F9A61A' }}
                        onClick={() => {
                          generateQRCode(row.id);
                        }}
                      >
                        Gerar QRCode
                      </Button>
                      {/* <PDFDownloadLink
                        document={
                          <QRCodeDocument
                            ids={}
                            row={row}
                          />
                        }
                        fileName="qrcode.pdf"
                      >
                        <Button
                          variant="contained"
                          color="success"
                          className="button"
                        >
                          Download
                        </Button>
                      </PDFDownloadLink> */}
                    </TableCell>
                    <TableCell align="center">
                      {row.qrCode && (
                        // <QRCodeCanvas
                        //   text={row.qrCode.id + "-" + row.qrCode.key}
                        // ></QRCodeCanvas>

                        <QRCodeCanvas
                          id={row.qrCode.id}
                          value={row.qrCode.id + "-" + row.qrCode.key}
                        />
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
