<template>
  <div class="home-con">
    <TotalBoard />
    <TotalChart />
    <div class="l-block-message-tables">
      <div class="panel">
        <h3 class="block-title">{{ $t('home.blockTable.title') }}</h3>
        <BlockTable />
      </div>
      <div class="panel">
        <h3 class="block-title">{{ $t('home.messageTable.title') }}</h3>
        <MessageTable />
      </div>
    </div>
    <div class="panel l-ticket-chain">
      <ticket-chain
        @hash-change="handleHashChange"
        @height-change="handleHeightChange"
        v-if="atIndex"
      />
    </div>
  </div>
</template>

<script>
import TicketChain from "../tipset/components/TicketChain";
import TotalBoard from "./components/TotalBoard";
import TotalChart from "./components/TotalChart";
import BlockTable from "./components/table/BlockTable";
import MessageTable from "./components/table/MessageTable";

export default {
  name: "Home",
  data() {
    return {
      option: {}
    };
  },
  components: {
    MessageTable,
    BlockTable,
    TotalChart,
    TotalBoard,
    TicketChain,
  },
  methods: {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.home-con {

  .l-block-message-tables {
    $brakpoint: 64rem; //1024px

    @media (min-width: $brakpoint)  {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      height: 100%;
    }

    .panel {
      @include panel;
      @include fillHeight;
      height: 25rem; // 400px

      @media (min-width: $brakpoint)  {
        flex: 1;
        margin-right: $horizontal-space;
        width: calc(50% - #{$horizontal-space});
        height: calc(100% - #{$vertical-space});

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .l-ticket-chain {
    margin-bottom: $vertical-space;
  }
}
</style>
