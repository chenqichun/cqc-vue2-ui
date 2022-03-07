<template>
  <div class="cqc-col" :class="colClass" :style="colStyles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cqc-col',
  props: {
    span: {
      type: [Number, Object],
      default: 24
    },
    offset: {
      type: [Number, Object],
      default: 0
    },
    xs: {
      type: [Number, Object],
      default: 0
    },
    sm: {
      type: [Number, Object],
      default: 0
    },
    md: {
      type: [Number, Object],
      default: 0
    },
    lg: {
      type: [Number, Object],
      default: 0
    },
    xl: {
      type: [Number, Object],
      default: 0
    }
  },
  data() {
    return {
      gutter: 0
    }
  },
  computed: {
    colClass() {
      let classes = [];
      classes.push(`cqc-col-${this.span}`);
      this.offset && classes.push(`cqc-col-offset-${this.offset}`);
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(type => {
        if (typeof this[type] === 'object') {
          const { span, offset } = this[type]
          span && classes.push(`cqc-col-${type}-${span}`)
          offset && classes.push(`cqc-col-${type}-offset-${offset}`);
        } else {
          this[type] && classes.push(`cqc-col-${type}-${this[type]}`);
        }
      })

      return classes;
    },
    colStyles() {
      let style = {};
      if (this.gutter) {
        style['padding-left'] = style['padding-right'] = this.gutter / 2 + 'px';
      }
      return style
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_variables.scss';

.cqc-col {
  box-sizing: border-box;
}

@for $i from 1 through 24 {
  .cqc-col-#{$i} {
    width: calc($i / 24) * 100%;
  }
  .cqc-col-offset-#{$i} {
    margin-left: calc($i / 24) * 100%;
  }
}

@each $type in ('xs','sm', 'md', 'lg', 'xl') {
  @include res(#{$type}) {
    @for $i from 1 through 24 {
      .cqc-col-#{$type}-#{$i} {
        width: calc($i / 24) * 100%;
      }
      .cqc-col-#{$type}-offset-#{$i} {
        margin-left: calc($i / 24) * 100%;
      }
    }
  }
}


</style>