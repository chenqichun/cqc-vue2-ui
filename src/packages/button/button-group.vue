<template>
  <div class="cqc-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cqc-button-group',
  mounted() {
    // 校验内部孩子是否是我们的button组件
    let children = this.$el.children;
    for (let i = 0, child; child = children[i++];) {
      if (child.tagName.toLowerCase() !== "button") {
        console.error('cqc-button-group的子元素必须是button')
        break;
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_variables.scss';
.cqc-button-group {
  display: inline-flex;
  vertical-align: middle;
  button {
    position: relative;
    border-radius: 0;
    border-right: 1px solid #fff;
    margin: 0;
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      border-right: none;
    }
    &:hover {
      z-index: 1;
      border-right-color: #fff;
    }
    &:focus, &.active {
      z-index: 2;
      border-right-color: #fff;
    }
  }
}
</style>