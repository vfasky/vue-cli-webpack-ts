var path = require('path')
var SvgStore = require('webpack-svgstore-plugin')
var CleanPlugin = require('clean-webpack-plugin')
var buildSVGHtml = require('./tool/webpack/buildSVGHtml').default

module.exports = {
    entry: {
        svg: path.resolve('./static/svg/index.js')
    },

    output: {
        path: path.resolve('./static/svg/dist'),
        publicPath: '/',
        filename: '[name].js'
    },

    plugins: [
        new CleanPlugin('./static/images/svg'),
        new SvgStore({
            prefix: 'svg-',
            svgoOptions: {
                plugins: [
                    {
                        removeAttrs: {
                            attrs: ['fill', 'stroke', 'sketch:type', 'id']
                        }
                    },
                    {
                        removeTitle: true
                    },
                    {
                        removeStyleElement: true
                    }
                ]
            }
        }),
        function () {
            buildSVGHtml(path.resolve('static/svg/dist/icons.html'), path.resolve('static/svg/src'))
        }
    ]
}

