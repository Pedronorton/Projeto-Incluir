import Axios from 'axios';

const URL = 'http://192.168.0.108:8080/api';

class DataService {
    postPresence(data) {
        return Axios.post(`${URL}/presence/markPresence`, data);
    }
    login(data) {
        return Axios.post(`${URL}/auth/signin`, data);
    }
    refreshToken(data) {
        return Axios.post(`${URL}/auth/refreshtoken`, data);
    }
}

export default new DataService();
