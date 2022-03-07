import throttle from 'lodash/throttle';

const attributes = {
  delay: {
    default: 200
  },
  immediate: {
    default: true
  },
  disabled: {
    default: false
  },
  distance: {
    default: 10
  }
}

const getScrollContainer = function(el) {
  let parent = el;
  while(parent) {
    let overflow = window.getComputedStyle(parent)['overflow-y']; // 包含overflow, overflow-y
    if (['auto', 'scroll'].includes(overflow)) {
      return parent;
    }
    parent = parent.parentElement; // 不要使用parentNode，因为<!DOCTYPE html>也算是parentNode
  }
}

const handleScroll = function(cb) {
  const { container, el, vm, observer } = this[scope];

  // 看一下用户是否已经没有新的数据了
  let { disabled, distance } = getScrollOptions(el, vm);

  if (disabled) return;

  const cH = container.clientHeight,
        sT = container.scrollTop,
        sH = container.scrollHeight; // scrollHeight可以获取容器内所有子元素的高度总和,这是最简单获取元素内容真实高度的办法

  if (sH - cH - sT <= distance) {
    cb && cb();
  } else {
    if (observer) {
      observer.disconnect();
      this[scope].observer = null;
    }
  }
}

const getScrollOptions = function(el, vm) {
  // Object.entries是将对象转变成key-value的二维数组
  return Object.entries(attributes).reduce((map, [key, option]) => {
    let value = el.getAttribute(`infinite-scroll-${key}`);
      map[key] = value ? vm[value] : option.default;
    return map;
  }, {})
}

const scope = "infinite-scroll";
export default {
  name: "infinite-scroll",
  inserted(el, bindings, vnode) {
    const cb = bindings.value; // 即 v-infinite-scroll="load" 指令绑定的load
    const vm = vnode.context; // 拿到当前组件的上下文

    // 1.我们先获取滚动的是哪个元素，如果没有元素则直接结束
    // (注意，滚动的元素不一定非得是指令所在的元素，如果该元素没有overflow:auto等样式，我们就得往父级上找)
    const container = getScrollContainer(el);
    if (!container) return;
    let { delay, immediate } = getScrollOptions(el, vm);
    let onScroll = throttle(handleScroll.bind(el,cb), delay);
    el[scope] = {
      container,
      onScroll,
      el,
      vm
    }
    //immediate && onScroll();
    if (immediate) {
      const observer = el[scope].observer = new MutationObserver(onScroll);
      observer.observe(container, {
        childList: true, // 监听子元素变化
        subtree: true, // 监听子元素下的元素变化
      });
      onScroll();
    }
    container.addEventListener("scroll", onScroll)
  },
  unbind(el) {
    // 那么解绑的时候我们怎么拿到滚动元素container和事件onScroll呢，我们可以想到在inserted的时候，在el上放上去
    const { container, onScroll } = el[scope];
    container && container.removeEventListener("scroll", onScroll);
    el[scope] = null;
    delete el[scope];
  }
}