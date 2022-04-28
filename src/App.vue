<template>
  <div id="app">
    <!-- <BT /> -->
    <!-- <router-view/> -->
    <!-- <PR /> -->
    <!-- <MS /> -->
    <!-- <DL/> -->
    <!-- <Ca/> -->
    <!-- <PE/> -->
    <SG />
  </div>
</template>
<script>
import BT from '@/examples/button-example.vue'
import PR from '@/examples/progress-example.vue'
import MS from '@/examples/message-example.vue'
import DL from '@/examples/drag-list-example.vue'
import Ca from '@/examples/carousel-example.vue'
import PE from '@/examples/previewImg-example.vue'
import SG from '@/examples/signBoard-example.vue'
export default {
  components: {
    BT,
    PR,
    MS,
    DL,
    Ca,
    PE,
    SG
  },
  mounted() {
   
  },
  methods: {
    
  }
}
</script>
