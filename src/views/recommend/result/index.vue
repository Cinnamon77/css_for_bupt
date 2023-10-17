<script setup lang="ts">
import { useRecommandStore } from '@/stores/recommand'
import School from '@/components/school/index.vue'
const recommandStore = useRecommandStore()
const infos = recommandStore.schoolInfos
</script>

<template>
  <h3 class="title">
    推荐结果
  </h3>
  <School v-for="(info, index) in infos" :key="index" class="school" :info="info" />
</template>

<style scoped>
.title{
  margin-left:8px;
  margin-bottom: 0px;
}
.school{
  margin:8px 8px;
  border-radius:5px;
}
.school:first-child{
  margin-top: 0px;
}
</style>
