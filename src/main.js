// 진입
require('babel-polyfill')
import Vue from 'vue'
import Home from 'view/Home.vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
//import {store} from 'stores/store.js'


Vue.use(Vuex)

new Vue({
  el: '#App', //인스턴스가 그려지는 화면의 시작점 (특정 HTML 태그)
 // store,  //json 데이터
  render: h => h(Home)
})


