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
}
export default new DataService();
