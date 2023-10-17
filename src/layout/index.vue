<script setup lang="ts">
import { useRoute } from 'vue-router'
const onClickLeft = () => history.back()

const active = ref('recommand')
const route = useRoute()

watch(route, (value) => {
  const userExp = /^\/user/
  const recommandExp = /^\/recommand/
  const schoolExp = /^\/school/
  if (value.path.match(schoolExp))
    active.value = 'school'
  else if (value.path.match(userExp))
    active.value = 'user'
  else if (value.path.match(recommandExp))
    active.value = 'recommand'
}, { immediate: true })
</script>

<template>
  <div class="recommand-container">
    <van-nav-bar title="国院工学大数据系统" left-arrow @click-left="onClickLeft" />
    <div class="view">
      <router-view />
    </div>
    <van-tabbar v-model="active" class="tabbar">
      <van-tabbar-item name="recommand" icon="home-o" replace to="/recommand/query">
        智能推荐
      </van-tabbar-item>
      <van-tabbar-item name="school" icon="envelop-o" replace to="/school/query">
        查询学校
      </van-tabbar-item>
      <van-tabbar-item name="user" icon="friends-o" replace to="/user">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.recommand-container{
  background-color: #F8F8FF;
  height: 100vh;
  position: relative;
}

.view{
  height: calc(100vh - var(--van-nav-bar-height) - var(--van-tabbar-height));
  overflow: auto;
}

.tabbar{
  position:absolute;
  bottom: 0px;
}
</style>
