import { login as loginApi } from '@/api/login'
import router from '@/router';
import { setTokenTime } from '@/utils/auth';


export interface State {
  token: string,
  slideType: boolean,
  lang: string,
}

export interface userInfo {
  username: string,
  password: string,
}

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    slideType: true,
    lang: localStorage.getItem('lang') || 'zh',
  }),
  mutations: {
    // 存储token
    setToken(state: State, token: string) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    // slider是否收取
    changeSlideType(state: State) {
      state.slideType = !state.slideType;
    },
    // 设置语言
    setLang(state: State, lang: string) {
      state.lang = lang;
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