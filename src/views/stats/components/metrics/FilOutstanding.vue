<template>
  <div
    class="fil-outstanding"
    v-loading="loading"
    element-loading-background="transparent"
    v-resize:debounce="resizeChart"
  >
    <div class="chart-con" ref="chart"></div>
    <div class="data-con">
      <div v-for="(item, key) in info" :key="key" class="info-item">
        <div>{{ $t(`home.filType.${key}`) }}</div>
        <div>{{ item }}FIL</div>
      </div>
    </div>
  </div>
</template>
<script>
let chart;
import dayjs from "dayjs";
import { getFilOutstanding } from "@/api/token";
export default {
  name: "FilOutstanding",
  data() {
    return {
      info: {
        floating: 0,
        pledge: 0,
        outstanding: 0
      },
      floating: [],
      pledge: [],
      loading: false
    };
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart);
    this.getFilOutstanding();
  },
  methods: {
    resizeChart() {
      chart.resize();
    },
    drawChart() {
      const rate = this.rate;
      const numberConversion = this.numberConversion;
      const floatingData = this.floating;
      const pledgeData = this.pledge;
      const xData = this.floating.map(item => {
        return dayjs.unix(item.name).format("MMM Do HH:mm");
      });
      const color = this.theme === "light" ? "black" : "white";
      const {
        splitLine,
        seriesItem,
        floatArea,
        pledgeArea
      } = this.chartTheme.filOutstanding;
      const [floating, pledge] = this.$t("chart.filOutstanding");
      const option = {
        legend: {
          data: [
            { name: floating, icon: "circle" },
            { name: pledge, icon: "circle" }
          ],
          selectedMode: false,
          // left: 30 * rate,
          // top: 20 * rate,
          textStyle: {
            fontSize: '.75rem',
            color
          }
        },
        // grid: {
        //   left: 50 * rate,
        //   top: 100 * rate,
        //   right: 40 * rate
        // },
        xAxis: {
          type: "category",
          data: xData,
          axisLine: {
            show: false
          },
          boundaryGap: false,
          axisTick: {
            show: false
          },
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
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: splitLine
            }
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
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: floatingData,
            name: floating,
            type: "line",
            smooth: true,
            symbol: "none",
            itemStyle: {
              color: seriesItem[0]
            },
            areaStyle: {
              color: floatArea
            }
          },
          {
            data: pledgeData,
            type: "line",
            name: pledge,
            smooth: true,
            symbol: "none",
            itemStyle: {
              color: seriesItem[1]
            },
            areaStyle: {
              color: pledgeArea
            }
          }
        ]
      };
      chart.setOption(option);
    },
    async getFilOutstanding() {
      try {
        this.loading = true;
        let dataList = await getFilOutstanding({
          time_start: this.now,
          time_diff: 3600,
          repeate: 24
        });
        this.loading = false;
        const floatingList = [];
        const pledgeList = [];
        dataList.forEach(item => {
          floatingList.push({
            name: item.time_end,
            value: item.floating
          });
          pledgeList.push(item.plege_collateral);
        });
        this.floating = Object.freeze(floatingList);
        this.pledge = Object.freeze(pledgeList);
        const { plege_collateral, floating, outstanding } = dataList.slice(
          -1
        )[0];
        this.info = {
          pledge: plege_collateral,
          floating,
          outstanding
        };
        this.drawChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  watch: {
    theme() {
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.fil-outstanding {
  @include panel;

  height: 400px;
  display: flex;

  .chart-con {
    height: 100%;
    flex: 1;
  }
  .data-con {
    min-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    //flex: 1;
    & > div {
      text-align: center;
      margin: 7px 14px;
    }
    .info-item {
      flex: 1;
      div {
        font-size: 22px;
        text-align: left;
        color: var(--main-text-color);
      }
      div:first-child {
        padding: 16px 0;
        color: var(--total-board-top-color);
      }
      div:last-child {
        font-size: 28px;
        color: var(--total-board-bottom-color);
      }
    }
  }
  @media (max-width: 768px) {
    display: block;
    height: auto;
    .chart-con {
      height: 200px;
    }
    .data-con {
      display: flex;
      max-width: 100%;
      flex-direction: row;
      .info-item {
        div {
          text-align: center;
        }
        & div:first-child {
          font-size: 12px !important;
        }
        div:last-child {
          margin: 4vw 0 2vw;
          font-size: 9px;
        }
      }
    }
    margin-bottom: 10px !important;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
  }
}
</style>
