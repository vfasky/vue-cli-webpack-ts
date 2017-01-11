/**
 * @date {{date}}
 * 
 **/
'use strict'

import * as Vue from 'vue'
import VueComponent from 'vue-class-component'
import { Store } from 'app/interface'

import './{{componentName}}.scss'

@VueComponent({
    template: require('./{{componentName}}.html'),
    components: {}
})
export default class extends Vue {
    $store: Store

    
}