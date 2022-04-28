export default {
  name: 'CqcDragListItem',
  inject: ['dragList'],
  props: {
    data: {
      type: Object
    },
    index: {
      type: Number,
      default: 0
    }
  },
  render() {
    const data = this.data;
    const {  dragStart, dragEnd, dragOver, drop } = this.dragList;
    const Event = {
      onDragstart(e) {
        e.stopPropagation()
        dragStart(e, data)
      },
      onDragover(e) {
        e.preventDefault();
        e.stopPropagation()
        dragOver(e, data)
      },
      onDragend(e) {
        e.stopPropagation()
        dragEnd(e, data)
      },
      onDrop(e) {
        drop(e, data)
      }
    }
    return (
      <div 
        class="cqc-drag-list-item" 
        draggable="true" 
        ondragstart={Event.onDragstart}
        ondragover={Event.onDragover}
        ondragend={Event.onDragend}
        ondrop={Event.onDrop}
      >
        { this.$slots.default }
      </div>
    )
  }
}