<template>
  <div 
    class="cqc-upload-dragger"
    @drop.prevent="onDrag"
    @dragover.prevent
    @dragleave.prevent
  >
    <slot v-if="$slots.default"></slot>
  </div>
</template>

<script>
export default {
  name: 'cqc-upload-dragger',
  props: {
    accept: String
  },
  methods: {
    onDrag(e) {
      let files = e.dataTransfer.files;
      if (this.accept) {
        files = [...e.dataTransfer.files].filter(file => this.accept.split(",").includes(file.type));
      }
      this.$emit('file', files)
    }
  }
}
</script>

<style lang="scss">
.cqc-upload-dragger {
  width: 300px;
  height: 200px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
}
</style>