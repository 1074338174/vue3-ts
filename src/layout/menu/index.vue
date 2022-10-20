<template>
  <el-radio-group v-model="isCollapse">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="/home/sub"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <SideMenu :menuList="routes"/>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import SideMenu from './sideMenu.vue'
import routes from '@/router/routes';
const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}
</script>

<style>
.el-menu--collapse {
  height: 96%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 96%;
}
</style>