<template>
  <div class="total-chart">
    <block-time-chart :time="time" />
    <block-size-chart :time="time" />
    <total-power-chart :time="time" />
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
    BlockSizeChart,
    BlockTimeChart,
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
  display: flex;
  & > div {
    flex: 1;
    background: var(--board-bg-color);
    border-radius: 8px;
    box-shadow: 0px 1px 7px 9px rgba(0, 0, 0, 0.03);
    padding: 20px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .chart-con {
    height: 300px;
  }
  & ::v-deep .el-col-8 > div:first-child {
    height: 100px;
    color: var(--main-text-color);
  }
  .time-info-con {
    display: flex;
    & > div {
      flex: 1;
      &.avg {
        div:last-child {
          color: #0091ff;
          font-size: 26px;
        }
      }
      &.min,
      &.max {
        span:first-child {
          color: var(--white);
          font-size: 21px;
          margin-right: 10px;
          color: black;
        }
      }
      &.max {
        span:first-child {
          color: #ff0044;
        }
      }
    }
  }
  .size-info-con {
    div:last-child {
      font-size: 26px;
      color: #6a0ce0;
    }
  }
  .power-info-con {
    div:last-child {
      font-size: 26px;
      color: #f7b500;
    }
  }
}
@media (max-width: 768px) {
  .total-chart {
    display: block;
    padding-top: 10px;
    & ::v-deep .chart-con {
      height: 50px;
    }
    padding: 0;
    & ::v-deep > div {
      margin-right: 0;
      margin-bottom: 10px;
      background: var(--board-bg-color);
      padding: 10px;
    }
  }
}
</style>
