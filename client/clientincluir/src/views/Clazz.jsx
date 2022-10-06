import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataService from "../service/dataService.js";
import QRCodeCanvas from "./QRCodeCanvas.jsx";

export default function Clazz() {
  useEffect(() => {
    getAllClazz();
  }, []);

  const [listClazz, setListClazz] = useState([]);
  const [showQRCode, setShowQRCode] = useState(false);

  const getAllClazz = async () => {
    try {
      const response = await DataService.getAllClazz();
      console.log(response.data);
      setListClazz(response.data);
    } catch (e) {
      alert(e);
    }
  };
  const generateQRCode = () => {
    setShowQRCode(true);
  };

  return (
    <div>
      <ul>
        {listClazz.length > 0 &&
          listClazz.map((e) => {
            return (
              <div>
                <li key={e.id}>{e.name}</li>
                <Button onClick={generateQRCode}>Gerar QRCode</Button>
                {showQRCode && (
                  <QRCodeCanvas text="http://192.168.0.101:8080/api/clazz/"></QRCodeCanvas>
                )}
              </div>
            );
          })}
      </ul>
    </div>
  );
}
