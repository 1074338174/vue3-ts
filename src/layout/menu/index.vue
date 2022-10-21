<template>
   <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    :unique-opened="true"
    :collapse="!store.getters.slideType"
    :router="true"
    >
      <el-sub-menu 
        :index="'/' + item.path"
        v-for="(item, index) in menuList"
        :key="item.id"
      >
        <template #title>
          <el-icon>
            <component :is="iconList[index]"></component>
          </el-icon>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item 
          :index="'/' + it.path"
          v-for="it in item.children"
          :key="it.id"
          @click="savePath(it.path)"
        >
          <template #title>
            <el-icon>
              <component :is="icon"></component>
            </el-icon>
            <span>{{ $t(`menus.${it.path }`) }}</span>
          </template>
      </el-menu-item>
    </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { getMenu } from '@/api/menu';
import { ref } from 'vue';
import { useStore } from 'vuex';

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart']);
const icon = ref('menu');
const defaultActive = ref(sessionStorage.getItem('path') || '/user');
const store = useStore();

// 菜单
let menuList:any = ref([]);
const getMenuList = async () => {
  menuList.value = await getMenu();
}
getMenuList();

// 保存点击路径
const savePath = (path: string):void => {
  sessionStorage.setItem('path', `/${path}`);
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