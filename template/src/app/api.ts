/**
 * api
 */

'use strict'

import * as Vue from 'vue'
import * as VueResource from 'vue-resource'
import config from 'config'
import * as md5 from 'js-md5'

Vue.use(VueResource)

let _token = ''

let _checkSuccess = function(res) {
    return res.body.code && Number(res.body.code) === 1
}

let _showErr = function(res) {
    let message = (res.body && res.body.msg) ? res.body.msg : '未知错误'
    alert(message)
}

let _formatResponse = function(res) {
    return res.body.response
}

export const send = function(url: string, data: any = {}, method = 'GET', timeout = 10000, hideErr = false){
    let hasBodyMethod = ['POST', 'PUT', 'PATH']
    let options = {
        timeout,
        params: {}
        // root: config.api.host 
    }
    let body = {}

    url = config.api.host + url

    // 添加 token
    if (data instanceof FormData) {
        data.append('token', _token)
    } else {
        data.token = _token
    }
    
    method = method.toLocaleUpperCase()

    function build() {
        if(hasBodyMethod.indexOf(method) !== -1) {
            return Vue.http[method.toLocaleLowerCase()](url, data, options)
        }
        options.params = data
        return Vue.http[method.toLocaleLowerCase()](url, options)
    }

    return build().then((response) => {
        if(_checkSuccess(response)) {
            return _formatResponse(response) 
        } else {
            _showErr(response)
            throw new Error('Check Success')
        }

    }, (response) => {
        if (hideErr) return response
        _showErr(response)
    })
}

export const post = function(url: string, data: any = {}, timeout = 10000, hideErr = false) {
    return send(url, data, 'POST', timeout, hideErr)
}

export const get = function(url: string, data: any = {}, timeout = 10000, hideErr = false) {
    return send(url, data, 'GET', timeout, hideErr)
}

export function setToken(token: string) {
    _token = token
}

export function setCheckSuccess (fun: (res: any) => boolean) {
    _checkSuccess = fun
}

export function setShowErr (fun: (res: any) => void) {
    _showErr = fun
}

export function setFormatResponse (fun: (res: any) => any) {
    _formatResponse = fun
}

export default {
    setToken
}