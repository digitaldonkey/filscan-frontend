<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    hide-on-single-page
    :page-size="25"
    :layout="layout"
    :total="total"
    class="mb-page"
  ></el-pagination>
</template>
<script>
export default {
  name: "MbPage",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: "prev, pager, next,jumper"
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("size-change", size);
    },
    handleCurrentChange(num) {
      this.$emit("page-change", num);
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin share-style($height) {
  height: $height !important;
  line-height: $height !important;
  font-size: $--font-size-small !important;
  background: transparent !important;
  color: var(--main-text-color) !important;
}

.mb-page {
  text-align: center;
  background: var(--board-bg-color);
  & ::v-deep .el-pagination__jump,
  & ::v-deep button,
  & ::v-deep .el-pager li,
  & ::v-deep .el-pagination button {
    @include share-style(3rem);
    min-width: $vertical-space !important;
  }
  & ::v-deep button i {
    font-size: $--font-size-base !important;
  }
  & ::v-deep input {
    @include share-style(3rem);
    min-width: 30px !important;
    vertical-align: center;
  }
  & ::v-deep .el-input__inner {
    @include share-style(3rem);
    max-height: 1.875rem;
    min-width: 2 * $vertical-space !important;
  }
  & ::v-deep .el-pagination__jump {
    vertical-align: middle;
  }
}

</style>
