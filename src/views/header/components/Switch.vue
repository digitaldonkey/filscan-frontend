<template>
  <div :class="[iconClass, 'theme-switch']" @click="handleThemeChange"></div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "ThemeSwitch",
  methods: {
    ...mapMutations(["setTheme"]),
    handleThemeChange() {
      const theme = this.$store.state.theme === "light" ? "dark" : "light";
      this.setTheme(theme);
      document.documentElement.setAttribute("theme", theme);
      localStorage.setItem("filscanTheme", theme);
    }
  },
  computed: {
    iconClass() {
      return this.theme === "dark" ? "el-icon-sunny icon" : "el-icon-moon icon";
    }
  },
  mounted() {
    if (localStorage.getItem("filscanTheme")) {
      const theme = localStorage.getItem("filscanTheme");
      this.setTheme(theme);
      document.documentElement.setAttribute("theme", theme);
    }
  }
};
</script>
<style lang="scss" scoped>
.theme-switch {
  display: inline-block;
  height: inherit;
  width: 2.5rem;
  line-height: 2.5rem !important;
  text-align: center;
  font-size: 1.8rem;
  color: var(--main-text-color);
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
