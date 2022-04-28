<template>
    <div>
      <DemoBlock
      title="拖拽列表"
      section="基本用法"
      :content="content1"
    >
      <template v-slot:descript>
        拖拽列表需要的数据是对象数组，如[{...}, {...}], 不能是基本类型数组,如[1,2,3,4]
        <div>
          如果数据不满足要求，请把数据构建成对象数组
        </div>
        <div>
          每一条数据，都通过作用域插槽返回，对应 row
        </div>
      </template>
      <template v-slot:example>
        <div style="margin-bottom: 10px; color: #E6A23C">拖动它们进行排序</div>
        <cqc-drag-list :data="listData" @change="handleChange">
          <template slot-scope="{row}">
            <div
            :style="{
              padding:'6px',
              border:'1px solid #ddd',
              marginBottom:'10px',
              cursor: 'move'
            }">
            {{ row.name }}
            </div>
          </template>
        </cqc-drag-list>
      </template>
    </DemoBlock>
      <ArbBlock :data="list"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
       content1: `
      <cqc-drag-list :data="data" @change="handleChange">
        <template slot-scope="{ row }">
          <div
          :style="{
            padding:'6px',
            border:'1px solid #ddd',
            marginBottom:'10px',
            color: '#fff',
            background: row.bg
          }">
            {{row.name}}
          </div>
        </template>
      </cqc-drag-list>

      <script>
        import { CqcDragList } from 'cqc-vue2-ui'
        export default {
          data() {
            return {
              listData:[
                { name: '张三', age: 18 },
                { name: '李四', age: 30 },
                { name: '王五', age: 45 },
                { name: '老六', age: 13 }
              ]
            }
          },
          methods: {
            handleChange(data) {
              console.log(data)
            }
          }
        }
      <\/script>
      `,
      listData:[
        { name: '张三', age: 18 },
        { name: '李四', age: 30 },
        { name: '王五', age: 45 },
        { name: '老六', age: 13 }
      ],
      list: [
        { prop: 'data', msg: '数组数据', type: 'array', range: '-', default: '-' }
      ]
    }
  },
  methods: {
    handleChange(data) {
      console.log(data)
    }
  }
}
</script>