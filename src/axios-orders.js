import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-project-my-burger.firebaseio.com/"
});

export default instance;