import Axios from 'axios';

const URL = 'http://192.168.0.1:8080/api';

class DataService {
    postPresence(data) {
        return Axios.post(`${URL}/precense/markPresence`, data);
    }
    login(data) {
        return Axios.post(`${URL}/auth/signin`, data);
    }
    refreshToken(data) {
        return Axios.post(`${URL}/auth/refreshtoken`, data);
    }
}

export default new DataService();
