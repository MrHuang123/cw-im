import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/style/APP.styl'


import TIM from 'tim-js-sdk'
import tim from './utils/tim'

import './mixin/mixins'


(window as any).tim = tim
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
import { Notify,Toast,Dialog  } from 'vant';
Vue.config.productionTip = false;
Vue.use(Notify);
Vue.use(Toast);
Vue.use(Dialog);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
