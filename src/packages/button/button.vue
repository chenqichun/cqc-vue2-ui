<template>
  <button class="cqc-button" :class="btnClass" :disabled="loading" @click="$emit('click',$event)">
    <cqc-icon :icon="icon" v-if="icon && !loading && iconPosition === 'left'" class="icon"></cqc-icon>
    <cqc-icon-loading v-if="loading" class="icon"></cqc-icon-loading>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <cqc-icon :icon="icon" v-if="icon && !loading && iconPosition === 'right'" class="icon"></cqc-icon>
  </button>
</template>

<script>
export default {
  name: 'cqc-button',
  props: {
    type: {
      type: String,
      default: '',
      validator(type) {
        if (type && !['warning', 'primary', 'danger', 'success', 'info'].includes(type)) {
          console.error('button的type值必须为:primary,warning,danger,success,info')
        }
        return true
      }
    },
    icon: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: "left",
      validator(type) {
        if (!['left', 'right'].includes(type)) {
          console.error('icon-position的值只能是:left,right')
        }
        return true;
      }
    },
    size: {
      type: String,
      default: 'middle',
      validator(type) {
        let size = ['small', 'middle', 'big'];
        if (type && !size.includes(type)) {
          console.log(`button的size类型必须是: ${size.join(",")}中的一个`)
        }
        return true;
      }
    }
  },
  computed: {
    btnClass() {
      let arr = [];
      this.type && arr.push(`${this.$options.name}-${this.type}`);
      this.size && arr.push(`${this.$options.name}-${this.size}`)
      return arr
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_variables.scss';
$height: 42px;
$font-size: 14px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #318ee6;

.cqc-button {
  border-radius: $border-radius;
  border: 1px solid $border-color;
  font-size: $font-size;
  cursor: pointer;
  padding: 12px 20px;
  margin: 0 5px;
  line-height: 1;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  &:hover {
    border-color: $border-color;
    background-color: $background;
  }
  &:focus, &:active {
    color: $active-color;
    border-color: $active-color;
    background: $background;
  }
  @each $type,$color in (primary: $primary, warning: $warning, danger: $danger, success: $success, info: $info) {
    &-#{$type} {
      background: #{$color};
      border-color: #{$color};
      color: #fff
    }
  }
  @each $type,$color in (primary: $primary-hover, warning: $warning-hover, danger: $danger-hover, success: $success-hover, info: $info-hover) {
    &-#{$type}:hover {
      background: #{$color};
      border-color: #{$color};
      color: #fff
    }
  }
  @each $type,$color in (primary: $primary-active, warning: $warning-active, danger: $danger-active, success: $success-active, info: $info-active) {
    &-#{$type}:active, &-#{$type}:focus {
      background: #{$color};
      border-color: #{$color};
      color: #fff
    }
  }
  .icon+span {
    margin-left: 5px;
  }
  &[disabled] {
    cursor: not-allowed;
  }
  &-small {
    padding: 4px 6px;
  }
  &-middle {
    padding: 8px 14px;
  }
  &-big {
    padding: 12px 20px;
  }
}
</style>