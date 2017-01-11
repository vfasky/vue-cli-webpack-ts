/// <reference path='../../typings/tsd.d.ts' />

'use strict'

import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

import './app.scss'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    { path: '/', component: require('../views/home').default }
  ]
})

export default new Vue({
  router
}).$mount('#app')
