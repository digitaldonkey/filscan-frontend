import Vue from "vue";
import VueRouter from "vue-router";
import messageRoute from "./message";
import addressRoute from "./address";
import statsRoute from "./stats";
import NoResult from "../views/no-result/NoResult.vue";
import NotFound from "../views/404/404.vue";
import About from "../views/about";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/home/Home.vue")
  },
  {
    path: "/tipset",
    name: "tipset",
    component: () =>
      import(/* webpackChunkName: "Tipset" */ "../views/tipset/Tipset.vue")
  },
  {
    path: "/no-result",
    name: "noResult",
    component: NoResult,
    props: true
  },
  ...messageRoute,
  ...addressRoute,
  ...statsRoute,
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
