<template>
  <aside class="cqc-aside" :style="{width}">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'cqc-aside',
  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>

<style>

</style>