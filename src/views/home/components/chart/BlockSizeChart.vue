<template>
  <div
    class="block-size-chart"
    :loading="loading"
    element-loading-background="transparent"
    v-resize:debounce="resizeChart"
  >
    <div class="size-info-con">
      <div class="title">
        {{ $t("home.blockSize.label") }}&nbsp;
        <el-popover
          placement="bottom-start"
          width="200"
          trigger="hover"
          :content="$t('home.blockSize.tips')"
        ><i class="el-icon-question" slot="reference"></i>
        </el-popover>
      </div>
      <div class="value" >
        <span v-show="!loading">{{ $t("home.blockSize.size", { avg: avgSize }) }}</span>
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
    resizeChart () {
      chart.resize();
    },
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
  $breakpont: 61.25rem;
  $color: var(--block-size-color);

  // Defined h/w is required to render chart.
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width:   $breakpont) {
    flex-direction: column;
    justify-content: flex-end;
  }

  .size-info-con {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;

    .title {
      @include chartInfo($color, $breakpont);
    }

    .value {
      @include chartValue($color, $breakpont);
      white-space: pre;
    }
  }

  .chart-con {
    flex: 1;
    align-self: flex-end;
    height: 6rem;
    width: 100%;
    @media (min-width:   $breakpont)  {
      margin-top: $vertical-space;
    }
  }
}
</style>
