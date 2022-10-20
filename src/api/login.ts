import request from '@/utils/request';

interface LoginInfo {
  username: string,
  password: string,
}

// 登录
export const login = (data: LoginInfo ):Promise<any> => {
  return request({
    url: '/login',
    method: 'POST',
    data,
  })
}