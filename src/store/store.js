import Vue from 'vue'
import Vuex from 'vuex'
import { ADD_TEST_DATA } from './types.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentTestData: {}
  },
  mutations: {
    [ADD_TEST_DATA] (state, payload) {
      state.currentTestData = payload
    }
  },
  actions: {
    setTestData ({commit}, payload) {
      commit(ADD_TEST_DATA, payload)
    }
  },
  getters: {
    getTestData (state) {
      return state.currentTestData
    }
  }
})
