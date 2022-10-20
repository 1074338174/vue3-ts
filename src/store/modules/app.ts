import { login as loginApi } from '@/api/login'
import router from '@/router';
import { setTokenTime } from '@/utils/auth';


export interface State {
  token: string,
}
export interface userInfo {
  username: string,
  password: string,
}
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  mutations: {
    setToken(state: State, token: string) {
      state.token = token;
      localStorage.setItem('token', token);
    }
  },
  actions: {
    // 登录
    login({ commit }: any, userInfo: userInfo) {
      return new Promise<void>((resolve, reject) => {
        loginApi(userInfo).then(res => {
          commit('setToken', res.token);
          setTokenTime();
          router.replace('/');
          resolve();
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 登出
    logout({ commit }: any,) {
      commit('setToken', '');
      localStorage.clear();
      router.replace('/login');
    }
  }
}