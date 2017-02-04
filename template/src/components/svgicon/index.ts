/**
 * svgicon
 * @author
 */

'use strict'

import * as $ from 'jquery'

import './svgicon.scss'

export default {

    template: require('./svgicon.html'),
    props: {
        icon: String,
        width: String,
        height: String,
        dir: String,
        fill: Boolean
    },

    watch: {
        icon () {
            this.buildSVG()
        },
        width () {
            this.buildSVG()
        },
        height () {
            this.buildSVG()
        },
        dir () {
            this.buildSVG()
        },
        fill () {
            this.buildSVG()
        },
    },

    created () {
        this.$parentNode = $(this.$el)
        this.buildSVG()
    },

    data () {
        return {
            html: ''
        }
    },

    methods: {
        buildSVG () {
            let width: string = this.width || ''
            let height: string = this.height || ''
            let className: string = 'svg-icon'
            let style: string = ''

            if (width) {
                style += `width: ${width};`
            }
            if (height) {
                style += `height: ${height};`
            }
            if (style) {
                style = `style="${style}"`
            }

            if (this.dir) {
                className += ' svg-' + this.dir
            }

            if (this.fill !== undefined && !this.fill) {
                className += ' svg-fill'
            }

            this.html = `
                <svg class="${className}" ${style}>
                    <use xlink:href="#svg-${this.icon}" ></use>
                </svg>
            `
        }
    }
}

