import PreviewComponent from './preview-img.vue'
import Vue from 'vue'
import '../../theme-chalk/preview-img.scss'

function PreviewImg(imgArr, opts = {}) {
  let app = null;
  opts.closeCb = () => {
    document.body.removeChild(app.$el)
    app.$destroy()
  }
  const PreviewPlugin = Vue.extend(PreviewComponent)
  app = new PreviewPlugin({ propsData: {imgArr, ...opts} })
  app.$mount()
  document.body.appendChild(app.$el)
}

export default PreviewImg