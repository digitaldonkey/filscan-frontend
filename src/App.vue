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

<style lang="scss" scoped>
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    position: fixed;
    width: 100%;
    height: $header-height;
  }

  .content-container {
    height: 100%;
    > div {
      padding: calc(#{$header-height} + #{$vertical-space}) $horizontal-space $footer-height;
      margin: 0;
      flex-grow: 1;
      height: 100%;
      overflow-x: scroll;
      background: var(--main-bg-color);
      display: flex;
      flex-direction: column;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: $footer-height;
    font-size: .75rem;
    line-height: $footer-height;
    padding: 0 $horizontal-space;
  }

</style>
