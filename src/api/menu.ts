import request  from '@/utils/request';

export const getMenu = ():Promise<any> => {
  return request({
    url: '/menus',
  })
};