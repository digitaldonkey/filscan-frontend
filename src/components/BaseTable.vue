<template>
  <div class="base-table">
    <slot name="header"></slot>
    <el-table
      :data="dataSource"
      :stripe="stripe"
      @sort-change="handleSortChange"
      @header-click="handleHeaderClick"
      v-bind="$attrs"
      v-scroll="load"
      v-loading="showLoading"
      :span-method="spanMethod"
      header-row-class-name="header-row"
      element-loading-background="transparent"
      :class="{ radius: radius, mini: atIndex }"
      :size="atIndex ? 'mini' : ''"
      :height="700 * rate"
      :row-class-name="getRowClass"
      :cell-class-name="getCellClass"
      :default-sort="defaultSort"
    >
      <el-table-column v-if="expand" type="expand">
        <template slot-scope="props">
          <overview
            :dataList="props.row.dataList"
            :dataLabel="props.row.dataLabel"
            :stripe="false"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="item.label"
        v-for="(item, index) in columnsWithLabel"
        :key="item.key"
        :sortable="item.sortable ? 'custom' : false"
        :prop="item.key"
        align="center"
        :fixed="isMobile && index === 0"
      >
        <template slot-scope="scope">
          <base-link
            :target="scope.row.target || item.target"
            :param="{
              key: item.paramKey || item.key,
              value: scope.row[item.key]
            }"
            :underline="item.underline"
            v-if="item.isLink && !item.isComponent"
            :label="
              `${ellipsisByLength(
                scope.row[item.key],
                6,
                item.ellipsis
              )} ${item.unit || ''}`
            "
          ></base-link>
          <span v-if="!item.isLink && !item.isComponent">{{
            `${scope.row[item.key]} ${item.unit || ""}`
          }}</span>
          <component :is="scope.row[item.key]" v-if="item.isComponent" />
        </template>
      </el-table-column>
      <div
        slot="append"
        v-if="showAppend"
        class="cloumn-append"
        @click="$emit('click-append')"
      >
        More
      </div>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      hide-on-single-page
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      v-if="showPagination"
    ></el-pagination>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { mapState } from "vuex";
export default {
  name: "BaseTable",
  inheritAttrs: false,
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    stripe: {
      type: Boolean,
      default: true
    },
    labels: {
      type: Array,
      default() {
        return [];
      }
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default() {
        return [25, 50, 100, 200];
      }
    },
    pageSize: {
      type: Number,
      default: 25
    },
    currentPage: {
      type: Number,
      default: 1
    },
    loadMore: {
      type: Boolean,
      default: false
    },
    showAppend: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    span: {
      type: Boolean,
      default: false
    },
    spanMap: {
      type: Object,
      default() {
        return {};
      }
    },
    expand: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 0
    },
    defaultSort: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    columnsWithLabel() {
      return this.columns.map((item, index) => {
        return {
          ...item,
          label: this.labels[index]
        };
      });
    },
    layout() {
      return this.isMobile
        ? "prev, pager, next, jumper"
        : "total, sizes, prev, pager, next, jumper";
    },
    ...mapState(["rate"])
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("size-change", size);
    },
    handleCurrentChange(num) {
      this.$emit("page-change", num);
    },
    handleSortChange(v) {
      this.$emit("sort-change", v);
    },
    load() {
      if (!this.loadMore) {
        return;
      } else {
        this.$emit("load");
      }
    },
    spanMethod({ rowIndex, columnIndex }) {
      if (!this.span) {
        return;
      }
      if (columnIndex === 0) {
        if (Object.keys(this.spanMap).includes(rowIndex.toString())) {
          return {
            rowspan: this.spanMap[rowIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    handleHeaderClick(column) {
      this.$emit("header-click", column);
    },
    getRowClass({ rowIndex }) {
      if (this.stripe) {
        return "";
      }
      rowIndex++;
      if (!this.spanMap["0"]) {
        return;
      }
      let res = Object.entries(this.spanMap)
        .sort((pre, next) => {
          return pre[0] - next[0];
        })
        .map(item => {
          return [Number(item[0]) + 1, Number(item[0]) + item[1] + 1];
        });
      let className = "";
      for (let i = 0; i < res.length; i++) {
        const [left, right] = res[i];
        if (rowIndex >= left && rowIndex < right) {
          className = i % 2 === 0 ? "even" : "odd";
          break;
        }
      }
      return className;
    },
    getCellClass({ columnIndex }) {
      return columnIndex === 0 && !this.stripe ? "column-first" : "";
    }
  },
  directives: {
    scroll: elTableInfiniteScroll
  }
};
</script>
<style lang="scss" scoped>
.base-table {
  & ::v-deep .el-table.radius {
    border-radius: 8px;
  }
  & ::v-deep .el-table__header-wrapper {
    tr {
      height: 60px;
    }
  }
  & ::v-deep .el-table__body-wrapper {
    tr {
      height: 60px;
    }
  }
  & ::v-deep .el-table {
    padding-bottom: 20px;
    background: var(--board-bg-color) !important;
    &::before {
      height: 0 !important;
    }
    .header-row th {
      background: var(--table-header-bg-color);
      color: var(--table-header-text-color);
      border-bottom-color: var(--table-header-border-color) !important;
    }
    tr {
      background: var(--table-row-bg-color) !important;
      &:not(.even):hover td {
        background: var(--board-bg-color);
      }
      &:hover td:not(.column-first) {
        background: var(--table-row-hover-bg-color) !important;
        color: var(--table-row-hover-text-color);
        a {
          color: var(--table-row-hover-text-color);
        }
      }

      &.el-table__row--striped:hover td {
        background: var(--table-row-hover-bg-color);
      }
      &.el-table__row--striped td {
        background: var(--table-row-striped-bg-color) !important;
      }
      &.even {
        background: var(--table-row-striped-bg-color) !important;
        &:hover .column-first {
          background: var(--table-row-striped-bg-color);
        }
      }
      &.odd {
        background: var(--table-row-bg-color) !important;
        &:hover .column-first {
          background: var(--table-row-bg-color);
        }
      }
    }
    td {
      border: none !important;
      &.el-table__expanded-cell {
        background: var(--board-bg-color);
      }
      .cell {
        color: var(--main-text-color);
      }
    }
    &.mini th,
    &.mini tr {
      height: 20px;
    }
  }
  & ::v-deep .el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background: var(--board-bg-color);
    & * {
      font-size: 16px;
      color: var(--main-text-color) !important;
      &.active {
        color: var(--link-color) !important;
      }
    }
    & .el-select .el-input {
      width: 120px;
    }
    .el-pager li {
      background: var(--board-bg-color);
    }
    button {
      background: var(--board-bg-color) !important;
    }
    input {
      background: var(--board-bg-color) !important;
    }
  }
  & ::v-deep .el-link.underline {
    text-decoration: underline;
  }
  .cloumn-append {
    text-align: center;
    height: 48px;
    line-height: 2;
    background: var(--board-bg-color);
    color: var(--main-text-color);
    cursor: pointer;
    @media (max-width: 768px) {
      height: 30px;
      line-height: 30px;
    }
  }
  @media (max-width: 768px) {
    & ::v-deep .el-pagination {
      text-align: center;
      background: var(--board-bg-color);
      height: 30px;
      .el-pagination__jump,
      button,
      .el-pager li {
        height: 30px !important;
        line-height: 30px !important;
        min-width: 20px;
        font-size: 12px !important;
      }
      button i {
        font-size: 12px !important;
      }
      .el-pagination__jump input {
        height: 20px !important;
        line-height: 20px !important;
        min-width: 30px !important;
        font-size: 12px;
      }
    }
  }
}
</style>
