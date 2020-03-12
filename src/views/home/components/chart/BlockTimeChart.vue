<template>
  <div
    class="block-time-chart"
    :loading="loading"
    element-loading-background="transparent"
    v-resize:debounce="resizeChart"
  >
    <div class="chart-top">

      <div class="avg total-chart--chart-top">
        <div class="title">
          {{ $t("home.blockTime.label") }}
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="hover"
            :content="$t('home.blockTime.tips')"
          >
            <i class="el-icon-question" slot="reference"></i>
          </el-popover>
        </div>
        <div class="value"><span v-show="!loading">{{ avgTime }} s</span></div>
      </div>
      <div class="chart-con" ref="time"></div>
    </div>

    <div class="min-max">
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
    resizeChart () {
      chart.resize();
    },
    drawTimeChart() {
      const data = this.dataList;
      const {
        axisLine,
        seriesItem,
        seriesMarkLine
      } = this.chartTheme.blockTime;
      const vm = this;
      const option = {
        responsive: true,
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
  $breakpont: 61.25rem;
  $breakpoint-for-value-single-line: 71.875rem;
  $color: var(--average-time-color);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  // Defined h/w is required to render chart.
  width: 100%;
  height: 100%;


  .chart-top {
    flex-grow: 1;
    @media (min-width: $breakpont)  {
      display: flex;
      flex-direction: column;
    }

    .chart-con {
      height: 80%;
      /*height: inherit;*/
      width: 100%;
      flex: 1;
      align-self: flex-end;
    }

    .avg {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-between;

      @media (min-width: $breakpont)  {
        flex-direction: column;
        justify-content: flex-start;
      }
      @media (min-width: $breakpoint-for-value-single-line) {
        flex-direction: row;
        justify-content: space-between;
      }


      .title {
        @include chartInfo($color, $breakpont);
      }
      .value {
        @include chartValue($color, $breakpont);
      }
    }
  }


  .min-max {
    height: $horizontal-space;
    display: flex;
    justify-content: space-between;

    .min,
    .max {
      font-size: .875rem;
      span:first-child {
        color: var(--total-board-bottom-color);
        margin-right: .5rem;
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
}
</style>
