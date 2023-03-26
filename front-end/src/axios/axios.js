import axios from 'axios';
const BASE_URL = 'http://localhost:7000/api/';
const BASE_URL_DOCKER = 'http://localhost:7001/api/';

export default axios.create({
    baseURL: BASE_URL_DOCKER
});
