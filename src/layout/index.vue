<template>
  <el-container class="app-wrapper">
    <el-aside :width="asideWidth" class="sidebar-container">
      <MenuList />
    </el-aside>
    <el-container class="container" :class="{ hidderContainer: !store.getters.slideType }">
      <el-header>
        <MenuHeader />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import MenuList from './menu/index.vue';
import MenuHeader from './header/index.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const asideWidth = computed(() => {
  return store.getters.slideType ? '210px' : '67px';
});

</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
:deep(.el-header) {
  padding: 0;
}
</style>
