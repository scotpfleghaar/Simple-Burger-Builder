import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-6122a.firebaseio.com/'
});

export default instance;