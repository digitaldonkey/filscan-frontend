<template>
  <div class="block-list bottom-10 top-20">
    <base-table
      :dataSource="list"
      :columns="columns"
      :labels="$t('component.blockList.label')"
      span
      :spanMap="spanMap"
      :stripe="false"
    >
      <div
        slot="header"
        class="list-title border-bottom"
        v-if="$route.query.height"
      >
        {{ $t("component.blockList.height", { height }) }}
      </div>
    </base-table>
  </div>
</template>
<script>
export default {
  name: "BlockListCon",
  data() {
    return {
      loading: false,
      dataSource: [],
      heightMap: {},
      columns: [
        {
          key: "height",
          isLink: true,
          target: "tipset"
        },
        {
          key: "hash",
          isLink: true,
          target: "tipset",
          ellipsis: true
        },
        {
          key: "timestamp"
        },
        {
          key: "mesLength"
        },
        {
          key: "size",
          unit: "bytes"
        },
        {
          key: "miner",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "reward",
          unit: "FIL"
        }
      ]
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    spanMap() {
      const heightMap = {};
      let res = {};
      this.list.forEach((item, index) => {
        if (heightMap[item.height]) {
          heightMap[item.height].span++;
        } else {
          heightMap[item.height] = {
            span: 1,
            index: index
          };
        }
      });
      Object.values(heightMap).forEach(item => {
        res[item.index] = item.span;
      });
      return res;
    }
  }
};
</script>
<style lang="scss" scoped>
.block-list {
  background: var(--board-bg-color);
  & ::v-deep .list-title {
    height: 40px;
    color: var(--main-text-color);
  }
  .list-title {
    height: 60px;
    line-height: 60px;
    padding-left: 100px;
    font-size: 20px;
  }
}
</style>
