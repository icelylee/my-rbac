//让TS识别.vue文件模块
declare module '*.vue'{
    import type {DefineComponent} from'vue'
    const component:DefineComponent<{},{},any>
    export default component
}