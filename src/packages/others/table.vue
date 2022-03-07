<template>
  <div class="cqc-table" ref="wrapper">
    <div class="table-wrapper" ref="table-wrapper">
    <table ref="table">
      <thead>
        <tr>
          <th v-for="col in cloneColum" :key="col.name">
            <div v-if="col.type === 'selection'" :style="{width:col.width || 60 + 'px'}">
              <input 
                type="checkbox" 
                :checked="checkAllStatus" 
                ref="checkAll"
                @change="selectAll"
              />
            </div>
            <div class=thead-td v-else>
              {{ col.title }}
              <span class="sort" v-if="col.sortable">
                <cqc-icon icon="arrow-up" @click="handleSort(col, 'up')"/>
                <cqc-icon icon="xiasanjiao" @click="handleSort(col, 'down')" />
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in cloneData" :key="index">
          <td v-for="col in cloneColum" :key="col.name">
            <div v-if="col.type === 'selection'" :style="{width:col.width || 60 + 'px'}">
              <input type="checkbox" @change="selectOne($event, row)" :checked="checkRow(row)" />
            </div>
            <div>
              <template v-if="col.slot">
                <slot :name="col.slot" :row="row" :col="col" />
              </template>
              <span v-else>{{ row[col.name] }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "cqc-table",
  props: {
    colum: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    maxHeight: String
  },
  watch: {
    colum: {
      immediate: true,
      handler(val) {
        this.cloneColum = cloneDeep(val)
      }
    },
    data: {
      immediate: true,
      handler(val) {
        const list = cloneDeep(val);
        if (list.length) {
          // 为了给input设置唯一标识
          list.forEach(row => {
            row._row_id = Math.random();
          })
        }
        this.cloneData = list;
      }
    },
    selectItems() {
      if (this.cloneData.length !== this.selectItems.length) {
        if (this.selectItems.length > 0) {
          // 设置半选状态, 在v-for中设置ref,都是数组，要获取第一个
          return this.$refs.checkAll[0].indeterminate = true;
          
        }
      }
      this.$refs.checkAll[0].indeterminate = false; 
    }
  },
  computed: {
    checkAllStatus() {
      return this.cloneData.length === this.selectItems.length;
    },
    checkRow() {
      return row => {
        return this.selectItems.some(r => r._row_id === row._row_id);
      }
    }
  },
  data() {
    return {
      cloneColum: [],
      selectItems: []
    }
  },
  mounted() {
    if (this.maxHeight) {
    this.$nextTick(() => {
          // 固定表头的实现
          const wrapper = this.$refs["wrapper"];
          const tableWrap = this.$refs["table-wrapper"];
          const table = this.$refs.table;
          const copytable = table.cloneNode();
          const thead = table.children[0];

          tableWrap.style.paddingTop = thead.offsetHeight + "px"
          copytable.appendChild(thead)
          copytable.classList.add('thead-fixed')
          copytable.style.width = table.clientWidth + "px"
          tableWrap.style.maxHeight = this.maxHeight ;
          
     
        // 设置表头宽度
        let tds = table.querySelector('tbody tr').children;
        let th = copytable.querySelector('thead tr').children;
        [].forEach.call(tds, (td, i) => {
          th[i].style.width = td.offsetWidth + "px";
        })
        wrapper.appendChild(copytable) 

      })
    }
  },
  methods: {
    selectAll(e) {
      this.selectItems = e.target.checked ? this.cloneData : [];
      this.$emit("selectAll", this.selectItems)
    },
    selectOne(event, row) {
      if (event.target.checked) {
        this.selectItems.push(row)
      } else {
        this.selectItems = this.selectItems.filter(item => item._row_id !== row._row_id)
      }
      this.$emit("select", this.selectItems, row)
    },
    handleSort(col, type) {
      const { name, sortMethod } = col;
      let data = cloneDeep(this.data);
      let method;
      if (type === "up") {
        method = (a, b) => b[name] - a[name];
      } else {
        method = (a, b) => a[name] - b[name];
      }
      this.cloneData.sort((sortMethod || method));
      // 加上下面这一句，不然不会更新
      this.cloneColum = [...this.cloneColum];
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
.cqc-table {
  position: relative;
  width: 100%;
  .table-wrapper {
    width: 100%;
    position: relative;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .thead-fixed {
    position: absolute;
    left: 0;
    top: 0;
    thead {
      background: #fff;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
    th, td {
      border-bottom: 1px solid $border-color;
      padding: 8px;
      text-align: left;
      .sort {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        .cqc-icon {
          &:active {
            fill: red;
          }
        }
      }
    }
  }
}
</style>