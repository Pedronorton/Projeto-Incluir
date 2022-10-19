import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataService from "../../service/dataService.js";
import QRCodeCanvas from "../QRCodeCanvas.jsx";
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
  const generateQRCode = () => {
    setShowQRCode(true);
  };
  const handleSubmit = async () => {
    try {
      const data = {
        name: name,
        place: place,
        hour: hour,
      };
      const response = await DataService.postClazz(data);
      console.log(response);
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
              <TextField
                autoFocus
                margin="dense"
                id="hour"
                label="Horário"
                type="date"
                fullWidth
                variant="standard"
                onChange={(el) => setHour(el.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSubmit}>Salvar</Button>
            </DialogActions>
          </Dialog>
        </div>

        <ul>
          {listClazz.length > 0 &&
            listClazz.map((e) => {
              return (
                <div>
                  <li key={e.id}>{e.name}</li>
                  <Button onClick={generateQRCode}>Gerar QRCode</Button>
                  {showQRCode && (
                    <QRCodeCanvas text="http://192.168.0.10:8080/api/clazz/"></QRCodeCanvas>
                  )}
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
