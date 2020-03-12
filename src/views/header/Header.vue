<template>
  <div class="header">
    <div class="header--inner">
      <div class="logo-con" @click="goTo('home')">
        <img src="@/assets/logo.png" class="logo" />
        <span>{{ $t("header.title") }}</span>
      </div>
      <div class="search-wrap">
        <Search />
      </div>
      <div class="link-con">
        <el-menu mode="horizontal" :default-active="$route.path" :router="true">
          <el-menu-item index="/">{{
            $t("header.nav.home.label")
          }}</el-menu-item>
          <el-submenu index="tipset">
            <template slot="title">{{
              $t("header.nav.tipset.label")
            }}</template>
            <el-menu-item
              v-for="item in $t('header.nav.tipset.items')"
              :key="item.label"
              :index="item.index"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu>
          <el-submenu index="stats">
            <template slot="title">{{ $t("header.nav.stats.label") }}</template>
            <el-menu-item
              v-for="item in $t('header.nav.stats.items')"
              :key="item.label"
              :index="item.index"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
      <theme-switch />
      <div class="test-pic-spacer"></div><img :src="testPicSrc" alt="" class="test-pic"/>
    </div>
  </div>
</template>
<script>
import { search } from "@/api/home";
import Search from "./Search";
import ThemeSwitch from "./components/Switch";
import testPic from "@/assets/image/icons/test.png";
import testDarkPic from "@/assets/image/icons/test-dark.png";
export default {
  name: "Header",
  data() {
    return {
      filter: 0,
      key: "",
      loading: false,
      isLight: false
    };
  },
  computed: {
    iconClass() {
      return this.theme === "dark" ? "el-icon-sunny" : "el-icon-moon";
    },
    testPicSrc() {
      return this.theme === "dark" ? testDarkPic : testPic;
    }
  },
  methods: {
    goTarget(name, key) {
      this.goTo(name, {
        query: {
          [key]: this.key
        }
      });
    },
    async handleSearch(e) {
      /* eslint-disable */
      this.key = this.key.replace(/[^0-9a-zA-Z]/g, "");

      if ((e.type === "keyup" && e.keyCode !== 13) || !this.key) {
        return;
      }
      try {
        this.loading = true;
        let res = await search({
          key: this.key,
          filter: this.filter
        });
        this.loading = false;
        const { model_flag } = res;
        let target = "";
        let key = "";
        switch (model_flag) {
          case "block_hash":
            target = "tipset";
            key = "hash";
            break;
          case "Height":
            target = "tipset";
            key = "height";
            break;
          case "message_ID":
            target = "messageDetail";
            key = "cid";
            break;
          case "actor":
            target = "addressDetail";
            key = "address";
            break;
          case "peer_id":
            target = "peer";
            key = "peer_id";
            break;
          default:
            target = "noResult";
            key = "key";
        }
        this.goTarget(target, key);
      } catch (e) {
        this.loading = false;
      }
    },
  },
  components: {
    Search,
    ThemeSwitch
  }
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0 $horizontal-space;
  line-height: $header-height;
  z-index: 1000;

  &--inner {
    display: flex;
    line-height: 2.5rem;
    align-items: center;
  }

  background: var(--board-bg-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 4px 5px rgba(0, 0, 0, 0.03);

  .link-con {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ul{
      background: var(--board-bg-color);

      li::v-deep{
        color: var(--main-text-color)!important;
        &.is-active{
          font-weight: bold;
          color: var(--main-text-color)
        }
        &:hover,&:focus{
          background: var(--board-bg-color)!important;
        }
        div,div>i{
          background: var(--board-bg-color)!important;
          color: var(--main-text-color)!important;
          &:hover{
            color: var(--main-text-color)!important;
          }
        }

      }

    }
    a {
      font-size: 24px;
      position: relative;
      &.router-link-exact-active::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--main-bg-color);
      }
    }
  }
  & ::v-deep .el-menu--horizontal.el-menu {
    border: none!important;
  }
  .el-col-2{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .theme-switch{
  }
  .testnet{
    font-size: 24px;
    color: var(--link-color);
    margin: 0 15px
  }
  .test-pic-spacer {
    width: 2rem;
  }
  .test-pic{
    position: absolute;
    height: .75 * $header-height;
    right: 0;
    top: 0
  }
}
.logo-con  {
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;

  .icon {
    margin-left: auto;
    width: 40px;
  }
  .logo {
    width: 2.5rem;
    margin-right: 20px;
    & + span {
      font-size: 30px;
      color: var(--logo-text-color);
    }
  }
}
.search-wrap {
  flex-grow: 1;
  max-width: 45rem;
  margin: 0 auto;
  font-size: 1rem;
  padding: 0 $horizontal-space;
  line-height: $header-height;
}
</style>
