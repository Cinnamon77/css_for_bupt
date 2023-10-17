<script setup lang="ts">
const schoolInfo = defineProps(['info'])
const getColor = computed(() => {
  if (schoolInfo.info.order === 1)
    return '#D71F07'
  else if (schoolInfo.info.order === 2)
    return '#1096DF'
  else if (schoolInfo.info.order === 3)
    return '#E6E6E6'
})
</script>

<template>
  <div class="container">
    <div class="left item">
      <img v-if="info.url" :src="info.url" :alt="info.name" class="image">
      <img v-else src="@/assets/logo.png" :alt="info.name" class="image">
    </div>
    <div class="right item">
      <div>
        <h3 class="ch">
          {{ info.chineseName }}
        </h3>
        <p class="en">
          {{ info.englishName }}
        </p>
      </div>
      <div>
        <h4 class="order">
          {{ info.ranking }}
        </h4>
      </div>
    </div>
    <div class="item">
      <van-icon v-if="info.emphasize && info.order <= 3" class="icon" name="bookmark" size="40" :color="getColor" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display:flex;
  height: 120px;
  background-color: white;
}
.left{
  margin:10px;
}
.image{
  height:100px;
  width:100px;
  background-size: cover;
  background-clip: border-box;
  border-radius:5px;
}

.right{
  margin:10px 0px;
  height:100px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}

.right p{
  padding:0px;
  margin:0px;
}
.ch{
  /* font-size:10px; */
  margin: 0px;
  padding:0px;
  font-weight:bold;
}
.en{
  font-size:12px;
  color:#D7D7D7;
}
.order{
  /* font-size:12px; */
  padding:0px;
  margin: 0px;
  font-weight:bold;
}
.item:last-child{
  margin: auto;
  margin-top: 0px;
  margin-right: 5px;
}
</style>
