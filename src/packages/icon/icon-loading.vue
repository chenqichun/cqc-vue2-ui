<template>
  <cqc-icon icon="loading" class="cqc-loading-animation"></cqc-icon>
</template>

<script>
export default {
  name: "cqc-icon-loading"
}
</script>

<style lang="scss">
.cqc-loading-animation {
  animation: rotate 1.5s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotateZ(360deg)
    }
  }
}
</style>