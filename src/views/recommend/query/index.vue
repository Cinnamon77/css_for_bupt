<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRecommandStore } from '@/stores/recommand'
import Swip from '@/components/swip/index.vue'
const recommandStore = useRecommandStore()

const condition = reactive({
  location: '不限',
  score: null,
  toefl: null,
  ielts: null,
  gre: null,
})
const columns = [
  { text: '不限', value: 'NoLimit' },
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
]
const router = useRouter()
const onSubmit = async (values) => {
  // console.log('recommand query', values)
  const body = {
    location: values.Area,
    score: Number(values.GPA),
    toefl: Number(values.TOEFL),
    ielts: Number(values.IELTS),
    gre: Number(values.GRE),
  }
  await recommandStore.getSchools(body)
  if (recommandStore.schools)
    router.push('/recommand/result')
}
const showPicker = ref(false)

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  condition.location = selectedOptions[0].text
}
</script>

<template>
  <div>
    <Swip />
  </div>
  <div>
    <h3 class="tips">
      输入查询条件
    </h3>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="condition.location" is-link readonly name="Area" label="所在地区" placeholder="选择城市"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
        <van-field v-model="condition.score" name="GPA" label="GPA总分" placeholder="请输入GPA" type="number" />
        <van-field v-model="condition.toefl" name="TOEFL" label="TOEFL总分" placeholder="请输入TOEFL" type="number" />
        <van-field v-model="condition.ielts" name="IELTS" label="IELTS总分" placeholder="请输入IELTS" type="number" />
        <van-field v-model="condition.gre" name="GRE" label="GRE总分" placeholder="请输入GRE" type="number" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block type="primary" native-type="submit">
          查询
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.tips {
  text-align: center;
}

:deep(.van-field__control) {
  text-align: right;
}
</style>
