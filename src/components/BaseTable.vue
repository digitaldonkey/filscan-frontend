<template>
  <div class="base-table" >
    <slot name="header" ref="header"></slot>
    <div class="wrap" ref="wrap" v-resize.debounce="calcTableHeight">
      <el-table
        v-if="tableHeight"
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
        :height="tableHeight"
        :cell-class-name="getCellClass"
        :default-sort="defaultSort"
      >
        <el-table-column
          v-if="expand"
          type="expand"
        >
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
          align="left"
          :fixed="isMobile && index === 0"
        >
          <template slot-scope="scope">
            <base-link
              v-if="item.isLink && !item.isComponent"
              :target="scope.row.target || item.target"
              :param="{
              key: item.paramKey || item.key,
              value: scope.row[item.key]
            }"
              :underline="item.underline"
              :label="`${scope.row[item.key]} ${item.unit || ''}`"
              :class=textOverflowEllipsis(scope.row[item.key])
            ></base-link>
            <span v-if="!item.isLink && !item.isComponent">{{
            `${scope.row[item.key]} ${item.unit || ""}`
          }}</span>
            <component :is="scope.row[item.key]" v-if="item.isComponent" />
          </template>

        </el-table-column>


      </el-table>
    </div>
    <div
      slot="append"
      v-if="showAppend"
      class="cloumn-append"
      @click="$emit('click-append')"
    >
      {{ $t('home.baseTable.more') }}
    </div>
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
    tableHeightValue: {
      type: Number,
      default: 0
    },
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
  mounted() {
    this.calcTableHeight();
  },
  computed: {
    tableHeight: {
      get: function() {
        return this.tableHeightValue;
      },
    },
    columnsWithLabel() {
      return this.columns.map((item, index) => {
        return {
          ...item,
          label: this.labels[index],
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
    calcTableHeight () {
      var vm = this
      this.$nextTick(function () {

        let height = this.$refs.wrap.clientHeight;
        // console.log(height, 'this.$refs.wrap.clientHeight')

        // Pixel value of 2 * $horizontal-space (which is 1rem)
        const baseFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]
        // console.log({
        //   height,
        //   '$refs': this.$refs,
        //   fontSize
        // },' @ $nextTick');
        vm.tableHeightValue = height - 2 * baseFontSize;
      });
    },
    textOverflowEllipsis(text) {
      if (text.length > 10) {
        return `text-overflow-ellipsis`;
      }
      return '';
    },
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
  @include fillHeight;

  .wrap {
    width: 100%;
    height: inherit;
    @media (min-width: 48rem) {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: inherit;
      position: relative;
    }
  }

  & ::v-deep .el-table__header-wrapper {
    tr {
      height: 1.875rem;
    }
  }
  & ::v-deep .el-table__body-wrapper {
    tr {
      height: 1.875rem;
    }
  }

  & ::v-deep .el-table {
    display: flex;
    flex-direction: column;
    height: inherit;
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
      background: var(--table-row-bg-color);
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
      line-height: $--font-size-base;
      font-size: $--font-size-extra-small;
      height: $--font-size-base;
    }
  }

  & ::v-deep .el-pagination {
    display: flex;
    justify-content: center;
    padding-top: $vertical-space / 2;
    font-size: .75rem;
    align-items: center;
    font-weight: normal;

    & * {
      font-size: inherit;
      color: var(--main-text-color) !important;
      &.active {
        color: var(--link-color) !important;
      }
      .el-input__inner {
        line-height: inherit;
        height: inherit;
        font-size: inherit;
        vertical-align: middle;
      }
    }
    [class^="el-icon-arrow-"] {
      outline: 2px solid red;
      font-size: var(--$--font-size-base);
      line-height: inherit;
    }
    & .el-select .el-input {
      width: 10rem;
    }
    .el-pager li {
      background: transparent;
    }
    button {
      background: var(--board-bg-color) !important;
    }
    input {
      background: transparent;
    }
  }

  & ::v-deep .el-link.underline {
    text-decoration: underline;
  }
  .cloumn-append {
    display: none;
    text-align: center;
    font-size: .75rem;
    color: var(--logo-text-color);
    cursor: pointer;
    padding-top: $vertical-space;
  }
}
</style>
