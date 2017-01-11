#!/usr/bin/env node
/**
 * 
 * @author vfasky<vfasky@gmail.com>
 * 
 **/
'use strict'

const fs = require('fs-extra')
const path = require('path')
const yargs = require('yargs')
const colors = require('colors')
const complie = require('./lib/compile')
const confirm = require('./lib/confirm')

let cwd = process.cwd()

yargs.command(['add <componentName>', 'a'], 'Add a component to project', {
    type: {
        alias: 't',
        describe: 'The component type',
        choices: ['view', 'tag'],
        default: 'view'
    }
}, (args) => {
    let componentPath = args.componentName
    let baseComponentPaths = componentPath.split('/')
    let componentName = componentPath.substr(componentPath.lastIndexOf('/') + 1)
    let className = args.type + '-' + componentPath.replace(/\//g, '-').split(/(?=[A-Z])/)
        .map(str => { return str.toLocaleLowerCase() })
        .join('-')

    let tplPath = path.join(__dirname, './tpl/component')
    let tplData = {
        className,
        componentName
    }

    let nameMap = {
        'index.ts.tpl': 'index.ts',
        'style.scss.tpl': `${componentName}.scss`,
        'tpl.html.tpl': `${componentName}.html`,
    }

    baseComponentPaths.pop()
    let baseComponentPath = baseComponentPaths.join('/')

    fs.walkSync(tplPath).forEach((tplPath) => {
        let basename = path.basename(tplPath)
        
        let fileName = nameMap[basename]
        let outPath = path.join(cwd, 'src', args.type, baseComponentPath, componentName)
        let outFile = path.join(outPath,  fileName)

        function writeFile() {
            let source = complie(tplPath, tplData)
            fs.createFileSync(outFile)
            fs.writeFileSync(outFile, source, 'utf8')
            console.log(colors.green('write file: '))
            console.log(colors.underline(outFile))
        }

        if (fs.existsSync(outFile)) {
            confirm(`The ${args.type} ${baseComponentPath} ${componentName} is exist. Do your want to override it?`, (flag) => {
                if (flag) {
                    writeFile()
                }
            })
        } else {
            writeFile()
        }

    })

    
})
.help()
.argv