import Vue from 'vue'
import App from './App.vue'
import cqcUi from './packages/index'

Vue.use(cqcUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
