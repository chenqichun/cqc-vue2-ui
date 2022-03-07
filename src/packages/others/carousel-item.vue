<template>
  <transition>
    <div class="cqc-carousel-item" v-show="isShow" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "cqc-carousel-item",
  data() {
    // 得到当前的item是父组件中的第几个
    let children = this.$parent.$children.filter(child => child.$options.name === "cqc-carousel-item");
    return {
      index: children.length - 1,
      reverse: false
    }
  },
  computed: {
    isShow() {
      return this.$parent.currentSelected === this.index
    }
  }
}
</script>

<style lang="scss">
.cqc-carousel-item {
  width: 100%;
  height: 100%;
}
.v-enter-active, .v-leave-active {
  transition: all 0.5s linear;
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter {
  transform: translateX(100%);
}
.v-leave-to.reverse {
  transform: translateX(100%);
}
.v-enter.reverse {
  transform: translateX(-100%);
}
.v-enter-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>