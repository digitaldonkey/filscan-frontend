<template>
  <div
    class="total-power-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="info-con">
      <div class="power-info">
        <div>
          {{ $t("home.totalPower.power") }}
        </div>
        <div class="top-10 bottom-10" v-show="!loading">{{ totalPower }}</div>
      </div>
      <div class="storage-info">
        <div>
          {{ $t("home.totalPower.capacity") }}
        </div>
        <div class="top-10" v-show="!loading">{{ totalPower }}</div>
      </div>
    </div>
    <div class="chart-con" ref="power"></div>
  </div>
</template>
<script>
import { getTotalPowerData } from "@/api/home";
let chart;
export default {
  name: "TotalPowerChart",
  data() {
    return {
      dataList: [],
      totalPower: 0,
      loading: false,
      storageCapacity: 0
    };
  },
  props: {
    time: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    drawPowerChart() {
      const series = this.dataList;
      const { axisLine, seriesItem, area } = this.chartTheme.totalPower;
      const xData = series.map(item => {
        return {
          value: item.name
        };
      });
      const vm = this;
      const option = {
        xAxis: {
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: axisLine
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: xData
        },
        yAxis: {
          type: "value",
          show: false
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 10
        },
        tooltip: {
          trigger: "axis",

          formatter: function(p) {
            const html = vm.$t("chart.totalPower", {
              value: vm.unitConversion(p[0].data.value, 3),
              name: p[0].data.name
            });
            return html;
          }
        },
        series: [
          {
            data: series,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: seriesItem
            },
            areaStyle: {
              color: area
            }
          }
        ]
      };
      chart.setOption(option);
    },
    async getTotalPowerData() {
      try {
        this.loading = true;
        const res = await getTotalPowerData({
          time: this.time.end_time
        });
        this.loading = false;
        const dataList = res.data.map(item => {
          return {
            name: this.formatTimeByStr(item.time * 1000, "MMM Do YYYY HH:mm"),
            value: item.power
          };
        });
        this.storageCapacity = this.unitConversion(res.storage_capacity, 3);
        this.totalPower = this.unitConversion(dataList.slice(-1)[0].value, 3);
        this.dataList = Object.freeze(dataList);
        this.drawPowerChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.power);
    this.getTotalPowerData();
  },
  watch: {
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      this.getTotalPowerData();
    },
    theme() {
      this.drawPowerChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.total-power-chart {
  display: flex;

  .info-con {
    //flex: 2;
    min-width: 180px;
    display: flex;
    flex-direction: column;
    & > div {
      div:last-child {
        font-size: 26px;
        color: var(--total-power-color);
      }
      div:first-child {
        color: var(--total-board-top-color);
        font-weight: bold;
      }
    }
  }
  .chart-con {
    flex: 1;
    height: 100%;
  }
  @media (max-width: 768px) {
    .info-con .power-info,
    .info-con .storage-info {
      & > div:last-child {
        margin-top: 5px !important;
        font-size: 12px !important;
      }
    }
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    .info-con {
      flex: 2;
    }
    .chart-con {
      flex: 3;
    }
  }
}
</style>
