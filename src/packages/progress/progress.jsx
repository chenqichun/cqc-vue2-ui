import getComputed from './compute'
import props from './props'
export default {
  name: 'CqcProgress',
  mixins: [getComputed],
  props,
  data() {
    return {
      _width: 0,
      styles: {
        height: this.strokeWidth + 'px',
        backgroundColor: this.bgColor,
        borderRadius: this.radius ? this.strokeWidth + 'px' : 0
      },
      barStyles: {
        backgroundColor: this.color,
        borderRadius: this.radius ? this.strokeWidth + 'px' : 0,
        width: 0
      }
    }
  },
  computed: {
    textClass() {
      return [
        'cqc-progress-text',
        'cqc-progress-text-' + this.textPosition
      ]
    }
  },
  watch: {
    percentage(val) {
      this.changeWidth(val)
    }
  },
  mounted() {
    this.$nextTick(() => {
      const instanceRef = this.$refs.instanceRef
      if (instanceRef) {
        this._width = instanceRef.clientWidth;
        this.changeWidth(this.percentage)
      }
    })
  },
  methods: {
    changeWidth (percentage) {
      if (percentage > 100) percentage = 100;
      if (percentage < 0) percentage = 0;
      this.barStyles.width = parseInt(percentage / 100 * this._width) + 'px'
    }
  },
  render() {
    const lineCont = (
      <div class="cqc-progress" style={this.styles} ref="instanceRef">
        <div class="cqc-progress-bar" style={this.barStyles}>
          {this.showText && (<div class={this.textClass}>
            {this.$slots.default ? this.$slots.default : this.percentage + '%'}
          </div>)}
        </div>
      </div>
    );
    const otherCont = (
      <div class="cqc-progress" style={{ height: this.width + 'px', width: this.width + 'px' }}>
        <svg width='100%' height='100%' viewBox="0 0 100 100">
          <path
            d={this.trackPath}
            stroke={this.bgColor}
            stroke-width={this.strokeWidth}
            fill="none"
            style={this.trailPathStyle}>
          </path>
          <path
            d={this.trackPath}
            stroke={this.color}
            fill="none"
            stroke-linecap={this.strokeLinecap}
            stroke-width={this.percentage ? this.relativeStrokeWidth : 0}
            style={this.circlePathStyle}>
          </path>
        </svg>
        {this.showText && (<div class="cqc-track-text">
          {this.$slots.default ? this.$slots.default : this.percentage + '%'}
        </div>)}
      </div>
    )
    return this.type === 'line' ? lineCont : otherCont
  }
}