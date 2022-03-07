// 所有组件的入口

// import Button from './button.vue';
// import Icon from './icon.vue'
// import IconLoading from "./icon-loading.vue"
// import ButtonGroup from './button-group.vue'
import infiniteScroll from './infiniteScroll';

const install = (Vue) => {
  // Vue.component(Button.name, Button)
  // Vue.component(Icon.name, Icon)
  // Vue.component(IconLoading.name, IconLoading)
  // Vue.component(ButtonGroup.name, ButtonGroup)
  Vue.directive(infiniteScroll.name, infiniteScroll)
  /* 可以使用require.context(a,b,c)快速导入
      参数a -- 读取路径
      参数b -- 是否遍历子目录，true, false
      参数c -- 匹配的正则
  */
  const requireComponents = require.context('./', true, /\.vue/);
  // requireComponents.keys() 拿到.vue文件的路径
  requireComponents.keys().forEach(path => {
    const component = requireComponents(path).default // 拿到组件
    Vue.component(component.name, component)
  })
}

// 有可能组件会通过script标签的方式引入
//<script src='http://xxxx/cqc-ui'></script>

if (typeof window.Vue !== 'undefined') {
  install(Vue) // 全局直接通过script引入的方式会默认调用install方法
}

export default {
  install
}