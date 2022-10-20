<template>
  <el-page-header class="header">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          homepage
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/404' }">
          404
        </el-breadcrumb-item
        >
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header{
  margin-top: 10px;
}
</style>