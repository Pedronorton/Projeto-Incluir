import Axios from "axios";

const URL = "http://localhost:8081/api";

class DataService {
  login(data) {
    return Axios.post(`${URL}/auth/signin`, data);
  }

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
  getAllUsers() {
    return Axios.get(`${URL}/user/`);
  }
}
export default new DataService();
