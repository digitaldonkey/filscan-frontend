<template>
  <div class="total-chart">
    <div class="chart">
      <block-time-chart :time="time" />
    </div>
    <div class="chart">
      <block-size-chart :time="time" />
    </div>
    <div class="chart">
      <total-power-chart :time="time" />
    </div>
  </div>
</template>
<script>
import BlockTimeChart from "./chart/BlockTimeChart";
import BlockSizeChart from "./chart/BlockSizeChart";
import TotalPowerChart from "./chart/TotalPowerChart";
export default {
  name: "TotalChart",
  data() {
    return {
      time: {}
    };
  },
  components: {
    BlockTimeChart,
    BlockSizeChart,
    TotalPowerChart
  },
  created() {
    const end_time = Math.floor(new Date().getTime() / 1000);
    this.time = {
      start_time: end_time - 86400,
      end_time: end_time
    };
  }
};
</script>
<style lang="scss" scoped>
.total-chart {
  $breakpoint: 48rem;
  .chart {
    @include panel;
    width: auto;
    padding: $vertical-space $horizontal-space;
    margin-bottom: $vertical-space;
    height: 9rem;

    @media (min-width: $breakpoint) {
      height: 13rem;
      margin-right: $horizontal-space;
      width: 33%;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @media (min-width: $breakpoint) {
    display: flex;
    &:last-child {
      margin-right: 0;
    }
  }
}

</style>
