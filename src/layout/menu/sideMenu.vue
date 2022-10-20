<template>
  <template v-for="menus in menuList" :key="menus.name">
    <el-sub-menu v-if="menus.children && menus.children.length > 0" :index="menus.path">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ menus.name }}</span>
      </template>
      <SideMenu :menuList="menus.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menus.path">
      <el-icon><icon-menu /></el-icon>
      <template #title>{{ menus.name }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import SideMenu from '@/layout/menu/sideMenu.vue';
defineProps({
  menuList: Object,
});

</script>