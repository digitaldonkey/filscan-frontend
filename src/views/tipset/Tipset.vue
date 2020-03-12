<template>
  <div class="tipset">
    <ticket-chain
      @hash-change="handleHashChange"
      :height.sync="height"
      :hash="hash"
      @height-change="handleHeightChange"
      @get-blocks="getBlocks"
    />
    <block-detail v-if="hash" :hash="hash" :block="currentBlock" />

    <div class="block-list" v-if="!hash && !isMobile">
      <block-list
        :height="currentHeight"
        :list="currentBlockList"
      />
    </div>

    <div class="mb-block-list" v-if="isMobile && !hash">
      <div
        v-for="(value, key) in mbBlockList"
        :key="key"
        class="block-item-con"
      >
        <div class="height">
          <div>{{ $t("tipset.height") }}</div>
          <div>{{ key }}</div>
        </div>
        <mb-board
          v-for="item in value"
          :key="item.hash"
          :dataSource="item"
          :columns="mbColumns"
        ></mb-board>
      </div>
    </div>

  </div>
</template>
<script>
import TicketChain from "./components/TicketChain";
import BlockList from "./components/BlockList";
import BlockDetail from "./components/BlockDetail";
import { mapState } from "vuex";
export default {
  name: "Tipset",
  data() {
    return {
      hash: "",
      height: 0,
      value: 0,
      blocks: [],
      dataList: [
        {
          key: "height",
          isLink: true,
          target: "tipset"
        },
        {
          key: "hash"
        },
        {
          key: "timestamp"
        },
        {
          key: "size"
        },
        {
          key: "mesLength"
        },
        {
          key: "miner",
          target: "address/account",
          isLink: true
        },
        {
          key: "reward"
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
      ],
      columns: [
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
  watch: {
    "$route.query": {
      deep: true,
      immediate: true,
      handler(v) {
        this.hash = v.hash;
        let height = 0;
        if (v.height) {
          height = this.parseFormatNumber(v.height);
        }
        this.height = Number(height);
      }
    }
  },
  components: {
    TicketChain,
    BlockList,
    BlockDetail
  },
  computed: {
    ...mapState(["defaultHeight"]),
    currentHeight() {
      return Number(this.height || this.defaultHeight);
    },
    currentBlockList() {
      if (this.height) {
        return this.blocks.filter(item => {
          return item.height == this.formatNumber(this.height);
        });
      } else {
        return this.blocks;
      }
    },
    currentBlock() {
      return this.blocks.filter(item => {
        return item.hash == this.hash;
      })[0];
    },
    mbBlockList() {
      const res = {};
      this.blocks.forEach(item => {
        if (!res[item.height]) {
          res[item.height] = [item];
        } else {
          res[item.height].push(item);
        }
      });
      return res;
    },
    mbColumns() {
      const labels = [...this.$t("component.blockList.label")];
      labels.shift();
      return this.columns.map((item, index) => {
        return {
          ...item,
          title: labels[index]
        };
      });
    }
  },
  methods: {
    getBlocks(v) {
      this.blocks = v;
    },
    handleHashChange(v) {
      this.goTo("tipset", {
        query: {
          hash: v
        }
      });
    },
    handleHeightChange(v) {
      this.goTo("tipset", {
        query: {
          height: v
        }
      });
    },
    handleValueChange() {
      this.height = this.value;
      this.goTo("tipset", {
        query: {
          height: this.value
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tipset {
  display: flex;
  flex-direction: column;
  height: $content-height;
  >div {
    margin-bottom: $vertical-space;
  }
  .chart-con {
    width: 100%;
    background: var(--main-bg-color);
    .chart {
      width: 100%;
      height: 500px;
    }
  }
  .block-list {
    height: 100%;
    //margin: $vertical-space 0;
    //padding: 0 $horizontal-space;
  }
  @media (max-width: 768px) {
    .block-item-con {
      .height {
        text-align: center;
        background: var(--link-color);
        color: white;
        line-height: 20px;
        margin-bottom: 10px;
      }
      //display: flex;
      // .height{
      //   background: var(--link-color);
      //   height: 20px;
      //   line-height: 20px;
      //   color: white;
      //   padding-left: 10px;
      //   margin-right: 10px;
      //   position: relative;
      //   width: 70px;
      //   &::after{
      //     content: '';
      //     display: inline-block;
      //     width: 14px;
      //     height: 14px;
      //     background: var(--link-color);
      //     transform: rotate(45deg);
      //     position: absolute;
      //     right: -7px;
      //     top: 3px
      //   }
      // }
    }
  }
}
</style>
