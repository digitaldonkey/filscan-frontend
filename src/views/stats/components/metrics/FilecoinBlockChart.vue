<template>
  <div class="filecoin-block-chart" v-resize:debounce="resizeChart">
    <div class="title">{{ $t("stats.metrics.filecoin.title") }}</div>
    <div ref="chart" class="chart-con"></div>
  </div>
</template>
<script>
import { getBlockReward } from "@/api/token";
import dayjs from "dayjs";
let chart;
export default {
  name: "FilecoinBlockChart",
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    resizeChart() {
      chart.resize();
    },
    drawChart() {
      const numberConversion = this.numberConversion;
      const rate = this.rate;
      const { area, seriesItem, splitLine } = this.chartTheme.filecoin;
      const reward = this.$t("chart.filecoin");
      const dataList = this.dataList;
      const xData = dataList.map(item => {
        return dayjs.unix(item.name).format("MMM YYYY");
      });
      const color = this.theme === "light" ? "black" : "white";
      const option = {
        legend: {
          left: 30 * rate,
          selectedMode: false,
          data: [
            {
              name: reward,
              icon: "circle"
            }
          ],
          textStyle: {
            fontSize: 12 * rate,
            color
          }
        },
        grid: {
          left: 50 * rate
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
          axisLabel: {
            textStyle: {
              fontSize: 12 * rate,
              color
            },
            margin: 20
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: splitLine
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter(v) {
              return numberConversion(v);
            },
            textStyle: {
              fontSize: 12 * rate,
              color
            }
          }
        },
        series: [
          {
            data: dataList,
            type: "line",
            smooth: true,
            name: reward,
            symbol: "none",
            itemStyle: {
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
    async getBlockReward() {
      try {
        this.loading = true;
        let res = await getBlockReward({
          time_diff: 86400 * 30,
          repeate: 12 * 28
        });
        const dataList = res.map(item => {
          return {
            name: item.time,
            value: item.block_rewards
          };
        });
        this.dataList = Object.freeze(dataList);
        this.drawChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart);
    this.getBlockReward();
  },
  watch: {
    theme() {
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.filecoin-block-chart {
  @include panel;

  .title {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 20px;
    color: var(--main-text-color);
  }
  .chart-con {
    height: 400px;
  }
  @media (max-width: 768px) {
    .chart-con {
      height: 200px;
    }
    margin: 10px 0;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    .title {
      padding: 3.3vw 0 0 3.3vw;
    }
  }
}
</style>
