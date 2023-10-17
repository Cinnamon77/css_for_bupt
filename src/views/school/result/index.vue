<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSchoolStore } from '@/stores/school'
import School from '@/components/school/index.vue'
const router = useRouter()
const schoolStore = useSchoolStore()
const infos = schoolStore.schoolInfos

const showSchoolDetail = async (info) => {
  const schoolName = info.chineseName
  const res1 = await schoolStore.getMajorInfo(undefined, schoolName)
  await schoolStore.getSchoolRanking(info.id)
  if (res1)
    router.push('/school/introduce')
}
</script>

<template>
  <h3 class="title">
    查询结果
  </h3>
  <School v-for="(info) in infos" :key="info.id" class="school" :info="info" @click="showSchoolDetail(info)" />
</template>

<style scoped>
.title{
  margin-left:8px;
  margin-bottom:0px;
}
.school{
  margin:8px 8px;
  border-radius:5px;
}
.school:first-child{
  margin:8px 8px;
  margin-top: 0px;
}
</style>
