import Vue from 'vue'
import App from './App'
import router from './router'
// import 'swiper/dist/css/swiper.min.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import loadingImg from './common/image/loading.jpg'
import 'common/styles/reset.less'
//rem self-justify
import 'api/globalConfig.js'
//fastclick
fastclick.attach(document.body)
//lazy-load
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: loadingImg,
  attempt: 1
});
//swiper
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  mounted() {

  }
})
