<script setup lang="ts">
import { useSchoolStore } from '@/stores/school'
const schoolStore = useSchoolStore()
const major = schoolStore.major
</script>

<template>
  <div class="head">
    <h3 class="name">
      {{ major.name }}
    </h3>
    <div class="top">
      <p class="school">
        {{ major.school }}
      </p>
      <p class="tag-name">
        排名第{{ major.tag }}
      </p>
    </div>
  </div>
  <div class="item">
    <h3 class="title">
      录取条件
    </h3>
    {{ major.condition }}
  </div>
  <div class="item">
    <h3 class="title">
      申请时间
    </h3>
    {{ major.application }}
  </div>
  <div class="item">
    <h3 class="title">
      课程详情
    </h3>
    {{ major.course }}
  </div>
  <div class="item">
    <h3 class="title">
      申请通道
    </h3>
    {{ major.channel }}
  </div>
</template>

<style scoped>
.head{
  background-color:white;
  padding:8px;
}
.name{
  margin:10px 0px;
}
.school{
  margin:0px;
}
.top{
  display:flex;
  justify-content: space-between;
  height:20px;
  line-height:20px;
}

.tag-name{
  margin:0px;
  padding:0px 10px;
  color:var(--van-primary-color);
  background-color:#E2EEFC;
  border:1px solid var(--van-primary-color);
  border-radius:5px;
}
.title{
  margin:0px;
  margin-bottom:8px;
}
.item{
  border-radius:5px;
  background-color:white;
  margin:8px 8px;
  padding:8px;
  min-height:100px;
}
</style>
