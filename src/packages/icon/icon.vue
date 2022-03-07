<template>
  <svg class="cqc-icon" aria-hidden="true" @click="$emit('click',$event)">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script>
import "@/styles/_icon"
export default {
  name: 'cqc-icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .cqc-icon {
    width: 1em; 
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
  }
</style>