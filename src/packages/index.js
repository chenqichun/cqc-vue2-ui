import './base/index.js';
import LoadingIcon from './loading-icon/index.js'
import Button from './button/index.js'
import ButtonGroup from './button-group/index.js'
import Progress from './progress/index.js'
import Message from './message/index.js'
import DragList from './drag-list/index.js'
import Carousel from './carousel/index.js'
import CarouselItem from './carousel-item/index.js'
import PreviewImg from './preview-img/index.js'
import SignBoard from './sign-board/index.js'

const plugins = [
  LoadingIcon,
  Button,
  ButtonGroup,
  Progress,
  DragList,
  Carousel,
  CarouselItem,
  SignBoard
]
const install = app => {
  plugins.forEach(plugin => app.use(plugin))
}

if (window.Vue) {
  window.Vue.use(install)
}

export default {
  install
}

export {
  LoadingIcon,
  Button,
  ButtonGroup,
  Progress,
  Message,
  PreviewImg,
  DragList,
  Carousel,
  CarouselItem,
  SignBoard
}
