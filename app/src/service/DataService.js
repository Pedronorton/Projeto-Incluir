import Axios from 'axios';

const URL = 'http://192.168.0.108:8080/api';

class DataService {
    postPresence(data, cred) {
        return Axios.post(`${URL}/presence/markPresence`, data, cred);
    }
    login(data) {
        return Axios.post(`${URL}/auth/signin`, data);
    }
    signUp(data) {
        return Axios.post(`${URL}/user/signUp`, data);
    }
    refreshToken(data) {
        return Axios.post(`${URL}/auth/refreshtoken`, data);
    }
    getUserByEmail(email, cred) {
        return Axios.get(`${URL}/user/${email}`, cred);
    }
}

export default new DataService();
