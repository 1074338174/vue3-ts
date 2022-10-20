import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import app from './modules/app'
import getters from './getters'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    app
  },
  getters,
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}