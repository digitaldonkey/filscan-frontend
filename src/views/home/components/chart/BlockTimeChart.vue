<template>
  <div
    class="block-time-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="chart-top">
      <div class="avg top-30">
        <div>
          {{ $t("home.blockTime.label") }}
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="hover"
            :content="$t('home.blockTime.tips')"
          >
            <i class="el-icon-warning-outline" slot="reference"></i>
          </el-popover>
        </div>
        <div v-show="!loading">{{ avgTime }} s</div>
      </div>
      <div class="chart-con" ref="time"></div>
    </div>
    <div class="min-max bottom-10">
      <div class="min">
        <span>{{ $t("home.blockTime.min") }}</span>
        <span>{{ min }} s</span>
      </div>
      <div class="max">
        <span>{{ $t("home.blockTime.max") }}</span>
        <span>{{ max }} s</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getBlockTimeData } from "@/api/home";
import dayjs from "dayjs";
let chart;
export default {
  name: "BlockTimeChart",
  data() {
    return {
      dataList: [],
      avgTime: 0,
      min: 0,
      max: 0,
      loading: false,
      shouldRespondThemeChange: true
    };
  },
  methods: {
    drawTimeChart() {
      const data = this.dataList;
      const {
        axisLine,
        seriesItem,
        seriesMarkLine
      } = this.chartTheme.blockTime;
      const vm = this;
      const option = {
        tooltip: {
          formatter: function(p) {
            const html = vm.$t("chart.blockTime", {
              value: p.value,
              name: p.name
            });
            return html;
          }
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 10
        },
        xAxis: {
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: axisLine
            }
          }
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: seriesItem
              }
            },
            data: data,
            markLine: {
              silent: true,
              label: {
                show: false
              },
              lineStyle: {
                color: seriesMarkLine
              },
              symbol: "none",
              data: [
                {
                  type: "average"
                }
              ]
            }
          }
        ]
      };
      chart.setOption(option);
    },
    async getBlockTimeData() {
      try {
        this.loading = true;
        const res = await getBlockTimeData(this.time);
        this.loading = false;
        const { data, min, max, avg_blocktime } = res;
        const dataList = data.map(item => {
          const end = dayjs(item.time * 1000)
            .add(1, "hour")
            .format("HH:mm");
          return {
            name: `${this.formatTimeByStr(
              item.time * 1000,
              "MMM Do YYYY HH:mm"
            )}-${end}`,
            value: item.block_time
          };
        });
        this.dataList = Object.freeze(dataList);
        this.avgTime = Math.floor(avg_blocktime);
        this.min = min;
        this.max = max;
        this.drawTimeChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  props: {
    time: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.time);
    this.getBlockTimeData();
  },
  watch: {
    latestBlockHeight() {
      {
        if (this.loadCount === 1) {
          return;
        }
        this.getBlockTimeData();
      }
    },
    theme() {
      this.drawTimeChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.block-time-chart {
  .chart-top {
    display: flex;
  }
  .avg {
    min-width: 180px;
    div:first-child {
      font-weight: bold;
      height: 30px;
      color: var(--total-board-top-color);
      &::before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #0091ff;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
    div:last-child {
      color: #0091ff;
      font-size: 26px;
      margin-top: 5px;
    }
  }
  .chart-con {
    height: 100px;
    flex: 1;
  }
  .min-max {
    margin-left: 180px;
    display: flex;
    justify-content: space-between;
    flex: 1;
    .min,
    .max {
      font-size: 16px;
      span:first-child {
        color: var(--total-board-bottom-color);
        margin-right: 10px;
      }
      span:last-child {
        color: var(--main-text-color);
      }
    }
    .max {
      span:first-child {
        color: #ff0044;
      }
    }
  }
  @media (max-width: 768px) {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    .avg {
      flex: 2;
      div:last-child {
        margin-top: 15px !important;
        font-size: 12px !important;
      }
      & div:first-child::before {
        width: 6px;
        height: 6px;
      }
    }
    .chart-con {
      flex: 3;
    }
    .min-max {
      padding-left: 40%;
      margin: 0;
    }
    .min,
    .max {
      font-size: 12px !important;
    }
  }
}
</style>
