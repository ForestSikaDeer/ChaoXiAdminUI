import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code == 20005) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

        MessageBox.confirm(
          '会话过期，已与服务器断开链接，请重新登录',
          '退出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      if (res.code === 50000) {
        //         Message({
        //   message: "对不起，您对此功能没有访问权限，请找首领赋权",
        //   type: 'error',
        //   duration: 3 * 1000
        // })

        MessageBox.confirm(
          '对不起，您对此功能没有访问权限，请联系管理员赋权',
          '权限不足',
          {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          }
        )

      }
      if (res.code === 50003) {
        MessageBox.confirm(
          '不可操作',
          '错误',
          {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          }
        )
      }
      if (res.code === 50004) {
        MessageBox.confirm(
          '账户已被禁用',
          '拒绝链接',
          {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }
        )
      }
      if (res.code === 50005) {
        MessageBox.confirm(
          '账户或密码错误，请检查后重试',
          '错误',
          {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          }
        )
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug

    return Promise.reject(error)
  }
)

export default service
