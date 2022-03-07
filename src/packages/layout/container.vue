<template>
  <section class="cqc-container" :class="{isVertical}">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'cqc-container',
  data() {
    return {
      isVertical: true
    }
  },
  mounted() {
    this.isVertical = this.$children.some(child => ['cqc-header', 'cqc-footer'].includes(child.$options.name))
  }
}
</script>

<style lang="scss">
.cqc-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  &.isVertical {
    flex-direction: column;
  }
}
</style>