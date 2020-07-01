import Clipboard from './clipboard'

const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  // eslint-disable-next-line no-undef
  Vue.use(install)
}
export default Clipboard
