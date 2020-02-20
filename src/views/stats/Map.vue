<template>
  <div class="node-map bottom-10">
    <div
      ref="chart"
      class="chart-con"
      v-loading="loading"
      element-loading-background="var(--board-bg-color)"
    ></div>
  </div>
</template>
<script>
import { getMapData } from "@/api/stats";
let chart;
export default {
  name: "NodeMap",
  data() {
    return {
      loading: false,
      points: [],
      timer: null
    };
  },
  methods: {
    drawNodeMap(zoom) {
      const data = this.points;
      const { bg, scatter, geo, tooltip } = this.chartTheme.map;
      const { item, border, emphasis } = geo;
      let symbolSize = 4;
      if (zoom > 50) {
        symbolSize = 10;
      }
      const vm = this;
      var series = [];
      series.push({
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        blendMode: "lighter",
        symbol: "circle",
        symbolSize: symbolSize,
        itemStyle: {
          normal: {
            show: false,
            color: scatter
          }
        },
        data: data,
        large: true
      });
      series[0].data = series[0].data.slice(0, 3000);
      chart.setOption({
        backgroundColor: bg,
        tooltip: {
          trigger: "item",
          backgroundColor: tooltip,
          showDelay: 0,
          hideDelay: 300,
          enterable: true,
          formatter: function(params) {
            const { name, pid, ip } = params.data;
            return vm.$t("chart.map", { name, pid, ip });
          }
        },
        geo: {
          map: "world",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          layoutCenter: ["50%", "50%"],
          layoutSize: "180%",
          scaleLimit: {
            min: 1,
            max: 150
          },
          itemStyle: {
            normal: {
              color: item,
              borderColor: border
            },
            emphasis: {
              color: emphasis
            }
          },
          animation: false
        },
        animation: false,
        series: series
      });
    },
    getRandom() {
      const pi = Math.PI;
      let theta = Math.random() * 2 * pi;
      let radius = 20 * Math.random();
      const x = radius * Math.sin(theta);
      const y = radius * Math.cos(theta);
      return {
        x: x / 100,
        y: y / 100
      };
    },
    async getMapData() {
      try {
        this.loading = true;
        let res = await getMapData();
        const points = [];
        this.loading = false;
        res.peer_point.forEach(item => {
          const len = item.peers.length;
          item.peers.forEach(peer => {
            const { x, y } = this.getRandom();
            const value =
              len === 1
                ? [item.longitude, item.latitude, 10]
                : [item.longitude + x, item.latitude + y, 10];
            points.push({
              name: item.location_en,
              value,
              pid: peer.peer_id,
              ip: peer.ip
            });
          });
        });
        this.points = Object.freeze(points);
        this.drawNodeMap();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.chart);
    chart.on("georoam", () => {
      clearTimeout(this.timer);
      const zoom = chart.getOption().geo[0].zoom;
      this.timer = setTimeout(() => {
        this.drawNodeMap(zoom);
      }, 100);
    });
    this.getMapData();
  },
  watch: {
    theme() {
      this.drawNodeMap();
    }
  }
};
</script>
<style lang="scss" scoped>
.node-map {
  height: calc(100vh - 200px);
  position: relative;
  .chart-con {
    width: 100%;
    height: 100%;
    background: var(--board-bg-color);
  }
  @media (max-width: 768px) {
    .chart-con {
    }
  }
}
</style>
