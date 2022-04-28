<template>
  <div class="cqc-preview-img" @click="handleClose">
    <div class="cqc-preview-img-content" @click.stop :style="{transform}">
      <div class="cqc-preview-img-title">{{ current + 1 }} / {{ imgArr.length }}</div>
      <div class="cqc-preview-img-wrap" :style="{ width: width + 'px', height: height + 'px'}">
        <div class="cqc-preview-img-list" :style="{transform: `translate(${translate}px)`}">
          <template  v-for="(img, i) in imgArr">
            <img
              :key="i"
              class="cqc-preview-img-item"
              :style="{ width: width + 'px', height: height + 'px'}"
              :src="img" />
          </template>
        </div>
      </div>
      <i  class="cqc-preview-img-close cqc-icon-guanbi1" @click.stop="handleClose"></i>
      <button
        class="cqc-preview-img-btn cqc-preview-img-prev"
        @click.stop="handleChangeIndex(current+1)"
        :disabled="(current === imgArr.length - 1) || imgArr.length === 0"
      >
        <i class="cqc-icon-left"></i>
      </button>
      <button
        class="cqc-preview-img-btn cqc-preview-img-next"
        @click.stop="handleChangeIndex(current-1)"
        :disabled="(current === 0) || imgArr.length === 0"
       >
        <i class="cqc-icon-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import props from './props'
export default {
  name: 'CqcPreviewImg',
  props,
  data() {
    return {
      transform: 'scale(0.3)',
      current: this.index,
      translate: 0
    }
  },
  methods: {
    handleClose() {
      this.transform = 'scale(0.3)'
      setTimeout(() => {
        this.closeCb && this.closeCb()
      }, 300);
    },
    handleChangeIndex(cur) {
      const len = this.imgArr.length;
      if (cur > len - 1) cur = len - 1;
      if (cur < 0) cur = 0;
      this.current = cur
      this.translate = -this.width * cur
    }
  },
  mounted() {
    this.handleChangeIndex(this.current)
    setTimeout(() => {
      this.transform = 'scale(1)'
    }, 0);
  }
}
</script>