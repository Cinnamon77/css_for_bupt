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
      //为了调试页面，暂时关闭===============
      // const [, res] = await feature(getAPI(DefaultApi).query5(id, schoolName))
      //为了调试页面，暂时关闭===============
      const res={
        data:{
          "code": 200,
          "msg": null,
          "data": {
              "current": 1,
              "first": 1,
              "pre": 1,
              "next": 1,
              "last": 1,
              "pageSize": 10,
              "total": 4,
              "pages": null,
              "currSize": 4,
              "list": [
                  {
                      "id": 1,
                      "schoolName": "麻省理工学院",
                      "schoolLink": "https://www.mit.edu/",
                      "name": "Life Science and Information",
                      "ranking": "4",
                      "admissionRequirement": "假数据",
                      "applicationTime": "2076-12-31T16:00:00.000+00:00",
                      "courseDetails": "假数据",
                      "link": "https://www.mit.edu/",
                      "applicationChannel": "假数据"
                  },
                  {
                      "id": 2,
                      "schoolName": "麻省理工学院",
                      "schoolLink": "https://www.mit.edu/",
                      "name": "Data Science",
                      "ranking": "1",
                      "admissionRequirement": "假数据",
                      "applicationTime": "2077-11-30T16:00:00.000+00:00",
                      "courseDetails": "假数据",
                      "link": "https://www.mit.edu/",
                      "applicationChannel": "假数据"
                  },
                  {
                      "id": 3,
                      "schoolName": "麻省理工学院",
                      "schoolLink": "https://www.mit.edu/",
                      "name": "Engineering - Chemical",
                      "ranking": "1",
                      "admissionRequirement": "假数据",
                      "applicationTime": "2077-01-30T16:00:00.000+00:00",
                      "courseDetails": "假数据",
                      "link": "https://www.mit.edu/",
                      "applicationChannel": "假数据"
                  },
                  {
                      "id": 4,
                      "schoolName": "麻省理工学院",
                      "schoolLink": "https://www.mit.edu/",
                      "name": "Linguistics",
                      "ranking": "1",
                      "admissionRequirement": "假数据",
                      "applicationTime": "2077-10-09T16:00:00.000+00:00",
                      "courseDetails": "假数据",
                      "link": "https://www.mit.edu/",
                      "applicationChannel": "假数据"
                  }
              ]
          }
      }
      }
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

      //为了调试页面，暂时关闭===============
      // const [err, res] = await feature(getAPI(DefaultApi).query3(undefined, school))
      // if (err)
      //   return false
      //为了调试页面，暂时关闭===============
      const res = {
        data:{
          "code": 200,
          "msg": null,
          "data": {
              "current": 1,
              "first": 1,
              "pre": 1,
              "next": 1,
              "last": 1,
              "pageSize": 10,
              "total": 3,
              "pages": null,
              "currSize": 1,
              "list": [
                  {
                      "id": 1,
                      "name": "麻省理工学院",
                      "ranking": "1",
                      "icon": "http://10.3.240.84/oversea/image/76DCFF4A-CFA0-4043-8712-AA79AD87C880.jpg",
                      "location": "United States",
                      "introduction": "“Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students.... Read more “Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students. MIT is now an independent, coeducational, privately endowed university organized into five schools (architecture and planning; engineering; humanities, arts, and social sciences; management; science). Yet the principle of educational innovation remains at the core of MIT’s educational philosophy. MIT researchers are at the forefront of developments in artificial intelligence, climate adaptation, HIV, cancer, and poverty alleviation, while in the past MIT research has fuelled scientific breakthroughs such as the development of radar, the invention of magnetic core memory and the concept of the expanding universe. Science and technology are not the only strings to MIT’s bow, however. Approximately 20 percent of MIT undergraduates join a sports team, and with 33 varsity sports MIT boasts one of the broadest intercollegiate athletic programs in the world. A vibrant arts culture also permeates college life. There are 12 museums and galleries on campus, with the MIT Museum drawing nearly 125,000 visitors each year. Students participate in more than 60 music, theatre, writing and dance groups, and faculty members of MIT even include Pulitzer Prize winners and Guggenheim fellows.MIT is set in 168 acres of grounds that extend for more than a mile along the Cambridge side of the Charles River basin. The campus features stunning landmarks designed by the likes of architects Alvar Aalto, Frank Gehry, and Steven Hollin, as well as buildings in a range of architectural styles, from neoclassical to modernist and brutalist. At its edges, the campus merges with various Cambridge neighborhoods, including Kendall Square which is one of the most innovative square miles on the planet. The close association of industry and research has helped MIT alumni go on to launch more than 30,000 active companies, creating 4.6 million jobs and generating roughly $1.9 trillion in annual revenue. No wonder then that a nation of MIT graduates would be equivalent to the 10th-largest economy in the world. Read less",
                      "createdTime": "2023-09-25T14:11:51.217+00:00",
                      "modifiedTime": "2023-09-25T14:11:51.217+00:00"
                  },
                  {
                    "id": 1,
                    "name": "麻省理工学院",
                    "ranking": "1",
                    "icon": "http://10.3.240.84/oversea/image/76DCFF4A-CFA0-4043-8712-AA79AD87C880.jpg",
                    "location": "United States",
                    "introduction": "“Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students.... Read more “Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students. MIT is now an independent, coeducational, privately endowed university organized into five schools (architecture and planning; engineering; humanities, arts, and social sciences; management; science). Yet the principle of educational innovation remains at the core of MIT’s educational philosophy. MIT researchers are at the forefront of developments in artificial intelligence, climate adaptation, HIV, cancer, and poverty alleviation, while in the past MIT research has fuelled scientific breakthroughs such as the development of radar, the invention of magnetic core memory and the concept of the expanding universe. Science and technology are not the only strings to MIT’s bow, however. Approximately 20 percent of MIT undergraduates join a sports team, and with 33 varsity sports MIT boasts one of the broadest intercollegiate athletic programs in the world. A vibrant arts culture also permeates college life. There are 12 museums and galleries on campus, with the MIT Museum drawing nearly 125,000 visitors each year. Students participate in more than 60 music, theatre, writing and dance groups, and faculty members of MIT even include Pulitzer Prize winners and Guggenheim fellows.MIT is set in 168 acres of grounds that extend for more than a mile along the Cambridge side of the Charles River basin. The campus features stunning landmarks designed by the likes of architects Alvar Aalto, Frank Gehry, and Steven Hollin, as well as buildings in a range of architectural styles, from neoclassical to modernist and brutalist. At its edges, the campus merges with various Cambridge neighborhoods, including Kendall Square which is one of the most innovative square miles on the planet. The close association of industry and research has helped MIT alumni go on to launch more than 30,000 active companies, creating 4.6 million jobs and generating roughly $1.9 trillion in annual revenue. No wonder then that a nation of MIT graduates would be equivalent to the 10th-largest economy in the world. Read less",
                    "createdTime": "2023-09-25T14:11:51.217+00:00",
                    "modifiedTime": "2023-09-25T14:11:51.217+00:00"
                },
                {
                  "id": 1,
                  "name": "麻省理工学院",
                  "ranking": "1",
                  "icon": "http://10.3.240.84/oversea/image/76DCFF4A-CFA0-4043-8712-AA79AD87C880.jpg",
                  "location": "United States",
                  "introduction": "“Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students.... Read more “Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students. MIT is now an independent, coeducational, privately endowed university organized into five schools (architecture and planning; engineering; humanities, arts, and social sciences; management; science). Yet the principle of educational innovation remains at the core of MIT’s educational philosophy. MIT researchers are at the forefront of developments in artificial intelligence, climate adaptation, HIV, cancer, and poverty alleviation, while in the past MIT research has fuelled scientific breakthroughs such as the development of radar, the invention of magnetic core memory and the concept of the expanding universe. Science and technology are not the only strings to MIT’s bow, however. Approximately 20 percent of MIT undergraduates join a sports team, and with 33 varsity sports MIT boasts one of the broadest intercollegiate athletic programs in the world. A vibrant arts culture also permeates college life. There are 12 museums and galleries on campus, with the MIT Museum drawing nearly 125,000 visitors each year. Students participate in more than 60 music, theatre, writing and dance groups, and faculty members of MIT even include Pulitzer Prize winners and Guggenheim fellows.MIT is set in 168 acres of grounds that extend for more than a mile along the Cambridge side of the Charles River basin. The campus features stunning landmarks designed by the likes of architects Alvar Aalto, Frank Gehry, and Steven Hollin, as well as buildings in a range of architectural styles, from neoclassical to modernist and brutalist. At its edges, the campus merges with various Cambridge neighborhoods, including Kendall Square which is one of the most innovative square miles on the planet. The close association of industry and research has helped MIT alumni go on to launch more than 30,000 active companies, creating 4.6 million jobs and generating roughly $1.9 trillion in annual revenue. No wonder then that a nation of MIT graduates would be equivalent to the 10th-largest economy in the world. Read less",
                  "createdTime": "2023-09-25T14:11:51.217+00:00",
                  "modifiedTime": "2023-09-25T14:11:51.217+00:00"
              }
              ]
          }
      }
      }

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
      //为了调试页面，暂时关闭===============
      // const [err, res] = await feature(getAPI(PythonAIApi).query6(id))
      //为了调试页面，暂时关闭===============
      const err=null
      const res = {
        data:{
          "code": 200,
          "msg": null,
          "data": {
              "schoolInfoDetailsVo": {
                  "id": 1,
                  "name": "麻省理工学院",
                  "ranking": "1",
                  "icon": "http://10.3.240.84/oversea/image/76DCFF4A-CFA0-4043-8712-AA79AD87C880.jpg",
                  "location": "United States",
                  "introduction": "“Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students.... Read more “Mind and Hand” is the thought-provoking motto of the Massachusetts Institute of Technology, known also as MIT. This motto enigmatically encapsulates this famous institution’s mission to advance knowledge in science, technology and areas of scholarship that can help to make the world a better place. At its founding in 1861, MIT was initially a small community of problem-solvers and science lovers eager to bring their knowledge to bear on the world. Today, MIT has evolved into an educational behemoth, with some 1,000 faculty members and more than 11,000 undergraduate and graduate students. MIT is now an independent, coeducational, privately endowed university organized into five schools (architecture and planning; engineering; humanities, arts, and social sciences; management; science). Yet the principle of educational innovation remains at the core of MIT’s educational philosophy. MIT researchers are at the forefront of developments in artificial intelligence, climate adaptation, HIV, cancer, and poverty alleviation, while in the past MIT research has fuelled scientific breakthroughs such as the development of radar, the invention of magnetic core memory and the concept of the expanding universe. Science and technology are not the only strings to MIT’s bow, however. Approximately 20 percent of MIT undergraduates join a sports team, and with 33 varsity sports MIT boasts one of the broadest intercollegiate athletic programs in the world. A vibrant arts culture also permeates college life. There are 12 museums and galleries on campus, with the MIT Museum drawing nearly 125,000 visitors each year. Students participate in more than 60 music, theatre, writing and dance groups, and faculty members of MIT even include Pulitzer Prize winners and Guggenheim fellows.MIT is set in 168 acres of grounds that extend for more than a mile along the Cambridge side of the Charles River basin. The campus features stunning landmarks designed by the likes of architects Alvar Aalto, Frank Gehry, and Steven Hollin, as well as buildings in a range of architectural styles, from neoclassical to modernist and brutalist. At its edges, the campus merges with various Cambridge neighborhoods, including Kendall Square which is one of the most innovative square miles on the planet. The close association of industry and research has helped MIT alumni go on to launch more than 30,000 active companies, creating 4.6 million jobs and generating roughly $1.9 trillion in annual revenue. No wonder then that a nation of MIT graduates would be equivalent to the 10th-largest economy in the world. Read less",
                  "schoolPastRankingVos": [
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2012,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2014,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2015,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2016,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2017,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2018,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2019,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2020,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2021,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2022,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2023,
                          "rank": 1
                      },
                      {
                          "schoolId": 1,
                          "schoolName": "麻省理工学院",
                          "year": 2024,
                          "rank": 1
                      }
                  ]
              },
              "offerWithStuInfo": null
          }
      }
      }
      if (res) {
        console.log(res)
        const ranking = res.data.data?.schoolInfoDetailsVo?.schoolPastRankingVos
        console.log(ranking)
        if (ranking)
          this.ranking = ranking
      }

      // if (err)
      //   this.ranking = null
    },
  },
})
