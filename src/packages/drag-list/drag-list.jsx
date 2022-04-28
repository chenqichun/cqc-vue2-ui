import Item from './drag-list-item.jsx'
export default {
  name: 'CqcDragList',
  components: {
    Item
  },
  provide() {
    return {
      dragList: this
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cloneData: [],
      dropPosition: '', // 拖拽的位置， 1表示放在前面， 2表示放在后面
      dragNode: null, // 拖动的这个元素的数据
      dragData: null, // 拖动的数据
      dropData: null, // 拖动了哪个个元素上，这个元素的数据
      showInditcator: {
        display: 'none',
        top: 9999 + 'px',
        left: 0
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        if (val) {
          this.cloneData = this.makeKey(val)
        }
      }
    }
  },
  methods: {
    makeKey(data) {
      data._dargKey = 0;
      data.forEach((e, i) => (e._dargKey = i + 1))
      return JSON.parse(JSON.stringify(data))
    },
    dragStart(e, data) {
      this.dragNode = e.target;
      this.dragData = data;
    },
    dragOver(e, data) {
      if (this.dragData._dargKey === data._dargKey) {
        // 不能拖到自己身上
        return false
      }
      const { top, bottom, height } = e.target.getBoundingClientRect()
      const instanceTop = this.$refs.instanceNode.getBoundingClientRect().top;
      const clientY = e.clientY
      if ((clientY - top > height / 2) && (clientY - top < height)) {
        this.dropPosition = 2
        this.showInditcator.top = bottom - instanceTop + 'px'
        this.showInditcator.display = 'block'
      } else if (clientY - top > 0 && clientY - top < height / 2) {
        this.dropPosition = 1
        this.showInditcator.top = top - instanceTop + 'px'
        this.showInditcator.display = 'block'
      } else {
        this.dropPosition = ''
        this.showInditcator.display = 'none'
      }
    },
    drop (_, data) {
      this.dropData = data;
    },
    clearData() {
      this.dropPosition = '';
      this.dragNode = null;
      this.dragData = null;
      this.dropData = null;
      this.showInditcator = {
        display: 'none',
        top: 9999 + 'px',
        left: 0
      }
    },
    dragEnd() {
      if (this.dropPosition && this.dropData) {
        this.cloneData = JSON.parse(JSON.stringify(this.cloneData.filter(e => e._dargKey !== this.dragData._dargKey)))
        const index = this.cloneData.findIndex(e => e._dargKey === this.dropData._dargKey)
        if (this.dropPosition === 1) {
          this.cloneData.splice(index, 0, this.dragData)
        } else if (this.dropPosition === 2) {
          this.cloneData.splice(index + 1, 0, this.dragData)
        }
      }
      this.clearData()
      this.$emit('change', this.cloneData)
    }
  },
  render() {
    const renderChild = data => {
      if (!data || data.length === 0) {
        return <div>暂无数据</div>
      }
      return data.map((item, i) => (
        <Item index={i} data={item} key={item._dargKey}> 
         {this.$scopedSlots.default({
           row: item
         })}
        </Item>
      ))
    }
    return  (
      <div class="cqc-drag-list" ref='instanceNode'>
        {renderChild(this.cloneData)}
        <div class="cqc-drap-inditcator" style={this.showInditcator} ></div>
      </div>
    )
  }
}