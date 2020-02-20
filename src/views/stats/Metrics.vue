<template>
  <div class="metrics bottom-10">
    <fil-outstanding />
    <div class="chart-con">
      <block-reward-chart />
      <filecoin-block-chart />
      <fil-vested-chart />
    </div>
  </div>
</template>
<script>
import FilOutstanding from "./components/metrics/FilOutstanding";
import BlockRewardChart from "./components/metrics/BlockRewardChart";
import FilVestedChart from "./components/metrics/FilVestedChart";
import FilecoinBlockChart from "./components/metrics/FilecoinBlockChart";
export default {
  name: "Metrics",
  components: {
    FilOutstanding,
    BlockRewardChart,
    FilVestedChart,
    FilecoinBlockChart
  }
};
</script>
<style lang="scss" scoped>
.metrics {
  .chart-con {
    display: flex;
    & > div {
      flex: 1;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  @media (max-width: 750px) {
    .chart-con {
      display: block;
    }
  }
}
</style>
