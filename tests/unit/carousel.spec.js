import { shallowMount } from "@vue/test-utils"

import Carousel from '@/packages/others/carousel.vue'
import CarouselItem from '@/packages/others/carousel-item.vue'

import { expect } from "chai"


describe('测试当前Carse组件', () => {
  it('测试initialIndex 传入后是否符合我的逾期', () => {
   let wrapper = shallowMount(Carousel, {
      attachToDocument: true, // 跑在浏览器上
      stubs: { // 将插槽slots里用到的组件对应起来，不然凭借一个标签它是不知道是什么组件的
        'cqc-carousel-item': CarouselItem
      },
      slots: { // 插槽内容
        default: `
        <cqc-carousel-item>
          <div class="content" style="background:red">内容1</div>
        </cqc-carousel-item>
        <cqc-carousel-item>
          <div class="content" style="background:blue">内容2</div>
        </cqc-carousel-item>
        <cqc-carousel-item>
          <div class="content" style="background:yellow">内容3</div>
        </cqc-carousel-item>
        `
      },
      propsData: {
        inittalIndex: 1
      }
    });
   let item =  wrapper.findAll('.content');
   console.log(item.length)
   expect(item.length).to.eq(1)
  })
})