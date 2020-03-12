<template>
  <div class="mining">
    <active-miner />
    <proven-power />
    <miner-list />
  </div>
</template>
<script>
import ProvenPower from "./components/mining/ProvenPower";
import ActiveMiner from "./components/mining/ActiveMiner";
import MinerList from "./components/mining/MinerList";
export default {
  name: "Mining",
  components: {
    ProvenPower,
    ActiveMiner,
    MinerList
  }
};
</script>
<style lang="scss" scoped>
  .mining {
    /*display: flex;*/
    /*flex-direction: column;*/
    /*height: 100%;*/
  }

  /*// Not yet page-fit responsive.*/
  /*// .mining {*/
  /*//   @media (min-width: 48rem) {}*/
  /*// }*/
  ::v-deep .base-table {
    height: 30rem !important;
  }
</style>
