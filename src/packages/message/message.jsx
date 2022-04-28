
export default {
  name: 'CqcMessage',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    msg: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    top: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      style: {
        zIndex: this.zIndex,
        top: this.top + 'px',
        transform: 'translateY(-100%)'
      }
    }
  },
  computed: {
    icon() {
      let type = '';
      switch (this.type) {
        case 'success':
          type = 'cqc-icon-xuanzhongdizhi'
          break;
        case 'error':
          type = 'cqc-icon-guanbi2'
          break;
        case 'warn':
          type = 'cqc-icon-tishi'
          break;
        case 'info':
          type = 'cqc-icon-tishi'
          break;
      }
      return type
    },
    classes() {
      return [
        'cqc-message',
        'cqc-message-' + this.type
      ]
    }
  },
  methods: {
    destroyFn(cb) {
      this.style.transform = 'translateY(-100%)'
      setTimeout(() => {
        cb && cb()
      }, 300);
    }
  },
  mounted() {
    setTimeout(() => {
      this.style.transform = 'translateY(0)'
    }, 20);
  },
  render () {
   return (
      <div class={this.classes} style={this.style}>
        <i class={`cqc-message-icon ${this.icon}`} />
        {this.msg}
      </div>
    )
  }
  
}