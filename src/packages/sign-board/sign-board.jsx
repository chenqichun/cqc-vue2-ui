import props from './props';
import drawEvents from './drawEvent'
import Button from '../button';

export default {
  name: 'CqcSignBoard',
  props,
  components: {
    Button
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const {
          init
        } = drawEvents(this, 'canvasRef')
        init()
      }, 0);
    })
  },
  render() {
    const {
      clear,
      getData,
      preview
    } = drawEvents(this, 'canvasRef')
    const confirm = () => {
      this.$emit('getData', getData())
    }
    return (
      <div class="cqc-sign-board">
        <canvas
          ref='canvasRef'
          width={this.width}
          height={this.height}
          class="cqc-sign-board-canvas"
        ></canvas>
        <div class="cqc-sign-board-control">
          <Button onclick={clear}>清空</Button>
          {this.previewBtn && <span style='padding:4px'></span> }
          {this.previewBtn && <Button type="primary" onclick={preview}>预览</Button>}
          <span style='padding:4px'></span>
          <Button type="primary" onclick={confirm}>确定</Button>
        </div>
      </div>
    )
  }
}