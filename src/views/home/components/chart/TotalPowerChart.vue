<template>
  <div
    class="total-power-chart total-chart--chart"
    v-loading="loading"
    element-loading-background="transparent"
    v-resize:debounce="resizeChart"
  >
    <div class="info-con">
      <div class="power-info title">
        <div>
          {{ $t("home.totalPower.power") }}
        </div>
        <div class="" v-show="!loading">{{ totalPower }}</div>
      </div>
      <div class="storage-info title">
        <div>
          {{ $t("home.totalPower.capacity") }}
        </div>
        <div class="" v-show="!loading">{{ storageCapacity }}</div>
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
    async resizeChart () {
      chart.resize();
    },
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
    $breakpont: 61.25rem;
    $color: var(--total-power-color);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // Defined h/w is required to render chart.
    width: 100%;
    height: 100%;

    @media (min-width: $breakpont) {
      flex-direction: column;
      justify-content: flex-end;
    }

    .info-con {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      padding-bottom: $vertical-space;

      .title {
        display: flex;
        justify-content: space-between;

        // title
        div:first-child {
          @include chartInfo($color, $breakpont);
        }
        &:last-of-type div:first-child{
          // Hide second color dot, but keep space.
          &:before {
            visibility: hidden;
          }
        }
        // value
        div:last-child {
          @include chartValue($color, $breakpont);
        }
      }
    }

    .chart-con {
      align-self: flex-end;
      flex: 1;
      height: 4rem;
      width: 100%;
    }
  }
</style>
