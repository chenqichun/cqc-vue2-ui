<template>
  <div class="cqc-date-picker" v-click-outside="handleBlur"> 
    <cqc-input 
      suffixIcon="rili"
      :value="formateDate"
      @focus="handleFocus"
      @change="handleChange"
    ></cqc-input>
    <div class="cqc-date-picker-wrap" v-if="visible">
      <div class="cqc-date-picker-content">
        <template v-if="mode === 'dates'">
          <div class="cqc-date-picker-header">
            <cqc-icon icon="shuangjiantou-zuo" @click="changeYear(-1)" />
            <cqc-icon icon="icon" @click="changeMonth(-1)" />
            <span>
              <b @click="mode='years'">{{tempTime.year}}</b>
              年
              <b @click="mode='months'">{{tempTime.month + 1}}</b>
              月
            </span>
            <cqc-icon icon="right" @click="changeMonth(1)" />
            <cqc-icon icon="shuangjiantou-you" @click="changeYear(1)" />
          </div>
          <div class="weeks">
            <span class="ceil" v-for="week in weeks" :key="week">
              {{ week }}
            </span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span 
              class="ceil ceil-date"
              :class="{
                isNotCurrentMont: !isCurrentMonth(getCurrentDate(i, j)),
                isCurrentMonth: isCurrentMonth(getCurrentDate(i, j)),
                isToday: isToday(getCurrentDate(i, j)),
                isChooseDay: isChooseDay(getCurrentDate(i, j))
              }"
              v-for="j in 7" 
              :key="`col_${j}`"
              @click="selecDate(getCurrentDate(i, j))"
            >
              <span class="" v-if="isChooseDay(getCurrentDate(i, j))"></span>
              {{ getCurrentDate(i, j).getDate() }}
            </span>
          </div>
        </template>
        <template v-if="mode === 'years'">
          <div class="cqc-date-picker-header">
            <cqc-icon icon="shuangjiantou-zuo" @click="changeModeYear(-10)" />
            <span>
              {{ rangeYears }}
            </span>
            <cqc-icon icon="shuangjiantou-you" @click="changeModeYear(10)" />
          </div>
        </template>
        <template v-if="mode === 'months'">
          months
        </template>
      </div>
    </div>
  </div>
</template>

<script>
function getYearMonthDay(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate();
  return [year, month, day]
}
import clickOutside from 'v-click-outside';
export default {
  name: "cqc-date-picker",
  props: {
    value: {
      type: [String, Date, Number],
      default: () => new Date()
    }
  },
  directives: {
    clickOutside: clickOutside.directive
  },
  data() {
    const [year, month, day] = getYearMonthDay(this.value || new Date())
    return {
      visible: false,
      mode: "dates", // years, months
      weeks: ['日', '一', '二','三','四','五','六'],
      months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      time: {
        year,
        month: month,
        day
      },
      tempTime: {
        year,
        month: month,
        day
      }
    }
  },
  watch: {
    value(newVal) {
      let [ year, month, day] = getYearMonthDay(newVal);
      this.time = { year, month, day };
      this.tempTime = { ...this.time }
    }
  },
  computed: {
    formateDate() {
      // 根据当前的time对象算出一个格式
      if (this.value) {
        // padStart是es7的新语法，下面用于补零操作
        let {year, month, day} = this.time;
        return [year, (month+1+'').padStart(2, 0), (day+'').padStart(2, 0)].join('-')
      }
    },
    visibleDate() {
      // 获取当前月第一天的时间戳
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1);
      let weekDay = firstDay.getDay(); // 0是周日 6是周六
      weekDay = weekDay === 0 ? 7 : weekDay;
      let start = firstDay - weekDay * 24 * 60 * 60 * 1000;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 24 * 60 * 60 * 1000))
      }
      return arr;
    },
    getCurrentDate() {
      return (i, j) => {
        return this.visibleDate[(i-1)*7 + (j-1)];
      }
    },
    isCurrentMonth() {
      return date => {
        let { year, month } = this.tempTime;
        let [y, m] = getYearMonthDay(date);
        return year === y && month === m;
      }
    },
    isToday() {
      return date => {
        let [ y, m, d] = getYearMonthDay(date);
        let [ cy, cm, cd ] = getYearMonthDay(new Date());
        return y === cy && m === cm && d === cd;
      }
    },
    isChooseDay() {
      return date => {
        let { year, month, day } = this.time;
        let [ y, m, d] = getYearMonthDay(date);
        return year === y && month === m && day === d;
      }
    },
    rangeYears() {
      const { year } = this.tempTime;
      let startYear = year - (year % 10);
      let endYear = startYear + 9;
      return startYear + "-" + endYear;
      
    }
  },
  methods: {
    handleFocus() {
      // 显示的时候重置年月显示显示
      this.tempTime = {...this.time}
      this.visible = true;
    },
    handleBlur() {
      this.mode = "dates";
      this.visible = false;
    },
    handleChange(val, event) {
      let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      let check = val.match(reg);
      if (check) {
        this.$emit('input', new Date(check[1], check[2]-1, check[3]))
      } else {
        event.target.value = this.formateDate;
      }
      this.handleBlur();
    },
    selecDate(date) {
      this.$emit('input', date)
      this.$emit('change', date)
      this.handleBlur()
    },
    // 更改年月， 让系统自己算，不要自己考虑边界情况，如是否是润年，是否2月都28日还是29日，月份小于1或者大于12
    // setDate是修改天数，setMonth是修改月，setFullYear是修改年，比如setDate用于加减天数，让它自己换算，就不用考虑2月28,29号的临界值
    changeYear(count) {
      // 加减年份不要直接 + -
      const oleDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oleDate.setFullYear(oleDate.getFullYear() + count)
      
      let [ year] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
    },
    changeMonth(count) {
      // 修改日期不要直接 + -
      const oleDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oleDate.setMonth(oleDate.getMonth() + count)
      
      let [ year, month ] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    },
    changeModeYear(count) {}
  }

}
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
.cqc-date-picker {
  display: inline-block;
  .cqc-date-picker-wrap {
    position: absolute;
    z-index: 10;
    width: 280px;
    background: #fff;
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
    user-select: none;
    .cqc-date-picker-header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cqc-date-picker-content {
      .weeks {
        white-space: nowrap;
      }
      .ceil {
        display: inline-block;
        width: 40px;
        text-align: center;
        line-height: 40px;
        font-weight: 400;
      }
      /* .ceil-date:hover:not(.isNotCurrentMont) {
        color: $primary;
      } */
      .isNotCurrentMont {
        color: #ccc;
      }
      .isCurrentMonth:hover:not(.isChooseDay) {
        color: $primary;
        cursor: pointer;
      }
      .isToday {
        color: $primary;
        font-weight: bold;
      }
      .isChooseDay {
        border-radius: 100%;
        color: #fff;
        background: $primary;
      }
    }
  }
}
</style>