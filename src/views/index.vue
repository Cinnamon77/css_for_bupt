<script setup lang="ts">
import { useStore } from '@/stores'
import { localStorage } from '@/utils/local-storage'

const store = useStore()
const themeStore = localStorage.get('theme')
const checked = ref<boolean>(themeStore === 'dark')
const CASURL = 'https://auth.bupt.edu.cn/authserver/login?service=http://10.3.240.84/sso'
watch(checked, (val) => {
  if (val) {
    store.mode = 'dark'
    localStorage.set('theme', 'dark')
  }
  else {
    store.mode = 'light'
    localStorage.set('theme', 'light')
  }
})
</script>

<template>
  <div class="container">
    <!-- <div class="logo" /> -->
    <van-cell-group title="国院工学大数据" inset>
      <van-cell title="本地登陆" to="login" is-link />
      <van-cell title="CAS登陆" :url="CASURL" is-link />
      <van-cell title="智能推荐查询" to="recommand/query" is-link />
      <!-- <van-cell title="智能推荐学校" to="recommand/result" is-link /> -->
      <van-cell title="查询学校" to="school/query" is-link />
      <!-- <van-cell title="学校查询结果" to="school/result" is-link /> -->
      <!-- <van-cell title="学校详情" to="school/introduce" is-link /> -->
      <!-- <van-cell title="专业详情" to="school/major" is-link /> -->
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  position: relative;

  .logo {
    width: 150px;
    height: 150px;
    background-image: url('@/assets/logo.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
