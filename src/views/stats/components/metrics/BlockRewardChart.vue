<template>
  <div
    class="block-reward-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <time-selector @time-select="handleTimeChange">
      <span slot="left" class="title">{{
        $t("stats.metrics.blockReward.title")
      }}</span>
    </time-selector>
    <div class="chart-con" ref="chart"></div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { getCumulativeBlock } from "@/api/token";
let chart;
export default {
  name: "BlockRewardChart",
  data() {
    return {
      loading: false,
      selector: {
        time_diff: 3600,
        repeate_time: 24,
        format: "MMM Do HH:mm"
      },
      rewardList: [],
      countList: []
    };
  },
  methods: {
    drawChart() {
      const rate = this.rate;
      const numberConversion = this.numberConversion;
      const { splitLine, seriesItem } = this.chartTheme.blockReward;
      const [miner, reward] = this.$t("chart.blockReward");
      const { rewardList, countList } = this;
      const xData = rewardList.map(item => {
        return dayjs.unix(item.name).format(this.selector.format);
      });
      const color = this.theme === "light" ? "black" : "white";
      const option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: 50 * rate,
          right: 50 * rate
        },
        legend: {
          left: 30 * rate,
          selectedMode: false,
          data: [
            {
              name: miner,
              icon: "circle"
            },
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
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: xData,
          axisLabel: {
            textStyle: {
              fontSize: 12 * rate,
              color
            },
            margin: 20
          }
        },
        yAxis: [
          {
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
          {
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
              textStyle: {
                fontSize: 12 * rate,
                color
              }
            }
          }
        ],
        series: [
          {
            name: miner,
            type: "bar",
            yAxisIndex: 1,
            itemStyle: {
              color: seriesItem[0]
            },
            data: countList
          },
          {
            name: reward,
            type: "line",
            itemStyle: {
              color: seriesItem[1]
            },
            symbol: "none",
            smooth: true,
            data: rewardList
          }
        ]
      };
      chart.setOption(option);
    },
    handleTimeChange(v) {
      this.selector = v;
    },
    async getCumulativeBlock() {
      try {
        this.loading = true;
        const { time_diff, repeate_time, time_start } = this.selector;
        let res = await getCumulativeBlock({
          time_start: time_start == undefined ? this.now - 86400 : time_start,
          time_diff: time_diff,
          repeate: repeate_time
        });
        this.loading = false;
        const rewardList = [];
        const countList = [];
        res.forEach(item => {
          let now = dayjs(dayjs().format("YYYY MM DD HH:mm")).unix();
          if (now >= item.time_end) {
            rewardList.push({
              name: item.time_end,
              value: item.blocks_reward
            });
            countList.push(parseInt(item.miner_count));
          }
        });
        this.rewardList = Object.freeze(rewardList);
        this.countList = Object.freeze(countList);
        this.drawChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart);
    this.getCumulativeBlock();
  },
  watch: {
    selector() {
      this.getCumulativeBlock();
    },
    theme() {
      this.drawChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.block-reward-chart {
  background: var(--board-bg-color);
  border-radius: 8px;
  box-shadow: 0px 1px 7px 9px rgba(0, 0, 0, 0.03);
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
