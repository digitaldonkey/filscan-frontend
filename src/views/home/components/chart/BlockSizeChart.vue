<template>
  <div
    class="block-size-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="size-info-con">
      <div class="top-30">
        {{ $t("home.blockSize.label") }}
        <el-popover
          placement="bottom-start"
          width="200"
          trigger="hover"
          :content="$t('home.blockSize.tips')"
        >
          <i class="el-icon-warning-outline" slot="reference"></i>
        </el-popover>
      </div>
      <div v-show="!loading">
        {{ $t("home.blockSize.size", { avg: avgSize }) }}
      </div>
    </div>
    <div class="chart-con" ref="size"></div>
  </div>
</template>
<script>
import { getBlocSizeData } from "@/api/home";
import dayjs from "dayjs";
let chart;
export default {
  name: "BlockSizeChart",
  data() {
    return {
      dataList: [],
      avgSize: 0,
      loading: false
    };
  },
  methods: {
    drawSizeChart() {
      const data = this.dataList;
      const {
        axisLine,
        seriesItem,
        seriesMarkLine
      } = this.chartTheme.blockSize;
      const vm = this;
      const option = {
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: axisLine
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: false
        },
        grid: {
          left: 0,
          top: 0,
          bottom: 10,
          right: 0
        },
        tooltip: {
          formatter: function(p) {
            const html = vm.$t("chart.blockSize", {
              value: p.data.formatValue,
              name: p.name
            });
            return html;
          }
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
    async getBlockSizeData() {
      try {
        this.loading = true;
        const res = await getBlocSizeData(this.time);
        this.loading = false;
        const { data, avg_blocksize } = res;
        const dataList = data.map(item => {
          const end = dayjs(item.time * 1000)
            .add(1, "hour")
            .format("HH:mm");
          return {
            name: `${this.formatTimeByStr(
              item.time * 1000,
              "MMM Do YYYY HH:mm"
            )}-${end}`,
            formatValue: this.formatNumber(item.block_size),
            value: item.block_size
          };
        });
        this.dataList = Object.freeze(dataList);
        this.avgSize = this.formatNumber(avg_blocksize);
        this.drawSizeChart();
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
    chart = this.$chart.init(this.$refs.size);
    this.getBlockSizeData();
  },
  watch: {
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      this.getBlockSizeData();
    },
    theme() {
      this.drawSizeChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.block-size-chart {
  display: flex;
  .size-info-con {
    min-width: 200px;
    div:last-child {
      font-size: 26px;
      color: var(--block-size-color);
      margin-top: 5px;
    }
    div:first-child {
      font-weight: bold;
      height: 30px;
      color: var(--total-board-top-color);
      &::before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        background: var(--block-size-color);
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .chart-con {
    flex: 1;
    height: 100%;
  }
  @media (max-width: 768px) {
    .size-info-con {
      flex: 2;
    }
    .size-info-con > div:last-child {
      margin-top: 25px !important;
      font-size: 12px !important;
    }
    .size-info-con > div:first-child::before {
      width: 6px;
      height: 6px;
    }
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    .chart-con {
      flex: 3;
    }
  }
}
</style>
