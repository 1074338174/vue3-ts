<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">
        <MenuList />
      </el-aside>
      <el-container>
        <el-header class="header">
          <MenuHeader />
        </el-header>
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MenuList from './menu/index.vue'
import MenuHeader from './header/index.vue'
</script>

<style scoped>
.common-layout{
  height: 100%;
  width: 100%;
}
.el-container {
  height: 100%;
}
.aside{
  height: 100%;
}
</style>