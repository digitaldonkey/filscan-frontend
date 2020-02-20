<template>
  <div class="block-detail bottom-10 top-20">
    <div class="block-overview">
      <overview :dataList="realList" :dataLabel="$t('tipset.block.overview')" />
    </div>
    <message-list :withType="false" :cid="hash" />
  </div>
</template>
<script>
export default {
  name: "BlockDetail",
  props: {
    hash: {
      type: String,
      default: ""
    },
    block: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      dataList: [
        {
          key: "hash",
          style: {
            fontWeight: "bold"
          }
        },
        {
          key: "height",
          isLink: true,
          target: "tipset"
        },
        {
          key: "utcTime"
        },
        {
          key: "size",
          unit: "bytes"
        },
        {
          key: "mesLength"
        },
        {
          key: "miner",
          target: "address/detail",
          paramKey: "address",
          isLink: true
        },
        {
          key: "reward",
          unit: "FIL"
        },
        {
          key: "parents",
          isLink: true,
          target: "tipset",
          paramKey: "hash"
        },
        {
          key: "parent_weight"
        },
        {
          key: "tickets"
        },
        {
          key: "state_root"
        }
      ]
    };
  },
  computed: {
    realList() {
      const currentBlock = this.block;
      return this.dataList.map(item => {
        let linkList;
        if (item.key === "height" || item.key === "miner") {
          linkList = [currentBlock[item.key]];
        } else {
          linkList = currentBlock[item.key];
        }
        return {
          ...item,
          value: currentBlock[item.key],
          linkList: linkList
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.block-detail {
  position: relative;
  .block-hash {
    background: white;
  }
  & ::v-deep .message-list {
    margin-top: 20px;
  }
}
</style>
