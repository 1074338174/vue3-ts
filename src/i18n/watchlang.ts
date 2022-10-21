import { watch } from 'vue';
import { store } from '@/store';

export const watchLang = (...cbs:any) => {
  watch(
    () => store.getters.lang,
    () => {
      cbs.forEach((cb:any) => cb(store.getters.lang))
    },
    { deep: true }
  )
}
