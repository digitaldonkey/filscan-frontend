<template>
  <div class="header header-mobile">
    <div class="header-main">
      <div
        class="el-icon-arrow-left arrow-back"
        v-if="!atIndex"
        @click="$router.go(-1)"
      ></div>
      <div class="logo" v-else>
        <img src="@/assets/logo.png" />
        <span>{{ $t("header.title") }}</span>
      </div>
      <div class="route-name">{{ routeName }}</div>
      <div class="tools" v-if="!showSearch && !showNav">
        <theme-switch />
        <img :src="searchSrc" class="icon" alt @click="showSearch = true" />
        <span class="burger-menu icon" @click="showNav = true">☰</span>
      </div>
      <div class="close" v-else @click="hide">
        <span class="el-icon-close"></span>
      </div>
    </div>

    <div v-if="showNav" class="nav-bar">
      <div
        @click="!atIndex ? go('/') : hide()"
        class="nav-item"
      ><div class="sub-item">
        {{ $t('header.nav.home.label') }}
      </div>
      </div>
      <div v-for="(value, key) in $t('header.nav')" :key="key" >
        <div v-if="value.items" class="nav-item">
          <div class="nav-item-label">
            {{ value.label }}
          </div>
          <div
            v-for="item in value.items"
            :key="item.index"
            class="sub-item"
            @click="go(item.index)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSearch" class="search-bar">
      <Search @hide="hide" />
    </div>
  </div>
</template>
<script>
import Search from "./Search";
import ThemeSwitch from "./components/Switch";
import searchIcon from "@/assets/image/icons/search-white.png";
import searchDarkIcon from "@/assets/image/icons/search-dark.png";
export default {
  name: "MbHeader",
  data() {
    return {
      showNav: false,
      showSearch: false
    };
  },
  computed: {
    searchSrc() {
      return this.theme === "light" ? searchIcon : searchDarkIcon;
    }
  },
  methods: {
    go(path) {
      this.showNav = false;
      this.$router.push(path);
    },
    hide() {
      this.showNav = false;
      this.showSearch = false;
    }
  },
  components: {
    Search,
    ThemeSwitch
  }
};
</script>
<style lang="scss" scoped>
.header-mobile {
  z-index: 10000;
  background: var(--main-bg-color);
  top: 0;
  width: 100%;
  color: var(--main-text-color);

  box-shadow: 0.25rem 0 3vw 0 #000;


  .header-main {
    background: var(--board-bg-color);
    z-index: 10000;
    display: flex;
    height: inherit;
    padding: 0 $vertical-space;
    justify-content: space-between;

    & > div:first-child,
    .route-name {
      color: var(--main-text-color);
    }
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      color: var(--logo-text-color);
      img {
        width: 2.5rem;
        &:first-child {
          margin-right: 5vw;
        }
      }
    }
    .tools {
      display: flex;
      align-items: center;
      .icon {
        height: 2.5rem;
        width: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
      }
      .burger-menu {
        font-size: 2rem;
      }
    }
  }
  .nav-bar {
    position: fixed;
    width: 100%;
    top: $header-height;
    height: calc(100% - #{ $header-height });
    padding: $vertical-space;
    z-index: 10000;
    background: var(--main-bg-color);
    overflow-x: scroll;
    .nav-item {
      @include panel;
      padding: $vertical-space / 2;
      margin-bottom: $vertical-space / 2;
      font-size: var($--font-size-base);

      .title {
        font-weight: bold;
        line-height: 2 * $vertical-space;
        padding-left: $vertical-space;
        font-size: var($--font-size-small);
      }
      .nav-item-label {
        line-height: initial;
        font-size: var(--$--font-size-small);
        padding-left: $vertical-space/2;
        color: var(--general-title-text-color);
      }
      .sub-item {
        line-height: 2 * $vertical-space;
        border-top: 1px solid var(--border-bottom-color);
        padding-left: 1.5 * $vertical-space;
      }
    }
  }
  .search-bar {
    background: var(--board-bg-color);
    height: $header-height;
    position: absolute;
    top: $header-height;
    width: 100%;
    padding: 0 $horizontal-space;

    .el-input > .el-input__inner {
      font-size: 1rem !important;
    }


    /*& > div:first-child {*/
    /*  text-align: center;*/

    /*}*/
    /*.el-button {*/
    /*  display: inline-block;*/
    /*  !*width: 100%;*!*/
    /*  margin-top: 20px;*/
    /*  height: 30px;*/
    /*  border-radius: 15px;*/
    /*}*/
  }
  .close {
    display: flex;
    align-items: center;
    background: var(--board-bg-color);
    text-align: right;
    line-height: $header-height;
    color: var(--main-text-color);
    &::before {
      font-size: $header-height;
      margin-right: $header-height;
    }
    img {
      width: 6.3vw;
    }
    span {
      font-size: 2rem;
    }
    .el-icon-close {
      line-height: inherit;
    }
  }
  .arrow-back {
    display: flex !important;
    align-items: center !important;
    font-size: 2rem;
  }
  .route-name {
    display: flex;
    align-items: center;
  }
}
</style>
