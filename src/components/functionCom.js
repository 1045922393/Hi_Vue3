import { h } from 'vue'

const dynaHeading = (props, context) => {
  console.log(context, 'context');
  return h(`h${props.level}`, {
    class: 'fnClass', onClick: function (e) {
      console.log(e, '点击了内容')
      e.preventDefault()
    }
  }, [h('div', 1), h('div', 1), h('div', 1)])
  // h(标签, 内容)
}

dynaHeading.props = ['level']

export default dynaHeading