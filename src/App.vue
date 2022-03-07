<template>
  <div id="app">
    <cqc-table
      :colum="colum"
      :data="data"
      @select="select"
      @selectAll="selectAll"
      max-height="300px"
    >
      <template slot="name" slot-scope="{row, col}">
        {{col.name}}-{{row.name}}
      </template>
    </cqc-table>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      colum: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "名称",
          name: "name",
          slot: "name"
        },
        {
          title: "价格",
          name: "price",
          sortable: true
        },
        {
          title: "数量",
          name: "nums"
        }
      ],
      data: [
        {
          name: "西瓜",
          price: 14,
          nums: 4
        },
        {
          name: "芒果",
          price: 30,
          nums: 2
        },
        {
          name: "西瓜",
          price: 14,
          nums: 4
        },
        {
          name: "芒果",
          price: 30,
          nums: 2
        },
        {
          name: "西瓜",
          price: 14,
          nums: 4
        },
        {
          name: "芒果",
          price: 30,
          nums: 2
        },
        {
          name: "芒果",
          price: 30,
          nums: 2
        },
        {
          name: "西瓜",
          price: 14,
          nums: 4
        },
        {
          name: "芒果",
          price: 30,
          nums: 2
        }
      ],
      
    }
  },

  methods: {
    select(selectList, row) {
      console.log(selectList, row)
    },
    selectAll(selection) {
      console.log(selection)
    }
  }
}
</script>

<style lang="scss">
#app {
  
}
.content {
  width: 100%;
  height: 100%;
}
</style>
