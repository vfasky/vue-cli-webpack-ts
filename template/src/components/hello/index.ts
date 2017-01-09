/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

@VueComponent({
  template: require('./hello.html')
})
export default class {
  data(): { msg: string } {
    return {
      msg: 'Hello World!'
    }
  }
}