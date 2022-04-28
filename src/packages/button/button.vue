<template>
  <button :class="buttonClass" :disabled="loading || disabled" :style="styles" @click="$emit('click')">
    <i
      v-if="icon && !loading && position === 'left'"
      style="iconStyle" 
      :class="`icon-${position} ${icon}`"
    />
    <LoadingIcon v-if="loading" />
    <span v-if="$slots.default">
      <slot />
    </span>
    <i
      v-if="icon && !loading && position === 'right'"
      style="iconStyle" 
      :class="`icon-${position} ${icon}`"
    />
  </button>
</template>

<script>
import props from './props'
import LoadingIcon from '../loading-icon'
export default {
  name: 'CqcButton',
  props,
  components: {
    LoadingIcon
  },
  data() {
    return {
    }
  },
  computed: {
    buttonClass() {
      return [
        'cqc-button',
        'cqc-button-' + this.type,
        ((this.shadow && typeof this.shadow === 'boolean') && 'cqc-button-shadow')
      ]
    },
    styles() {
      const style = {}
      if (this.shadow && typeof this.shadow === 'string') style.boxShadow = this.shadow
      return style
    },
    iconStyle() {
      const style = {}
      if (this.iconColor) style.color = this.iconColor
      return style
    }
  }
}
</script>