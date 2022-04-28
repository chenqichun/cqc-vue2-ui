import MessageComponent from './message.jsx'
import Vue from 'vue'
import '../../theme-chalk/message.scss'

let zIndex = 2000;
let top = 20;

function Message(msg, opts = {}) {
  opts.zIndex = ++zIndex
  const MessageApp = Vue.extend(MessageComponent);
  const $vm = new MessageApp({propsData: { msg, type: opts.type, zIndex, top}})
  $vm.$mount()
  top += 64
  document.body.appendChild($vm.$el)
  setTimeout(() => {
    $vm.destroyFn(() => {
      top -= 64
      document.body.removeChild($vm.$el)
      $vm.$destroy()
    })
  }, opts.duration || 3000)
}

['success', 'info', 'warn', 'error'].forEach(type => {
  Message[type] = (msg, opts = {}) => {
    return Message(msg, { type, ...opts })
  };
})

export default Message