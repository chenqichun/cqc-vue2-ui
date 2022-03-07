<template>
  <div class="cqc-row" :style="rowStyles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cqc-row',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      default: 'flex-start',
      validator(val) {
        const types = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
        if (val && !types.includes(val)) {
          console.error(`el-row的justify属性只能为: ${types.join(',')}`)
        }
        return true;
      }
    }
  },
  mounted() {
    this.$children.forEach(child => {
      child.gutter = this.gutter;
    })
  },
  computed: {
    rowStyles() {
      let styles = {};
      if (this.gutter) {
        styles = {
          ...styles,
          marginLeft: -this.gutter / 2 + 'px',
          marginRight: -this.gutter / 2 + 'px',
        }
      }
      if (this.justify) {
        styles = {
          ...styles,
          display: 'flex',
          justifyContent: this.justify
        }
      }

      return styles;
    }
    /* 这是一个巧妙的布局，可以使得子元素之间有相等的间距，同时最左边和最右边的边距被隐藏掉
       这样就用不上用js去修改最左和最右的边距问题
    */
  }
}
</script>

<style lang="scss">
.cqc-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>