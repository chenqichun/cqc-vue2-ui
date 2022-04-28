<template>
  <transition name="carousel">
    <div
      class="cqc-carousel-item"
      v-if="isVisible"
      :class="classs"
      :style="styles"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CqcCarouselItem',
  inject: ['carouselVM'],
  computed: {
    isVisible() {
      return this.carouselVM.currentSelected === this.currentIndex;
    },
    classs() {
      return this.carouselVM.reversed ? 'reverse' : '';
    },
    styles() {
      return {
        'transition-duration': this.carouselVM.duration / 1000 + 's',
        'transition-timing-function': this.carouselVM.timeFn
      };
    }
  },
  created() {
    this.currentIndex = this.carouselVM.currentIndex;
    this.carouselVM.changeIndex()
  }
};
</script>