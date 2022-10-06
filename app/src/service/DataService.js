import Axios from 'axios';

const URL = 'http://192.168.0.101:8080/api';

class DataService {
    postPresence(url) {
        return Axios.get(url);
    }
}

export default new DataService();
