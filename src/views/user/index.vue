<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user/index'
import { feature, getAPI } from '@/utils/axios-utils'
import { DefaultApi } from '@/api-services'
const userStore = useUserStore()
const { loginState, userInfo, roles } = storeToRefs(userStore)
const logOut = async () => {
  await userStore.signOut()
}
const router = useRouter()
const route = useRoute()
const login = () => router.push({ name: 'login', query: { path: route.path } })
const isAdmin = computed(() => {
  return roles.value?.some(t => t.toUpperCase() === 'ROLE_ADMIN')
})
const fileList = ref([])

const afterRead = async (file) => {
  file.status = 'uploading'
  file.message = '上传中...'

  const [err, res] = await feature(getAPI(DefaultApi).createFromExcel1(file.file))
  if (err) {
    file.status = 'failed'
    file.message = '上传失败'
  }
  if (res) {
    file.status = 'done'
    file.message = '上传完成'
  }
  // createFromExcel5

  // 此时可以自行将文件上传至服务器
}
</script>

<template>
  <div class="user-container">
    <div v-if="loginState" class="content">
      <div>
        <img src="@/assets/photo.jpg" alt="" class="image">
      </div>
      <div class="right">
        <div class="login">
          <div>
            <div>
              用户名： {{ userInfo.username }}
            </div>
            <div>
              用户组：  {{ userInfo.userGroup }}
            </div>
          </div>
          <div>
            <van-button size="mini" @click="logOut">
              退出
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-button size="mini" @click="login">
        登陆
      </van-button>
    </div>
  </div>
  <div v-if="loginState" class="item">
    <div>
      用户角色
    </div>
    <div v-for="(role, index) in roles" :key="index">
      {{ role }}
    </div>
  </div>
  <div v-if="isAdmin" class="item">
    <van-uploader
      v-model="fileList"
      :after-read="afterRead" max-count="1"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    >
      <van-button icon="plus" type="primary" size="mini">
        上传学校信息
      </van-button>
    </van-uploader>
  </div>
</template>

<style scoped>
.user-container{
  background-color:white;
  height:76px;
  padding:8px;
  margin-bottom:8px;
}
.content{
  display:flex;
  align-items: center;

}
.image{
  height:60px;
  width:60px;
  background-size: cover;
  background-clip: border-box;
  border-radius:5px;
}
.right{
  height:60px;
  margin-left:8px;
}
.login{
  height:60px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}

.item{
  min-height:150px;
  margin-bottom:8px;
  padding:8px 8px;
  border-radius:5px;
  background-color:white;
}
.preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
</style>
