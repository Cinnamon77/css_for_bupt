import { defineStore } from 'pinia'
import { showNotify } from 'vant'
import type { MajorInfoVo, PageMajorInfoVo, PageSchoolInfo, SchoolInfo, SchoolPastRankingVo } from '@/api-services'
import { feature, getAPI } from '@/utils/axios-utils'
import { DefaultApi, PythonAIApi } from '@/api-services'

export const useSchoolStore = defineStore({
  id: 'school',
  state: () => {
    const pageSchool: PageSchoolInfo = null
    const pageMajorInfo: PageMajorInfoVo = null
    const majorDetail: MajorInfoVo = null
    const ranking: SchoolPastRankingVo[] = null
    const detail = null
    return {
      pageSchool,
      pageMajorInfo,
      majorDetail,
      ranking,
      detail,
    }
  },
  getters: {
    schoolInfos(state) {
      const info = []
      state.pageSchool?.list?.forEach((e) => {
        info.push({ id: e.id, chineseName: e.name, ranking: e.ranking, url: e.icon, order: e.id, introduction: e.introduction })
      })
      return info
    },
    schoolDetail(state) {
      if (state.pageMajorInfo?.list && state.pageMajorInfo.list.length > 0) {
        const schoolName = state.pageMajorInfo.list[0].schoolName
        const schoolLink = state.pageMajorInfo.list[0].schoolLink
        const r = state.pageSchool.list.filter(e => e.name === schoolName)[0]
        return { id: r?.id, chineseName: r.name, ranking: r.ranking, url: r.icon, order: r.id, introduction: r.introduction, schoolLink }
      }
    },
    majors(state) {
      console.log(state.pageMajorInfo?.list)
      return state.pageMajorInfo?.list
    },
    major(state) {
      return {
        name: state.majorDetail?.name,
        school: state.majorDetail?.schoolName,
        tag: state.majorDetail?.ranking,
        condition: state.majorDetail?.admissionRequirement,
        application: state.majorDetail?.applicationTime,
        course: state.majorDetail?.courseDetails,
        channel: state.majorDetail?.applicationChannel,
      }
    },
    lineOption(state) {
      const lineOption = {
        title: { text: '历年排名' },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          min: 1,
          max: 100,
          type: 'value',
          axisLabel: {
            formatter(v) {
              return 100 - v + 1
            },
          },
        },
        series: {
          type: 'line',
          data: [],
        },
      }
      if (state.ranking != null || state.ranking.length > 0)
      {
        state.ranking.forEach((e) => {
          lineOption.xAxis.data.push(`${e.year}`)
          lineOption.series.data.push(100 - e.rank)
        })
      }
      return {
        ...lineOption,
      }
    },
  },
  actions: {
    getMajorDetail(id: number) {
      this.majorDetail = this.pageMajorInfo?.list?.filter(e => e.id === id)[0]
    },
    async getMajorInfo(id: string, schoolName: string) {
      const [, res] = await feature(getAPI(DefaultApi).query5(id, schoolName))
      if (res) {
        if (res?.data && res.data.code === 200) {
          this.pageMajorInfo = res.data.data
          return true
        }
      }
      this.pageMajorInfo = null
      return false
    },
    async getSchoolInfo(school: string) {
      const [err, res] = await feature(getAPI(DefaultApi).query3(undefined, school))
      if (err)
        return false

      if (res) {
        if (res?.data && res?.data.code === 200) {
          if (res.data.data.list == null || res.data.data.list.length === 0) {
            showNotify({
              type: 'warning',
              message: '未查询到学校',
            })
            return false
          }
          else {
            this.pageSchool = res.data.data
            return true
          }
        }
        else {
          return false
        }
      }
    },
    async getSchoolRanking(id: number) {
      const thisId = id
      this.detail = this.pageSchool.list?.find(({ id }) => id === thisId)
      if (this.detail) {
        this.detail.chineseName = this.detail.name
        this.detail.url = this.detail.icon
        this.detail.order = this.detail.id
        console.log(this.detail)
      }
      const [err, res] = await feature(getAPI(PythonAIApi).query6(id))
      if (res) {
        const ranking = res.data.data?.schoolInfoDetailsVo?.schoolPastRankingVos
        if (ranking)
          this.ranking = ranking
      }
      if (err)
        this.ranking = null
    },
  },
})
