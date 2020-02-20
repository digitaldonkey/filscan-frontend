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
  font-size: 12px !important;
  background: var(--board-bg-color) !important;
  color: var(--main-text-color) !important;
}
@media (max-width: 768px) {
  .mb-page {
    text-align: center;
    background: var(--board-bg-color);
    & ::v-deep .el-pagination__jump,
    & ::v-deep button,
    & ::v-deep .el-pager li {
      @include share-style(30px);
      min-width: 20px !important;
    }
    & ::v-deep button i {
      font-size: 12px !important;
    }
    & ::v-deep input {
      @include share-style(20px);
      min-width: 30px !important;
    }
  }
}
</style>
