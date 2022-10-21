<template>
  <div class="hamburger-container" id="hamburger" @click="toggleChange">
    <svg-icon :icon="icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const toggleChange = () => {
  store.commit('app/changeSlideType');
}
const icon  = computed(() => {
  return store.getters.slideType ? 'hamburger-opened' : 'hamburger-closed';
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>