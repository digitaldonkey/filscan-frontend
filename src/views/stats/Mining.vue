<template>
  <div class="mining bottom-10">
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
<style lang="scss" scoped></style>
