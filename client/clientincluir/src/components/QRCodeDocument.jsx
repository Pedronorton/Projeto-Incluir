import React from "react";
import {
  Document,
  Page,
  Image,
  View,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "block",
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: "10%",
  },
  viewText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: "5%",
  },
  qrImage: {
    width: "25%",
    height: "100%",
  },
});

const formatDate = (dateInitial, dateFinal) => {
  const initialDate = new Date(dateInitial);
  const finalDate = new Date(dateFinal);
  const initialHour =
    String(initialDate.getHours()).padStart(2, "0") +
    ":" +
    String(initialDate.getMinutes()).padStart(2, "0");
  const finalHour =
    String(finalDate.getHours()).padStart(2, "0") +
    ":" +
    String(finalDate.getMinutes()).padStart(2, "0");
  return initialHour + "h :" + finalHour;
};

function QRCodePage({ qrcode }) {
  let dataUrl = "";
  const id = qrcode.id;
  const { name, place } = qrcode.clazz;
  const hour = formatDate(qrcode.clazz.initialHour, qrcode.clazz.finalHour);
  if (id != null) {
    if (document.getElementById(id) != null) {
      dataUrl = document.getElementById(id).toDataURL();
    }
  }
  return (
    <Page key={`page_${id}`} size="A4" style={styles.page}>
      <View style={styles.view}>
        {dataUrl != "" && (
          <Image allowDangerousPaths src={dataUrl} style={styles.qrImage} />
        )}
      </View>
      <View style={styles.viewText}>
        <Text>Aula: {name ? name : ""}</Text>
      </View>
      <View style={styles.viewText}>
        <Text>Horário: {hour ? hour : ""}</Text>
      </View>
      <View style={styles.viewText}>
        <Text>Sala: {place ? place : ""}</Text>
      </View>
    </Page>
  );
}
const transformList = (ids) => {
  let list = [];
  Object.keys(ids).forEach((key) => {
    list.push(ids[key]);
  });
  return list;
};

function QRCodeDocument({ obj, row }) {
  const ids = transformList(obj);
  return (
    <Document>
      {ids.map((qrcode) => (
        <QRCodePage key={qrcode.id} qrcode={qrcode} />
      ))}
    </Document>
  );
}

export default QRCodeDocument;
