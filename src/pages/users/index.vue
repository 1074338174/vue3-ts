<template>
  <el-card class="box-card">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input v-model="input" placeholder="请输入搜索用户名" clearable />
      </el-col>
      <el-button type="primary" :icon="Search" @click="searchUserData(input)">搜索</el-button>
      <el-button type="primary" @click="handleAdd">添加用户</el-button>
    </el-row>
    <el-table 
      :data="tableData"
      empty-text="暂无数据"
      border
      stripe
      max-height="650px"
      show-overflow
      >
      <el-table-column 
        v-for="item in options" 
        :key="item.id" 
        :prop="item.prop" 
        :label="$t(`table.${item.label }`)" 
        align="center"
        :width="item.width"
      >
      <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
        <el-switch v-model="row.mg_state" @change="handleUserStatus(row)" />
      </template>
      <template v-slot="{ row }" v-else-if="item.prop === 'action'">
        <el-button type="primary" :icon="Edit" @click="() => { editDialog = true; editData = row }" />
        <el-button type="danger" :icon="Delete" @click="deleteUsers(row)" />
      </template>
      </el-table-column>
  </el-table>
  <el-config-provider :locale="locale">
    <el-pagination
      v-model:currentPage="pageObj.pagenum"
      v-model:page-size="pageObj.pagesize"
      :page-sizes="pageObj.sizeList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.total"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-config-provider>
  </el-card>
  <addUser :show="dialogVisible" @get-data="getUsersList" @close="() => { dialogVisible = false; }" />
  <editUser :show="editDialog" :data="editData" @get-data="getUsersList" @close="() => { editDialog = false; }" />
</template>

<script setup lang="ts">
import { Search, Edit, Delete } from '@element-plus/icons-vue';
import { ElConfigProvider, ElMessage } from 'element-plus'
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import dayjs  from 'dayjs';
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import addUser from './components/addUser.vue';
import editUser from './components/editUser.vue';
import { getUsers, searchUser, changeUserStatus, deleteUser } from '@/api/userList';

interface Page{
  pagenum: number, // 页码
  pagesize: number, // 条数
  sizeList: Array<number>, // 可选条数
  total: number, // 总数
}
// 用户状态改变
interface userStatus{
  uId: String,
  type: Boolean,
}

// 搜索用户名
const input: Ref<string> = ref('');
// 表头 
const options: Ref<any> = ref([
  {
    label: 'username',
    prop: 'username'
  },
  {
    label: 'email',
    prop: 'email'
  },
  {
    label: 'mobile',
    prop: 'mobile'
  },
  {
    label: 'role_name',
    prop: 'role_name'
  },
  {
    label: 'mg_state',
    prop: 'mg_state'
  },
  {
    label: 'create_time',
    prop: 'create_time'
  },
  {
    label: 'action',
    prop: 'action',
  }
])
// 表格数据
let tableData: Ref<any> = ref([]);
// page数据
const pageObj:Page = reactive({
  pagenum: 1,
  pagesize: 10,
  sizeList: [10, 20, 30, 50,  100],
  total: 0,
})
const dialogVisible: Ref<Boolean> = ref(false);
const editDialog: Ref<Boolean> = ref(false);
let editData: Ref<any> = ref({});

const locale = zhCn;

const handleSizeChange = (val: number) => {
  pageObj.pagesize = val;
  getUsersList();
}
const handleCurrentChange = (val: number) => {
  pageObj.pagenum = val;
  getUsersList();
}

//获取用户列表
const getUsersList = ():void => {
  let query = {
    query: '',
    pagenum: pageObj.pagenum,
    pagesize: pageObj.pagesize,
  }
  getUsers(query).then(res => {
    res.users.forEach((item: { create_time: string }) => {
      item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
    });
    tableData.value = res.users;
    pageObj.total = res.total;
  })
}
getUsersList();

// 查询用户
const searchUserData = (val:(number | string)): void => {
  let id:any = ref();
  tableData.value.forEach((item: any) => {
    if(val === item.username) {
      id = item.id;
    }
  })
  if(val) {
    searchUser(Number(id)).then(res => {
    tableData.value = [];
    tableData.value.push(res);
   })
  }else {
    getUsersList();
  }
}

// 修改用户状态
const handleUserStatus = (row: any):void => {
  console.log(row);
  let query:userStatus = reactive({
    uId: row.id,
    type: row.mg_state,
  });
  changeUserStatus(query).then(res => {
    if(res) {
      ElMessage({
        message: '修改状态成功！',
        type: 'success',
      })
    }
  })
}

// 删除用户
const deleteUsers = (data: any):void => {
  deleteUser(data.id).then(res => {
    ElMessage({
      message: `删除用户成功！`,
      type: 'success',
    })
  }).finally(() => {
    getUsersList();
  })
}

// 添加用户
const handleAdd = ():void => {
  dialogVisible.value = true;
}

</script>

<style lang="scss" scoped>
.box-card {
  min-width: 1200px;
}
.header {
  margin-bottom: 16px;
  box-sizing: border-box;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
