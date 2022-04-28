import Vue from 'vue'
import App from './App.vue'
import hl from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

import DemoBlock from '@/examples/common'
import ArbBlock from '@/examples/attribute'

import cqcUI from '@/packages'

Vue.config.productionTip = false
Vue.component('DemoBlock', DemoBlock)
Vue.component('ArbBlock', ArbBlock)

Vue.use(cqcUI)

Vue.directive('highlight', el => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hl.highlightBlock(block)
  })
})


new Vue({
  render: h => h(App)
}).$mount('#app')
