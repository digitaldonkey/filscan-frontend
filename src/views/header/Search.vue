<template>
  <div class="header-search">
    <el-input
      :placeholder="$t('header.placeholder')"
      v-model="key"
      :class="['input-with-select', theme === 'light' ? 'light' : 'dark']"
      @keyup.native="handleSearch"
      :clearable="!isMobile"
      :suffix-icon="loading && !isMobile ? 'el-icon-loading' : ''"
    >
      <el-select
        v-model="filter"
        slot="prepend"
        popper-class="filter-select"
        v-if="!isMobile"
        class="search-filter"
      >
        <el-option
          v-for="item in $t('header.filter')"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click.native="handleSearch"
        v-if="!isMobile"
      ></el-button>
    </el-input>
    <div class="mb-button" v-if="isMobile">
      <el-button type="primary" @click.native="handleSearch">
        {{ $t("header.mb.search") }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { search } from "@/api/home";
export default {
  name: "Search",
  data() {
    return {
      filter: 0,
      key: "",
      loading: false
    };
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
        this.$emit("hide");
        this.goTarget(target, key);
      } catch (e) {
        this.loading = false;
      }
    }
  },
  watch: {
    "$route.path"() {
      this.key = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.header-search {
  flex: 1;
  .input-with-select {
    & ::v-deep  input:nth-child(2) {
      background: var(--board-bg-color) !important;
      color: var(--main-text-color);
    }
    &.dark ::v-deep input:nth-child(2) {
      background: var(--main-bg-color) !important;
      border-color: transparent;
    }
    &.dark ::v-deep .el-input-group__prepend{
      background: var(--main-bg-color)!important;
      border-color: transparent;
      border-right: 1px solid var(--board-bg-color)
    }
    &.dark ::v-deep .el-input-group__append {
      background: var(--main-bg-color)!important;
      border-color: transparent;
      border-left: 1px solid var(--board-bg-color)
    }
  }
  & ::v-deep .el-input-group__prepend {
    background: var(--board-bg-color) !important;
    .el-select.search-filter input {
      width: 130px;
      background: transparent !important;
    }
  }
  & ::v-deep .el-input-group__append {
    background: var(--board-bg-color) !important;
    color: var(--main-text-color) !important;
  }
  & ::v-deep .el-button {
    width: 70px;
  }
  @media (max-width: 768px) {
    & ::v-deep input {
      height: 30px !important;
      border-radius: 15px !important;
    }
    & ::v-deep .el-select {
      width: 100px;
    }
    & ::v-deep .el-input__suffix {
      i {
        line-height: 20px;
        padding-left: 5px;
        &.is-reverse {
          padding-right: 10px;
        }
      }
    }
    & ::v-deep button {
      width: 50px !important;
    }
    .mb-button .el-button {
      height: 30px;
      border-radius: 15px;
      width: 100% !important;
      margin-top: 20px;
    }
  }
}
</style>