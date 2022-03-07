<template>
  <ul class="cqc-pagination">
    <li>
      <cqc-button icon="icon" @click="select(currentPage - 1)"></cqc-button>
    </li>
    <li>
      <span :class="{active: currentPage === 1}" @click="select(1)">1</span>
    </li>
    <li v-if="showPrevMore"><span>...</span></li>
    <li v-for="p in pagers" :key="p">
      <span :class="{active: currentPage === p}" @click="select(p)">{{p}}</span>
    </li>
    <li v-if="showNextMore"><span>...</span></li>
    <li><span :class="{active: currentPage === total}" @click="select(total)">{{total}}</span></li>
    <li>
      <cqc-button icon="right" @click="select(currentPage + 1)"></cqc-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "cqc-pagination",
  props: {
    total: {
      type: Number,
      default: 1
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      showPrevMore: false,
      showNextMore: true
    }
  },
  computed: {
    pagers() {
      let arr = [];
      let { total, pagerCount, currentPage } = this;
      let mid = Math.floor(pagerCount / 2);
      let showPrevMore = false;
      let showNextMore = false;

      if (total > pagerCount) {
        // 需要显示...
        if (currentPage > mid + 1) {
          showPrevMore = true
        }
        if (currentPage < this.total - mid) {
          showNextMore = true;
        }
      }

      if (showPrevMore && !showNextMore) {
        // 拿到总个数 10， 页面上一共来5个
        let start = total - (pagerCount - 2);
        for (let i = start; i < total; i++) {
          arr.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          arr.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        let val = Math.floor((pagerCount - 2) / 2);
        for (let i = currentPage - val; i <= currentPage+val; i++) {
          arr.push(i)
        }
      } else {
        for(let i = 2; i < this.total; i++) {
          arr.push(i)
        }
      }

      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      
      return arr;
    }
  },
  methods: {
    select(page) {
      if (page < 1) {
        page = 1
      }
      if (page > this.total) {
        page = this.total
      }
      if (page !== this.currentPage) {
        this.$emit("update:current-page", page)
      }
    }
  }
}
</script>

<style lang="scss">
ul, li {
  list-style: none;
}
.cqc-pagination {
  display: flex;
  align-items: center;
  .active {
    color: red;
  }
}
</style>