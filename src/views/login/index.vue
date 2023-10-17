<script setup lang="ts" name="login">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { RouteLocationRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user/index'
const userStore = useUserStore()
const { loginState } = storeToRefs(userStore)

const onClickLeft = () => history.back()
const username = ref('admin')
const password = ref('admin')

const ruleForm = ref<any>(null)
const router = useRouter()
const route = useRoute()

const onSubmit = async (values) => {
  await userStore.signIn(values)
  if (loginState.value) {
    if (route.query.path)
      router.push(route.query.path as RouteLocationRaw)
    else router.push({ name: 'main' })
  }
}
</script>

<template>
  <div class="login-container">
    <van-nav-bar title="登陆" left-arrow @click-left="onClickLeft" />
    <div calss="top">
      <h1 class="title">
        欢迎使用
      </h1>
      <h1 class="title">
        国院学工大数据系统
      </h1>
    </div>
    <div class="form">
      <van-form ref="ruleForm" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            autocomplete="username"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            autocomplete="current-password"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.login-container{
  background-color: white;
  height: 100vh;
}
.title {
  text-align: center;
}
.form{
  margin-top: 100px;
}
</style>
