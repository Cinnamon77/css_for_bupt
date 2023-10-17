<script setup lang="ts">
import { useRouter } from 'vue-router'
import Swip from '@/components/swip/index.vue'
import { useSchoolStore } from '@/stores/school'
const router = useRouter()
const schoolStore = useSchoolStore()

const condition = reactive({
  location: '不限',
  school: '',
})

const onSubmit = async () => {
  // let location = condition.location.trim()
  // if (location === '不限')
  // location = undefined
  const school = condition.school.trim()
  const res = await schoolStore.getSchoolInfo(school)
  if (res && schoolStore.schoolInfos != null && schoolStore.schoolInfos.length > 0)
    router.push('/school/result')
}

const columns = [
  { text: '不限', value: undefined },
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
]
const showPicker = ref(false)

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  condition.location = selectedOptions[0].text
}

const validator = (val: string) => val && val.trim().length > 0
</script>

<template>
  <div>
    <Swip />
  </div>
  <h3 class="tips">
    输入学校名称
  </h3>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="condition.location"
          is-link
          readonly
          name="location"
          label="所在地区"
          placeholder="选择城市"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          v-model="condition.school"
          name="name"
          label="学校名称"
          placeholder="请输入学校名称"
          :rules="[{ validator, required: true, message: '学校名称不能为空' }]"
        />
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
.tips{
  text-align:center;
}
:deep(.van-field__control){
  text-align: right;
}
</style>
