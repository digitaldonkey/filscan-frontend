<template>
  <el-row class="mb-board" type="flex">
    <el-col
      :span="realList.length === 6 ? 8 : 6"
      v-for="item in realList"
      :key="item.title"
    >
      <div class="title">{{ item.title }}</div>
      <base-link
        :target="item.target"
        :param="{
          key: item.paramKey || item.key,
          value: item.value
        }"
        :underline="item.underline"
        v-if="item.isLink && !item.isComponent"
        :label="
          `${ellipsisByLength(item.value, 4, item.ellipsis)} ${item.unit || ''}`
        "
      ></base-link>
      <span v-if="!item.isLink && !item.isComponent">{{
        `${item.value} ${item.unit ? item.unit : ""}`
      }}</span>
      <component :is="item.value" v-if="item.isComponent" />
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "MbBoard",
  props: {
    dataSource: {
      type: Object,
      default: () => {
        return {};
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    realList() {
      return this.columns.map(item => {
        return {
          ...item,
          value: this.dataSource[item.key]
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .mb-board {
    background: var(--board-bg-color);
    margin-bottom: 10px;
    padding: 0 4vw 4vw;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    .title {
      color: var(--total-board-top-color);
      margin: 4vw 0 2.5vw;
    }
    &.el-row {
      flex-wrap: wrap;
    }
    span {
      word-break: break-all;
      color: var(--total-board-bottom-color);
    }
  }
}
</style>
