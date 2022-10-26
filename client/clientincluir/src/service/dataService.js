import Axios from "axios";

const URL = "http://localhost:8080/api";

class DataService {
  //Grammar
  getAllClazz(authorization) {
    return Axios.get(`${URL}/clazz/`);
  }
  postClazz(data) {
    return Axios.post(`${URL}/clazz/`, data);
  }
  postQRCode(id) {
    return Axios.post(`${URL}/qrcode/${id}`);
  }
  getQRCodeByURL(link) {
    return Axios.get(link);
  }
  getAllQRCode() {
    return Axios.get(`${URL}/qrcode/`);
  }
}
export default new DataService();
