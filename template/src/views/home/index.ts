/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import * as Vue from 'vue'
import VueComponent from 'vue-class-component'

import Hello from '../../components/Hello'

import './home.scss'

@VueComponent({
  template: require('./home.html'),
  components: {
    Hello
  }
})
export default class extends Vue {
}