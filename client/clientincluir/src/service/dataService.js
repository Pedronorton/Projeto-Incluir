import Axios from "axios";

const URL = "http://localhost:8080/api";

class DataService {
  getAllClazz(authorization) {
    return Axios.get(`${URL}/clazz/`);
  }
  postClazz(data) {
    return Axios.post(`${URL}/clazz/`, data);
  }
  postQRCode(data) {
    return Axios.post(`${URL}/qrcode/`, data);
  }
  getQRCodeByKey(link) {
    return Axios.get(link);
  }
  getAllQRCode() {
    return Axios.get(`${URL}/qrcode/`);
  }
  getAllPresence() {
    return Axios.get(`${URL}/presence/`);
  }
}
export default new DataService();
