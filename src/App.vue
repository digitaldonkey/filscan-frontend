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
  mounted() {
    this.setRate(window.innerWidth / 1920);
    window.addEventListener("orientationchange", () => {
      window.location.reload();
    });
    window.addEventListener("keydown", event => {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        (event.which === 61 ||
          event.which === 107 ||
          event.which === 173 ||
          event.which === 109 ||
          event.which === 187 ||
          event.which === 189)
      ) {
        event.preventDefault();
      }
    });
    window.addEventListener(
      "mousewheel DOMMouseScroll",
      function(event) {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault();
        }
      },
      false
    );
  }
};
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
  background: var(--main-bg-color);
  font-size: 14px;
}
.content-container {
  padding: 90px 20px 10px;
  min-height: calc(100% - 60px);
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: white;
}
:root {
  div {
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--scroll-bg-color);
      border-radius: 5px;
    }
  }
}
@media (max-width: 768px) {
  .content-container {
    padding: 60px 10px 30px;
    background: var(--main-bg-color);
    font-size: 12px;
  }
}
</style>
