<template>
  <el-dropdown @command="handleCommand">
    <svg-icon icon="language" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useStore } from 'vuex';

const i18n = useI18n();
const store = useStore();
// 获取语言
const currentLanguage = computed(() => {
  return i18n.locale.value;
});

// 切换语言
const handleCommand = (val:string):void => {
  store.commit('app/setLang', val);
  localStorage.setItem('lang', val);
  i18n.locale.value = val;
}

</script>

<style lang="scss" scoped>

</style>