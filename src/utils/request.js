import axios from 'axios';
import NProgress from "nprogress";
// import { message } from 'ant-design-vue';

// 创建 axios 实例
const request = axios.create({
    baseURL: '/api/',///api/
    timeout: 10000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 设置 axios 请求拦截器
axios.interceptors.request.use(config => {
    //console.log("请求拦截器：",config)
    NProgress.start()
    return config
})

// 设置 axios 响应拦截器
axios.interceptors.response.use(config => {
    //console.log("响应拦截器：",config)
    NProgress.done()
    return config
  })

export default request;