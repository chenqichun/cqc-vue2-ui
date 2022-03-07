<template>
  <div class="cqc-input" :class="inputClass">
    <input
      ref="cqcInput"
      class="input"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" 
      :value="value"
      :name="name"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handlerInput"
      @focus="handlerFoucs"
      @blur="handlerBlur"
      @change="handlerChange"
    >
    <div 
      class="input-suffix-icon" 
      v-if="clearable && fouced"
      @click="handlerClear"
      @mousedown.prevent
    >
      <cqc-icon icon="guanbi1" class="icon"></cqc-icon>
    </div>
    <div 
      class="input-suffix-icon" 
      v-if="showPassword"
      @click="handlerPassword"
    >
      <cqc-icon :icon="passwordIcon" class="icon"></cqc-icon>
    </div>
    <div 
      :class="prefixIcon ? 'input-prefix-icon' : 'input-suffix-icon'"
      v-if="prefixIcon || suffixIcon"
    >
      <cqc-icon :icon="prefixIcon || suffixIcon" :class="['icon', prefixIcon || suffixIcon]"></cqc-icon>
    </div>
  </div>
</template>

<script>
// @mousedown.prevent可以避免点击清除按钮的时候失去input焦点
export default {
  name: "cqc-input",
  data() {
    return {
      fouced: false,
      passwordVisible: false
    }
  },
  props: {
    value: String,
    placeholder: String,
    name: String,
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text',
      validator(type) {
        const types = ['text', 'password'];
        if (type && !types.includes(type)) {
          console.error(`cqc-input的type属性只能为: ${types.join(",")}`)
        }
        return true;
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  computed: {
    inputClass() {
      const classes = [];
      this.clearable && classes.push('cqc-input-suffix-icon');
      this.prefixIcon && classes.push('cqc-input-preffix-icon');
      return classes;
    },
    passwordIcon() {
      return this.passwordVisible  ? 'yanjingx' : 'eyes-';
    }
  },
  methods: {
    handlerInput(e) {
      this.$emit('input', e.target.value, e)
    },
    handlerChange(e) {
      this.$emit('change', e.target.value, e)
    },
    handlerFoucs() {
      this.fouced = true;
      this.$emit('focus')
    },
    handlerBlur() {
      this.fouced = false;
      this.$emit('blur')
    },
    handlerPassword() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.$refs.cqcInput.focus();
      })
    },
    handlerClear() {
      this.$emit('input', "")
      this.$emit('change', "")
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_variables';
.cqc-input {
  position: relative;
  display: inline-block;
  width: 150px;
  height: 42px;
  .input {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    outline: none;
    border: none;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    &:focus {
      border-color: $primary;
    }
    &[disabled]{
      cursor: not-allowed;
      background: #eee;
    }
  }
  .input-suffix-icon, .input-prefix-icon {
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    padding: 0 14px;
    background: #fff;
    border-top-right-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    .icon {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      color: #333;
    }
  }
}
.cqc-input-suffix-icon {
  .input {
    padding-right: 28px;
  }
}
.cqc-input-preffix-icon {
  .input {
    padding-right: 8px;
    padding-left: 28px;
  }
  .input-prefix-icon {
    left: 1px;
    right: auto;
    border-top-right-radius: none;
    border-bottom-right-radius: none;
    border-top-left-radius: $border-radius;
    border-bottom-left-radius: $border-radius;
  }
}


</style>