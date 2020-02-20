import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components/index";
import "reset-css";
import mixin from "./mixins/index";
import echarts from "./chart";
import i18n from "./i18n";
import "@/assets/style/main.scss";
Vue.config.productionTip = false;
Vue.prototype.$chart = echarts;
Vue.mixin(mixin);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
