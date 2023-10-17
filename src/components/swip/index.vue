<script setup lang="ts">
import { ref } from 'vue'
import img1 from '@/assets/swp1.jpg'
import img2 from '@/assets/swp2.jpg'
const images = ref([
  img1, img2,
])
</script>

<template>
  <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img class="image" :src="image">
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>
.my-swipe {
  height: 150px;
  text-align:center;
}

.image {
  height:150px;
  background-size: contain;
  background-clip: border-box;
}
</style>
