<template>
  <div id="screenFul" @click="handleFullScreen">
    <svg-icon :icon="icon ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script lang="ts" setup>
import screenfull from 'screenfull';
import { ref, onMounted, onBeforeMount } from 'vue';

// 切换全屏
const handleFullScreen = ():void => {
  if(screenfull.isEnabled) {
    screenfull.toggle();
  }
};

const icon = ref(screenfull.isFullscreen);

// 替换icon图标
const changeIcon = ():void => {
  icon.value = screenfull.isFullscreen;
}

// 监听是否全屏
onMounted(() => {
  screenfull.on('change', changeIcon);
})

// 去除监听
onBeforeMount(() => {
  screenfull.off('change');
})

</script>

<style lang="scss" scoped>

</style>