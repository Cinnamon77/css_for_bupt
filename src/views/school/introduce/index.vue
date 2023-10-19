<script setup lang="ts">
import { useSchoolStore } from '@/stores/school'
import School from '@/components/school/index.vue'
import { Chart } from '@/components'
import Table from '@/components/table/index.vue'
const schoolStore = useSchoolStore()
const schoolDetail = schoolStore.schoolDetail
const detail = schoolStore.detail
const refLineOption = schoolStore.lineOption
const majors = schoolStore.majors
</script>

<template>
  <div class="school-introduce-container">
    <School :info="detail" class="school" />
    <div class="introduce">
      <p>{{ detail.introduction }}</p>
      <div class="hyperlink">
        <a :href="schoolDetail.schoolLink" target="_blank">查看官网</a>
      </div>
    </div>
    <div class="chart item">
      <Chart :option="refLineOption" :style="{ height: '300px' }" />
    </div>
    <div class="table">
      <Table :majors="majors" />
    </div>
  </div>
</template>

<style scoped>
.school-introduce-container {
  /* background-color:#885FFF; */
}

.school {
  padding: 0px 8px;
}

.introduce p {
  padding: 0px 20px;
  margin: 0px 0px;
  font-size: 10px;
  background-color: white;
}

.hyperlink {
  font-size: 10px;
  text-align: right;
  padding: 8px 13px;
  background-color: white;
}

.chart {
  background: #fff;
  margin:8px;
  border-radius:8px;
  padding:8px;
}

.chart.item {
  margin-top: 15px;
}

.table{
  background: #fff;
  margin:8px;
  padding: 10px;
  border-radius:8px;
}
</style>
