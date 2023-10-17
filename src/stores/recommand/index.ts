import { defineStore } from 'pinia'
import { showNotify } from 'vant'
import { feature, getAPI } from '@/utils/axios-utils'
import type { ForecastDto } from '@/api-services'
import { PythonAIApi } from '@/api-services'

export const useRecommandStore = defineStore({
  id: 'recommand',
  state: () => {
    const schools = null
    return {
      schools,
    }
  },
  getters: {
    schoolInfos(state) {
      const infos = []
      state.schools?.forEach((e) => {
        infos.push({ id: e.id, chineseName: e.name, ranking: e.ranking, url: e.icon, order: e.id, introduction: e.introduction })
      })
      return infos
    },
  },
  actions: {
    async getSchools(body: ForecastDto) {
      const [err, res] = await feature(getAPI(PythonAIApi).doForecast(body))
      if (err) {
        showNotify({
          type: 'warning',
          message: '未查询到学校',
        })
        this.schools = null
      }
      if (res && res.data.data?.school) {
        if (res.data.data.school.length === 0) {
          showNotify({
            type: 'warning',
            message: '未查询到学校',
          })
          this.schools = null
        }
        else {
          this.schools = res.data.data.school
        }
      }
    },
  },
})
