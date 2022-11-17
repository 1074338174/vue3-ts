<template>
  <el-dialog
    v-model="show"
    title="编辑用户信息"
    width="30%"
    center
    destroy-on-close
    :close-on-click-modal="false"
    :before-close="close"
  >
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="邮箱：" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>
    <el-form-item label="手机号：" prop="mobile">
      <el-input v-model="ruleForm.mobile" />
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessageBox, FormInstance, FormRules, ElMessage } from 'element-plus';
import { editUser } from '@/api/userList';

const props = defineProps<{
  show: Boolean,
  data: any,
}>();

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'getData'): void
}>();

const ruleForm = ref({
  email: null, // 邮箱
  mobile: null, // 手机号
})

ruleForm.value.email = props.data.email; 
ruleForm.value.mobile = props.data.mobile; 

// 手机号验证
const validatePhone = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  }
};    

const rules = reactive<FormRules>({
  email: [
    { message: '请输入邮箱', trigger: 'blur'},
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'},
  ],
  mobile: [
    { message: '请输入手机号', trigger: 'blur'},
    { validator: validatePhone, message: '请输入正确手机号', trigger: 'blur'},
  ],
})

// 关闭弹窗
const close = () => {
  emit('close');
}

// 验证表单
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      editUsers();
    } else {
      ElMessage({
        message: '请检查填写内容是否正确！',
        type: 'error',
      })
    }
  })
}

// 编辑用户
const editUsers = () => {
  const query = {
    id: props.data.id,
    body: ruleForm.value,
  };
  ElMessageBox.confirm('确定添加该用户吗?').then(() => {
    editUser(query).then((res) => {
      ElMessage({
        message: '编辑用户成功！',
        type: 'success',
      })
    }).finally(() => {
      emit('close');
      emit('getData');
    });
  })
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>  