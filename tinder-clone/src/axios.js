import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tinder-backend.herokuapp.com/'
})

export default instance