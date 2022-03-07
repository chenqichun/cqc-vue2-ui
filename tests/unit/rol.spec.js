import { shallowMount }  from '@vue/test-utils'
import { expect } from 'chai'

import Row from '@/packages/layout/row.vue'
import Col from '@/packages/layout/col.vue'

describe('row.vue', () => {
  it('测试gutter属性是否ok?', async () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: {
        'cqc-col': Col
      },
      slots: {
        default: '<cqc-col></cqc-col>'
      },
      propsData: {
        gutter: 20
      }
    });
    expect(getComputedStyle(wrapper.vm.$el).marginLeft).to.eq('-10px')
    expect(getComputedStyle(wrapper.vm.$el).marginRight).to.eq('-10px')

    await wrapper.vm.$nextTick();
    let col = wrapper.vm.$el.querySelector('.cqc-col');
    expect(getComputedStyle(col).paddingLeft).to.eq('10px')
    expect(getComputedStyle(col).paddingLeft).to.eq('10px')
  })
  it('测试justify属性是否ok?', async () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      propsData: {
        justify: 'center'
      }
    });
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('center')
    wrapper.setProps({ justify: 'flex-start' })
    await wrapper.vm.$nextTick();
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-start')
    wrapper.setProps({ justify: 'flex-end' })
    await wrapper.vm.$nextTick();
    expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-end')

  })
})