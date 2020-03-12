<template>
  <div class="fil-vested-chart" v-resize:debounce="resizeChart">
    <time-selector>
      <span slot="left" class="title">
        {{ $t("stats.metrics.filVested.title") }}
      </span>
    </time-selector>
    <div ref="chart" class="chart-con"></div>
  </div>
</template>
<script>
let chart;
export default {
  name: "FilVestedChart",
  methods: {
    resizeChart() {
      chart.resize();
    },
    drawChart() {
      const rate = this.rate;
      const { splitLine, seriesItem } = this.chartTheme.filVested;
      const [total, daily] = this.$t("chart.filVested");
      const color = this.theme === "light" ? "black" : "white";
      const option = {
        title: {
          text: "comming soon...",
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 24 * rate,
            color
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            { name: total, icon: "circle" },
            { name: daily, icon: "circle" }
          ],
          selectedMode: false,
          left: "30",
          textStyle: {
            fontSize: 12 * rate,
            color
          }
        },
        grid: {
          left: 50,
          right: 50
        },
        xAxis: {
          data: [],
          axisLabel: {
            textStyle: {
              fontSize: 12 * rate,
              color
            },
            margin: 20
          },
          axisLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color
            }
          },
          {
            type: "value",
            position: "right",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: "{value} %",
              color
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: splitLine
              }
            }
          },
          {
            type: "value",
            gridIndex: 0,
            min: 50,
            max: 100,
            splitNumber: 8,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        series: [
          {
            name: total,
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            symbol: "none",
            itemStyle: {
              color: seriesItem[0]
            },
            data: []
          },
          {
            name: daily,
            type: "bar",
            itemStyle: {
              normal: {
                color: seriesItem[1]
              }
            },
            data: []
          }
        ]
      };
      chart.setOption(option);
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart);
    this.drawChart();
  }
};
</script>
<style lang="scss" scoped>
.fil-vested-chart {
  @include panel;

  .title {
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
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
  }
}
</style>
