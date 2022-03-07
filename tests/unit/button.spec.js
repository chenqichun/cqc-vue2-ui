import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

import Button from '@/packages/button/button.vue'
import Icon from '@/packages/icon/icon.vue'

// shallowMount 可以创建一个包含被挂载和渲染的 Vue 组件的 Wrapper（创建的时候可以传入参数,第一个是传入的组件，）
// describe('Button.vue', () => { // descirbe是 划分作用域
//   // it是测试用例
//   it('1+1是否等于2', () => {
//     // 这里是判断1+1是否为2
//     expect(1+1).to.eq(2) // expect是断言，判断是不是成立， expect()里的表达式， eq()里面填的是结果
//   })
// })

describe('button.vue', () => { // 'button.vue'是自己随便取的名，这里取button.vue,表明里面的测试都是对组件button进行测试
  it('测试button能否正常显示slot的内容', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "哈哈"
      }
    });
    expect(wrapper.text()).to.eq('哈哈')
  })
  it('测试button是否可以点击', () => {
    const wrapper = shallowMount(Button)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click').length).to.eq(1)
  })
  it('测试button里的icon是否能正常使用', () => {
    const wrapper = shallowMount(Button, {
      //attachToDocument: true, 表示在浏览器上测试，比如你要获取样式getComputedStyle(el).xx,那么就必须要设为true
      propsData: {
        icon: 'sousuo'
      },
      /*
        没使用 stubs之前，wrapper.html()如下，
          <button class="cqc-button cqc-button-middle">
            <cqc-icon icon="sousuo" class="icon"></cqc-icon>
          </button>'
        可以看到，button里面的子组件是是没有解析的，所以如果你要获取子组件的dom元素
        就添加stubs属性，并把对应的子组件标签对应到真实的组件，如下面的
        'cqc-icon': Icon
      */
      stubs: { // stubs是将子组件根存
        'cqc-icon': Icon
      }
    })
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.find('use').attributes('href')).to.eq('#icon-sousuo')
    })
   
    /*
      1).修改传入的数据： wrapper.setProps({xxx:xxx})
      2).如果要测试与dom相关的操作,就必须在nextTick里进行
      wrapper.vm能拿到类似vue的实例，包含$nextTick等等
    */
  
  })

})