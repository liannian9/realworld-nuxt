import axios from 'axios';

const request = axios.create({
    baseURL:'https://conduit.productionready.io/api'
})

//请求拦截

//相应拦截

export default request;