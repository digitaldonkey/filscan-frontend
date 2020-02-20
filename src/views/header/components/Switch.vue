<template>
  <span :class="[iconClass, 'theme-switch']" @click="handleThemeChange"></span>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "ThemeSwitch",
  methods: {
    ...mapMutations(["setTheme"]),
    handleThemeChange() {
      const theme = this.theme === "light" ? "dark" : "light";
      this.setTheme(theme);
      document.documentElement.setAttribute("theme", theme);
      localStorage.setItem("filscanTheme", theme);
    }
  },
  computed: {
    iconClass() {
      return this.theme === "dark" ? "el-icon-sunny" : "el-icon-moon";
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
  font-size: 30px;
  color: var(--main-text-color);
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
