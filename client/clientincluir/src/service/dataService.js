import Axios from "axios";

const URL = "http://localhost:8080/api";

class DataService {
  //Grammar
  getAllClazz() {
    return Axios.get(`${URL}/clazz/`);
  }
}
export default new DataService();
