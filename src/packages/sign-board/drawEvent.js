import PreviewImg from '../preview-img';
let cavClientLeft, cavClientTop, canvas, ctx;

export default function drawEvents(vm, canvasRef) {
  let flag = true;

  const { lineWidth, strokeStyle, lineCap, lineDash, doubleLine, miniType, canvasBg, width, height } = vm

  function setCanvasStyle(ctx) {
    if (canvasBg) {
      ctx.fillStyle = canvasBg
      ctx.fillRect(0, 0, width, height)
    }
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    ctx.lineCap = lineCap
    if (lineDash[0] > 0 || lineDash[1] > 0) {
      ctx.setLineDash(lineDash)
    }
  }
  function draw(ctx, x, y) {
    if (!flag) return false;
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  function drawStart(ctx, x, y) {
    doubleLine && ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, y)
    flag = true;
  }
  function drawEnd(ctx) {
    if (doubleLine) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = parseInt(lineWidth / 3)
      ctx.stroke()
      ctx.restore()
    }
    flag = false;
  }
  function clear() {
    console.log(ctx,width, height)
    ctx.clearRect(0, 0, width, height)
  }
  function preview() {
    const baseImg = vm.$refs[canvasRef].toDataURL(miniType);
    PreviewImg([baseImg])
  }
  function getData() {
    return vm.$refs[canvasRef].toDataURL(miniType);
  }

  function onmousedown(e) {
    cavClientLeft = canvas.getBoundingClientRect().left
    cavClientTop = canvas.getBoundingClientRect().top
    drawStart(ctx, e.clientX - cavClientLeft, e.clientY - cavClientTop)
    canvas.onmousemove = e => {
      draw(ctx, e.clientX - cavClientLeft, e.clientY - cavClientTop)
    }
    window.addEventListener('mouseup', () => {
      drawEnd(ctx)
    })
  }

  function init() {
    canvas = vm.$refs[canvasRef]
    ctx = canvas.getContext('2d')
    setCanvasStyle(ctx)
    canvas.onmousedown = onmousedown
  }

  return {
    clear,
    preview,
    getData,
    init
  }
}