import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

// 登录时设置时间
export const setTokenTime = ():void => {
  localStorage.setItem(TOKEN_TIME, (Date.now() as any))
}

// 获取
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime:any = getTokenTime()
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}
