<template>
  <div 
    class="cqc-carousel" 
    :style="styles" 
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @touchstart="handleTouchstart"
    @touchend="handleTouchend"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dots">
      <span 
        v-for="item in len" :key="item"
        class="dot" 
        :class="{active: currentSelected === item-1}"
        @click.stop="select(item-1)"
      ></span>
    </div>
    <div 
      class="cqc-carousel-btn cqc-carousel-prev" 
      @click.stop="select(currentSelected-1, true)"
    >
      <cqc-icon icon="icon" ></cqc-icon>
    </div>
    <div 
      class="cqc-carousel-btn cqc-carousel-next" 
      @click.stop="select(currentSelected+1, true)"
    >
      <cqc-icon icon="right"></cqc-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "cqc-carousel",
  props: {
    height: {
      type: String,
      default: "200px"
    },
    width: {
      type: String,
      default: "300px"
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 3000,
    },
    inittalIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentSelected: this.inittalIndex,
      reverse: false,
      len: []
    }
  },
  computed: {
    styles() {
      let styles = {};
      this.height && (styles.height = this.height);
      this.width && (styles.width = this.width);
      return styles;
    }
  },
  mounted() {
    this.children = this.$children.filter(child => child.$options.name === "cqc-carousel-item");
    this.len = this.children.length;
    this.run();
  },
  methods: {
    handleTouchstart(e) {
      this.handleMouseenter();
      this.startTouch = e.touches[0]; // 取第一个，因为可能有多个手机触摸
    },
    handleTouchend(e) {
      let endTouch = e.changedTouches[0]; // end事件没有touches,只有changedTouches
      
      let diffX = endTouch.clientX - this.startTouch.clientX;
      let diffY = endTouch.clientY - this.startTouch.clientY;
      if (diffX < 0 && Math.abs(diffX) > 10 && (Math.abs(diffX) - Math.abs(diffY) >= 0)) {
        // 往左滑
        this.select(this.currentSelected + 1, true)
      }
      if (diffX > 0 && Math.abs(diffX) > 10 && (Math.abs(diffX) - Math.abs(diffY) >= 0)) {
        // 往右滑
        this.select(this.currentSelected - 1, true)
      }
     // this.run()
    },
    handleMouseenter() {
      clearInterval(this.timer)
      this.timer = null;
    },
    handleMouseleave() {
      this.run();
    },
    select(newIndex, flag) {
      if (newIndex === this.len) newIndex = 0;
      if (newIndex === -1) newIndex = this.len - 1;
      let index = this.currentSelected;
      this.reverse = index > newIndex ? true : false;
      if (this.loop && (this.timer || flag)) {
        if (index == 0 && newIndex == this.len - 1) this.reverse = true;
        if (index == this.len - 1 && newIndex == 0) this.reverse = false;
      } 

      this.children.forEach(vm => {
        vm.reverse = this.reverse;
      })
        // 等上面的类名加完了，再改变数据
      this.$nextTick(() => {
        this.currentSelected = newIndex;
      })
    },
    run() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          let index = this.currentSelected;
          let newIndex = index + 1;
          this.select(newIndex);
        }, this.delay);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null;
  }
}
</script>

<style lang="scss">
.cqc-carousel {
  position: relative;
  .viewport {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .dots {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: rgba(0,0,0,0.5);
      margin: 0 10px;
      &.active {
        background: #fff
      }
    }
  }
  .cqc-carousel-btn {
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px 10px;
    background: rgba(255,255,255,0.5);
    line-height: 16px;
    cursor: pointer;
  }
  .cqc-carousel-prev {
    left: 0;
  }
  .cqc-carousel-next {
    right: 0;
  }
}
</style>