import axios from 'axios';

const instance = axios.create({
    baseURL:"https://git.heroku.com/alumns.git",  
})

export default instance;