<template>
  <div class="login-container">
    <el-form
     :model="form"
     ref="formRef"
     class="login-form"
     :rules="rules"
     >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <svg-icon icon="user" class="svg-container" />
        <el-input v-model="form.username" placeholder="Please input username" />
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon icon="password" class="svg-container" />
        <el-input v-model="form.password" :type="passwordType"  placeholder="Please input password" />
        <svg-icon 
         :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          class="svg-container"
          @click="showPwd"
          style="cursor:pointer;" />
      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin(formRef)">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import type { FormInstance } from 'element-plus';
interface Form{
  username: string,
  password: any,
}

const form: Form = reactive({
  username: 'admin', // 用户名
  password: '123456', // 密码
});
// 校验规则
const rules:object = reactive({
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ]
})
let passwordType = ref('password');
const formRef = ref<FormInstance>()

const store = useStore();

// 登录验证
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await store.dispatch('app/login', form);
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// 展示密码
const showPwd = ():void => {
  if(passwordType.value === 'password') {
    passwordType.value = 'text';
  }else {
    passwordType.value = 'password';
  }
}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $bg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        width: 100%;
        caret-color: $cursor;
        box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
