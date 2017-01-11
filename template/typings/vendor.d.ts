declare module 'webpack-dev-server/*'
declare module 'fs-plus'
declare module 'glob'
declare module 'env' {
    interface Env {
        [key:string]: any
    }
    var env: Env
    export default env
}

declare module 'object-assign' {
    interface Assign {
        (target: any, ...sources: any[]): any;
    }

    var assign: Assign
    export = assign
}