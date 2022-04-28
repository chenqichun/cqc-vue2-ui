<template>
  <div>
    <DemoBlock
    title="画板"
    section="基本用法"
    :content="content1"
  >
    <template v-slot:descript>
      画板的内容导出的是base64的图片
    </template>
    <template v-slot:example>
      <cqc-sign-board
        :lineWidth="10"
        strokeStyle="red"
        @getData="handleData"
      />
    </template>
  </DemoBlock>
  <ArbBlock :data="list"/>
  <ArbBlock title="方法" :data="list2"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content1: `
        <cqc-sign-board
          :lineWidth="10"
          strokeStyle="red"
          @getData="handleData"
        />

        <script>
          import { CqcSignBoard } from 'cqc-vue2-ui'
          export default {
            methods: {
              handleData (data)  {
                console.log(data)
              }
            }
          }
        </\script>
        `,
        list: [
          { prop: 'width', msg: '画板宽度', type: 'number', range: '-', default: '600' },
          { prop: 'height', msg: '画板高度', type: 'number', range: '-', default: '400' },
          { prop: 'lineWidth', msg: '线的宽度', type: 'number', range: '-', default: '2' },
          { prop: 'strokeStyle', msg: '线的颜色', type: 'string', range: '-', default: '#000' },
          { prop: 'lineCap', msg: '线头形状', type: 'string', range: 'butt/round/square', default: 'round' },
          { prop: 'lineDash', msg: '线的形状,可以设置成虚线', type: 'array', range: '-', default: '[0,0]' },
          { prop: 'doubleLine', msg: '是否要双线绘制', type: 'boolean', range: 'true/false', default: 'false' },
          { prop: 'previewBtn', msg: '预览按钮', type: 'boolean', range: 'true/false', default: 'true' },
          { prop: 'miniType', msg: '导出图片格式', type: 'string', range: 'miniType', default: 'image/png' },
          { prop: 'canvasBg', msg: '画板的背景色,不设置则为透明底', type: 'string/booean', range: '-', default: 'false' }
        ],
        list2: [
          { prop: 'getData', msg: '获取画板的数据，为base64的图片', type: '', range: '', default: '' }
        ]
    }
  },
  methods: {
    handleData (data)  {
      console.log(data)
    }
  }
}
</script>

<style>

</style>