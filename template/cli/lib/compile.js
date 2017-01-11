/**
 * 
 * @author vfasky<vfasky@gmail.com>
 * @author Allenice <994298628@qq.com>
 **/
'use strict'

const fs = require('fs-extra')

function fillZero (num) {
    if (num < 10) {
        return '0' + num
    }

    return num
}

function dateFormat (date) {
    let year = date.getFullYear()
    let month = fillZero(date.getMonth() + 1)
    let day = fillZero(date.getDate())
    let hour = fillZero(date.getHours())
    let min = fillZero(date.getMinutes())
    let sec = fillZero(date.getSeconds())

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

module.exports = function (filePath, data) {
    data.date = dateFormat(new Date())

    let source = fs.readFileSync(filePath, 'utf8')

    Object.keys(data).forEach((key) => {
        let reg = new RegExp('{{' + key + '}}', 'g')
        // console.log(reg)
        source = source.replace(reg, data[key])
    })

    return source
}