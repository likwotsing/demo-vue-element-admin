import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 全局注册
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// console.log(req.keys()) // ['./404.svg', './bug.svg', ...]
// console.log(req.keys().map(req)) // [Module, Module, ...]
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// req.keys().map(req)
