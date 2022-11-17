import request  from '@/utils/request';

/**
 * 查询用户列表的参数
 */
export interface Query {
  query: Object | String,
  pagenum: Number,
  pagesize: Number,
}

export const getUsers = (query: Query):Promise<any> => {
  return request({
    url: '/users',
    params: query,
  })
};

// 添加用户
export const addUser = (data: Object):Promise<any> => {
  return request({
    url: '/users',
    method: 'POST',
    data,
  })
}

// 根据 ID 查询用户信息
export const searchUser = (id:any):Promise<any> => {
  return request({
    url: `/users/${id}`,
  })
}

// 修改用户状态
export const changeUserStatus = (data: any):Promise<any> => {
  return request({
    url: `/users/${data.uId}/state/${data.type}`,
    method: 'PUT',
  })
}

// 删除用户
export const deleteUser = (id: string):Promise<any> => {
  return request({
    url: `/users/${id}`,
    method: 'DELETE',
  })
}

// 编辑用户
export const editUser = (data: any):Promise<any> => {
  return request({
    url: `/users/${data.id}`,
    method: 'PUT',
    data: data.body
  })
}