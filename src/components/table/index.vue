<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSchoolStore } from '@/stores/school'
defineProps(['majors'])
const router = useRouter()
const schoolStore = useSchoolStore()
const getMajorInfo = (id: number) => {
  schoolStore.getMajorDetail(id)
  router.push('/school/major')
}
</script>

<template>
  <div>
    <div class="title">
      <h3>
        专业情况
      </h3>
    </div>
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>专业名称</th>
          <th>详情介绍</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="major in majors" :key="major.id">
          <td>
            {{ major.id }}
          </td>
          <td>
            {{ major.name }}
          </td>
          <td>
            <van-button plain size="mini" type="primary" @click="getMajorInfo(major.id)">
              详情
            </van-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h3{
  margin:0px;
  margin-bottom: 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #D7D7D7;
}

thead {
  background-color: #E8E8E8;
  height: 30px;
}
tr{
  height: 30px;
}
td {
  text-align: center;
}
</style>
