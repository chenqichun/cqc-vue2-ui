<template>
  <main class="cqc-main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'cqc-main'
}
</script>

<style lang="scss">
.cqc-main {
  flex: 1;
  padding: 20px;
}
</style>