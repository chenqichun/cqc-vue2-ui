<template>
  <div class="cqc-popover" ref="cqcPopover" @click.stop>
    <div
      v-if="visible"
      ref="content" 
      :style="styles"
      class="cqc-popover-content"
      @click.stop
    >
      <h3 v-if="title">{{ title }}</h3>
      <slot>{{ content }}</slot>
      <div class="popover-arrow" :class="arrowClass"></div>
    </div>
    <slot name="reference"></slot>
  </div>
</template>

<script>
function onFn(el, trigger, fn) {
  el.addEventListener(trigger, fn)
}
function offFn(el, trigger, fn) {
  el.removeEventListener(trigger, fn)
}
export default {
  name: "cqc-popover",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "200px"
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: "click"
    },
    placement: {
      type: String,
      default: "bottom",
      validator(val) {
        const s = ['left', 'right', 'top', 'bottom'];
        if (!s.includes(val)) {
          return console.error(`cqc-popover的placement属性值只能为: ${s.join(",")}`)
        }
        return true;
      }
    }
  },
  data() {
    return {
      visible: false, // 要额外定义变量，不能直接使用value显示隐藏，因为有可能用户就没有使用v-model
      elm: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.visible = newValue
      }
    },
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            // 把popover的内容移动到body上，不然如果用户外层加了overflow:hidden,那就把元素隐藏了
            const content = this.$refs.content;
            document.body.appendChild(content)
            this.setStyles(content);
            if (this.trigger === "hover") {
              onFn(content, "mouseenter", this.handleMouseEnter)
              onFn(content, "mouseleave", this.handleMouseLeave)
            }
          })
        }
      }
    }
  },
  computed: {
    styles() {
      const styles = {};
      this.width && (styles.width = this.width);
      return styles;
    },
    arrowClass() {
      const classes = [];
      this.placement && classes.push(`popover-arrow-${this.placement}`);
      return classes;
    }
  },
  mounted() {
    //slot上不能加类名，不能加事件， 怎么给slot绑定事件，可以在mounted里就榜上
    // 通过this.$slots获取对应的slot,然后[0]取第一个虚拟节点，在从虚拟节点的elm获取真实的dom
    this.$nextTick(() => {
      let reference = this.$slots.reference;
      if (reference) {
        this.elm = reference[0].elm;
        this.onEvent();
      }
    })
  },
  beforeDestroy() {
    this.elm && this.offEvent();
  },
  methods: {
    onEvent() {
      if (this.trigger === "click") {
        onFn(this.elm, "click", this.handleEvent)
      } else if (this.trigger === "hover") {
        onFn(this.$el, "mouseenter", this.handleMouseEnter)
        onFn(this.$el, "mouseleave", this.handleMouseLeave)
      }
      onFn(document, "click", this.clickOutside);
    },
    offEvent() {
      offFn(this.elm, "click", this.handleEvent)
      offFn(this.$el, "mouseenter", this.handleMouseEnter)
      offFn(this.$el, "mouseleave", this.handleMouseLeave)
      offFn(document, "click", this.clickOutside);
    },
    clickOutside(el) {
      // 点击外面失去焦点，使用contains判断点击元素是否属于目标元素内即可
      // 或者可以点击document就隐藏，但是需要点击的元素阻止冒泡也能实现
      
      // 因为我们这里已经把内容移动到body,所以contains用不上了，所以可以用阻止冒泡实现
      // if (!this.$el.contains(el.target)) {
      //   this.handleBlur();
      // }
      this.handleBlur();
    },
    handleMouseEnter() {
      clearTimeout(this.timer)
      this.$emit('input', this.visible = true)
    },
    handleMouseLeave() {
      this.timer = setTimeout(this.handleBlur, 200)
    },
    handleEvent() {
      this.$emit('input', this.visible = !this.visible)
    },
    handleBlur() {
      this.$emit('input', this.visible = false)
    },
    setStyles(el) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width
      } = this.$refs.cqcPopover.getBoundingClientRect();
      const {
        width: e_width,
        height: e_height
      } = el.getBoundingClientRect();

      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;

      switch(this.placement) {
        case "top":
          el.style.top = top - e_height + scrollTop - 6 + "px";
          el.style.left = left - e_width / 2 + width / 2 + scrollLeft + "px";
        break;
        case "bottom":
          el.style.top = top + e_height + scrollTop + "px";
          el.style.left = left - e_width / 2 + width / 2 + scrollLeft + "px";
        break;
        case "left":
          el.style.top = top + scrollTop - e_height/ 2 + height / 2 + "px";
          el.style.left = left+ scrollLeft - e_width - 6 + "px";
        break;
        case "right":
          el.style.top = top + scrollTop - e_height / 2 + height / 2 + "px";
          el.style.left = left+ scrollLeft  + width + 6 + "px";
        break;
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
.cqc-popover {
  position: relative;
  display: inline-block;
}
.cqc-popover-content {
    position: absolute;
    top: 100px;
    z-index: 10;
    display: inline-block;
    background: #fff;
    border: 1px solid $border-color;
    box-sizing: border-box;
    padding: 10px;
    border-radius: $border-radius;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
    .popover-arrow {
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border: solid 6px transparent;
      border-bottom-color: $border-color;
      border-top: 0;
      filter: drop-shadow(0 2px 12px 0 $border-color);
      &::after {
        content: "";
        position: absolute;
        top: 1px;
        left: -6px;
        width: 0;
        height: 0;
        border: solid 6px transparent;
        border-bottom-color: #fff;
        border-top: 0;
      }
    }
    .popover-arrow-top {
      top: auto;
      bottom: -6px;
      transform: translateX(-50%) rotate(180deg);
    }
    .popover-arrow-left {
      left: auto;
      right: -6px;
      top: 50%;
      transform: translate(4px, -50%) rotate(90deg);
    }
    .popover-arrow-right {
      left: 0;
      top: 50%;
      transform: translate(-10px, -50%) rotate(-90deg);
    }
  }
</style>