<template>
  <div class="active-miner" v-resize:debounce="resizeChart">
    <time-selector title="Total Storage Miners" @time-select="handleTimeChange">
      <span slot="left" class="title">{{
        $t("stats.mining.activeMiner.title")
      }}</span>
    </time-selector>
    <div
      class="line-chart"
      ref="line"
      v-loading="loading"
      element-loading-background="transparent"
    ></div>
  </div>
</template>
<script>
import { getActiveMinerCount } from "@/api/stats";
let chart;
import dayjs from "dayjs";
export default {
  name: "ActiveMiner",
  data() {
    return {
      counts: [],
      selector: {
        time_diff: 3600,
        repeate_time: 24,
        format: "MMM Do HH:mm"
      },
      loading: false
    };
  },
  methods: {
    resizeChart () {
      chart.resize();
    },
    handleTimeChange(v) {
      this.selector = v;
    },
    drawChart() {
      const rate = this.rate;
      const { area, seriesItem, splitLine } = this.chartTheme.activeMiner;
      const countLabel = this.$t("stats.mining.activeMiner.count");
      const data = this.counts;
      const xData = data.map(item => {
        return dayjs.unix(item.name).format(this.selector.format);
      });
      const color = this.theme === "light" ? "black" : "white";
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
          axisLabel: {
            show: true,
            fontSize: 12 * rate,
            margin: 20,
            color
          },
          axisTick: {
            show: false
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
          axisLabel: {
            show: true,
            fontSize: 12 * rate,
            color
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: splitLine
            }
          }
        },
        legend: {
          selectedMode: false,
          data: [{ name: countLabel }],
          icon: "circle",
          left: 50 * rate,
          textStyle: {
            fontSize: 12 * rate,
            color
          }
        },
        grid: {
          show: false,
          left: 50 * rate,
          right: 20 * rate
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
            symbol: "none",
            name: countLabel,
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
    async getActiveMinerCount() {
      try {
        const { time_diff, repeate_time } = this.selector;
        this.loading = true;
        let res = await getActiveMinerCount({
          time_at: this.now,
          time_diff,
          repeate_time
        });
        const data = res.map(item => {
          return {
            name: item.time_at,
            value: item.count
          };
        });
        this.counts = Object.freeze(data.reverse());
        this.loading = false;
        this.drawChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.line);
    this.getActiveMinerCount();
  },
  watch: {
    selector() {
      this.getActiveMinerCount();
    },
    theme() {
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.active-miner {
  @include panel;

  .line-chart {
    height: 500px;
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    color: var(--main-text-color);
  }
  @media (max-width: 768px) {
    .line-chart {
      height: 200px;
    }
  }
}
</style>
