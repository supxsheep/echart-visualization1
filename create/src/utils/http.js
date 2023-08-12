import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 150000,
});

//请求拦截器：在请求之前的数据处理，比如在请求头添加token,所有的请求都会经过请求拦截器
instance.interceptors.request.use(
  (config) => {
    //再请求头同意添加token
    // if (token.value) {
    //   config.headers.Authorization = "Bearer " + token.value;
    // }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//响应拦截器：在请求响应之后对数据处理，比如：登录失败、请求数据失败的处理
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//封装请求函数
const callApi = (method = "GET", url, data = {}) => {
  return instance({
    method,
    url,
    params: method === "GET" ? data : {},
    data: method === "POST" ? data : {},
  });
};
//GET请求函数
export const getApi = (url, data) => callApi("GET", url, data);
//POST请求函数
export const postApi = (url, data) =>
  callApi("POST", url, data);