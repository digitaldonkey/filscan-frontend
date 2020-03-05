<template>
  <div id="app">
    <Header />
    <div class="content-container">
      <keep-alive include="Home">
        <router-view />
      </keep-alive>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "./views/header";
import Footer from "./views/footer";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapMutations(["setRate"])
  },
  created() {
    window.addEventListener("resize", this.windowResize);
    this.windowResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },
};
</script>
