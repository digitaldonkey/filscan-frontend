import "./element-setup";
import GeneralTitle from "./GeneralTitle.vue";
import Overview from "./Overview.vue";
import BaseTable from "./BaseTable.vue";
import TimeSelector from "./TimeSelector.vue";
import Vue from "vue";
export { GeneralTitle, Overview, BaseTable, TimeSelector };
const files = require.context(".", false, /.vue$/);
files.keys().forEach(item => {
  const mod = files(item).default;
  Vue.component(mod.name, mod);
});
