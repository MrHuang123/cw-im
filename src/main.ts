import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, List, Toast, DropdownMenu, DropdownItem, Overlay, Rate, Icon, Checkbox } from 'vant';
Vue.config.productionTip = false;
Vue.use(Button).use(List).use(Toast).use(DropdownMenu).use(DropdownItem).use(Overlay).use(Rate).use(Icon).use(Checkbox);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
