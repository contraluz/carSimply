import Axios from "axios";

const instance = Axios.create({
  // todo: 基础配置
  timeout: 5000,

  // 默认使用json方式
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8"
  }
});

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status === 200) {
    return response.data;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;