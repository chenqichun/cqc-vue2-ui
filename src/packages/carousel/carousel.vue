<template>
  <div
    class="cqc-carousel"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <div class="cqc-carousel-wrap" :style="style">
      <slot/>
    </div>
    <div class="cqc-carousel-dots" v-if="showDots">
      <span
        v-for="item in len"
        :key="item"
        :class="['dot', { active: currentSelected === item - 1 }]"
        @click="go(item - 1)"
      ></span>
    </div>
    <template v-if="showBtn">
      <div class="cqc-carousel-prev-btn">
        <Button icon="cqc-icon-shuangjiantou-zuo" @click="go(currentSelected - 1, true)" />
      </div>
      <div class="cqc-carousel-next-btn">
        <Button icon="cqc-icon-shuangjiantou-you" @click="go(currentSelected + 1, true)" />
      </div>
    </template>
  </div>
</template>

<script>
import Button from '../button';
import props from './props'
export default {
  name: 'CqcCarousel',
  provide() {
    return {
      carouselVM: this
    }
  },
  components: {
    Button
  },
  props,
  data() {
    return {
      currentIndex: 0, // 当前标记于子节点的索引
      len: 0, // 总长度
      currentSelected: this.initIndex,
      reversed: false
    }
  },
  computed: {
    style() {
      return { height: this.height };
    }
  },
  methods: {
    changeIndex () {
      this.currentIndex++;
      this.len++;
    },
    run() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          const index = this.currentSelected;
          const newIndex = this.reverse ? index - 1 : index + 1;
          this.go(newIndex, index);
        }, this.delay + this.duration);
      }
    },
    go(newIndex, flag) {
      const index = this.currentSelected;
      // 临界条件，到了最后一张的下一张就是第一张， 第二张的前一张就是最后一张
      if (newIndex === this.len) newIndex = 0;
      if (newIndex === -1) newIndex = this.len - 1;
      // 根据上一次的值和当前值 判断是正向还是反向
      this.reversed = index > newIndex ? true : false;
      if ((this.timer || flag) && this.loop) {
        if (index === 0 && newIndex === this.len - 1) {
          this.reversed = true;
        }
        if (index === this.len - 1 && newIndex === 0) {
          this.reversed = false;
        }
      }
      // 需要先把样式渲染到标签上，才能再改变currentSelected的值
      this.$nextTick(() => {
        setTimeout(() => {
          this.currentSelected = newIndex;
          this.$emit('change', newIndex)
        }, 0);
      });
    },
    handleMouseenter() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleMouseleave() {
      if (!this.timer) {
        this.run();
      }
    }
  },
  mounted() {
    this.len = this.currentIndex;
    this.run();
  },
  beforeDestroy() {
    this.handleMouseenter()
  }
};
</script>