import Axios from "axios";

const URL = "http://localhost:8080/api";

class DataService {
  login(data) {
    return Axios.post(`${URL}/auth/signin`, data);
  }
  signUp(data) {
    return Axios.post(`${URL}/user/signUp`, data);
  }
  getAllUsers(cred) {
    return Axios.get(`${URL}/user/`, cred);
  }
  getUserByEmail(email, cred) {
    return Axios.get(`${URL}/user/${email}`, cred);
  }

  getAllClazz(cred) {
    return Axios.get(`${URL}/clazz/`, cred);
  }
  postClazz(data, cred) {
    return Axios.post(`${URL}/clazz/`, data, cred);
  }
  postQRCode(data, cred) {
    return Axios.post(`${URL}/qrcode/`, data, cred);
  }
  getQRCodeByKey(link, cred) {
    return Axios.get(link, cred);
  }
  getAllQRCode(cred) {
    return Axios.get(`${URL}/qrcode/`, cred);
  }
  getAllPresence(cred) {
    return Axios.get(`${URL}/presence/`, cred);
  }
}
export default new DataService();
