<template>
  <el-dropdown>
    <el-avatar
    :src="squareUrl"
  />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
// 头像地址
const squareUrl = ref(
  'https://img0.baidu.com/it/u=1056811702,4111096278&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
)
// 退出登录
const logout = ():void => {
  store.dispatch('app/logout');
}

</script>

<style lang="scss" scoped>

</style>