<template>
  <div class="proven-power" v-resize:debounce="resizeChart">
    <time-selector @time-select="handleTimeChange">
      <span slot="left" class="title">
        {{ $t("stats.mining.provenPower.title") }}
      </span>
    </time-selector>
    <div
      class="chart-con"
      v-loading="loading"
      element-loading-background="transparent"
    >
      <div class="line-chart-con">
        <div class="line-chart" ref="line"></div>
      </div>
      <div class="pie-chart-con">
        <div class="pie-chart" ref="pie"></div>
      </div>

    </div>
  </div>
</template>
<script>
let lineChart, pieChart;
import { getTopMiner, getMinerPowerByTime } from "@/api/stats";
import dayjs from "dayjs";
export default {
  name: "ProvenPower",
  data() {
    return {
      series: [],
      selector: {
        time_diff: 3600,
        repeate_time: 24,
        format: "MMM Do HH:mm"
      },
      loading: false,
      unit: ""
    };
  },
  mounted() {
    lineChart = this.$chart.init(this.$refs.line);
    pieChart = this.$chart.init(this.$refs.pie);

    lineChart.on("updateAxisPointer", e => {
      if (e.axesInfo.length) {
        const v = this.series.map(item => {
          return {
            name: item.name,
            value: item.data[e.dataIndex].value,
            itemStyle: item.itemStyle
          };
        });
        pieChart.setOption({
          series: {
            data: v
          }
        });
      }
    });
  },
  methods: {
    resizeChart() {
      lineChart.resize();
      pieChart.resize();
    },
    handleTimeChange(v) {
      this.selector = v;
    },
    drawChart() {
      const unitConversion = this.unitConversion;
      const rate = this.rate;
      const first = this.series;
      const color = this.theme === "light" ? "black" : "white";
      const splitLineColor = this.chartTheme.provenPower.splitLine;
      const xData = first[0].data.map(item =>
        dayjs.unix(item.time).format(this.selector.format)
      );
      const legendData = this.series.map(item => {
        return {
          name: item.name,
          icon: "rect"
        };
      });
      const pieData = first.map(item => {
        return {
          name: item.name,
          value: item.data[item.data.length - 1].value,
          itemStyle: item.itemStyle
        };
      });
      const lineOption = {
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
              color: splitLineColor
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
              return unitConversion(v, 2);
            },
            fontSize: '1rem',
            color
          }
        },
        legend: {
          selectedMode: false,
          legendData,
          icon: "circle",
          textStyle: {
            fontSize: 12 * rate,
            color
          }
        },
        tooltip: {
          trigger: "axis",
          formatter(yValues) {
            let str = `<div>${yValues[0].axisValueLabel}</div>`;
            yValues.forEach(item => {
              str += `<div>${item.marker}${item.seriesName}:${unitConversion(
                item.data.value,
                2
              )}</div>`;
            });
            return str;
          }
        },
        series: this.series
      };
      const pieOption = {
        tooltip: {
          trigger: "item",
          formatter(p) {
            const { name, value, percent } = p;
            return `${name}: ${percent}%(${unitConversion(value, 2)})`;
          }
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "55%"],
            data: pieData,
            label: {
              formatter: "{b}:{d}%",
              show: true
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
          }
        ]
      };
      lineChart.setOption(lineOption);
      pieChart.setOption(pieOption);
    },
    async getTopMiner() {
      try {
        this.loading = true;
        const colors = this.chartTheme.provenPower.items;
        const { time_diff, repeate_time } = this.selector;
        let res = await getTopMiner({
          time_at: this.now,
          offset: 0,
          limit: 6
        });
        const miners = res.miners.map(item => {
          return item.address;
        });
        const powerRes = await getMinerPowerByTime({
          time_at: this.now,
          time_diff,
          repeate_time,
          miners: miners
        });
        this.loading = false;
        const series = Object.entries(powerRes).map((item, index) => {
          const [key, value] = item;
          value.data.reverse();
          return {
            data: value.data.map(item => {
              return {
                value: parseFloat(item.miner_states.power),
                time: item.at_time
              };
            }),
            name: key,
            type: "line",
            stack: "power",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: colors[index].item
            },
            areaStyle: {
              color: colors[index].area
            }
          };
        });
        this.series = Object.freeze(series);
        this.drawChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  watch: {
    selector: {
      handler() {
        this.getTopMiner();
      },
      immediate: true
    },
    theme() {
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.proven-power {
  @include panel;


  .title {
    font-weight: bold;
    font-size: 20px;
    color: var(--main-text-color);
  }

  .chart-con {
    .pie-chart-con,
    .line-chart-con {
      height: 18.75rem; // Mobile 300px,
      display: flex;
      width: 100%;

      &.line-chart-con {
        margin-bottom: $vertical-space;
      }

      .pie-chart,
      .line-chart {
        position: relative;
        height: inherit;
        width: 100%;
      }
    }
    .line-chart-con {
      margin-bottom: $vertical-space;
    }

    @media (min-width: 768px)  {
      display: flex;
      flex-direction: row;
      .pie-chart-con,
      .line-chart-con {
        height: 30.5rem;
        width: inherit;
      }
      .line-chart-con {
        width: 60%;
      }
      .pie-chart-con {
        width: 40%;
      }
    }
  }
}
</style>
