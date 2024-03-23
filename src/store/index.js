/*
 * @Descripttion: 
 * @version: 
 * @Author: zhy
 * @Date: 2024-03-22 16:21:58
 * @LastEditors: zhy
 * @LastEditTime: 2024-03-22 16:37:06
 */
//store/index.js
import Vue from 'vue'
import Vuex from './myVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0
  },
  getter:{
    getNum:(state)=>{
      return state.num
    }
  },
  mutations: {
    incre(state,arg){
        state.num += arg
    }
  },
  actions: {
    asyncIncre({commit},arg){
        setTimeout(()=>{
          commit('incre',arg)
        },1000)
    }
  },
})
