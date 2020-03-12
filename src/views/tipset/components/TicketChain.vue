<template>
  <div class="ticket-chain">
    <div :class="`chart-con  ${ layoutClass }`">
      <GeneralTitle :title="$t('tipset.label')" detail=""/>
      <div class="chart-scroll-wrap">
        <div
          class="chart"
          ref="chart"
          v-loading="loading"
          element-loading-background="transparent"
        ></div>
      </div>
      <div class="block-type" :style="typeStyle">
        <span class="arrow left" @click="goLeft" v-if="!atIndex && !isMobile">
          <span class="el-icon-arrow-left"></span>Previous Block
        </span>
        <span @click="goRight" class="arrow right" v-if="!atIndex && !isMobile">
          <!-- <img src="@/assets/image/icons/right.png" alt /> -->
          Next Block<span class="el-icon-arrow-right"></span>
        </span>
        <div class="type-list">
          <span>
            <i class="null"></i>
            {{ $t("tipset.blockType")[0] }}
          </span>
          <span>
            <i class="ticket"></i>
            {{ $t("tipset.blockType")[1] }}
          </span>
          <span>
            <i class="normal"></i>
            {{ $t("tipset.blockType")[2] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBlockByCid, getTipset } from "@/api/tipset";
import { getLatestBlock } from "@/api/home";
import { getBlockCoord } from "../tool";
import { mapState } from "vuex";
import Null from "@/assets/image/block/null.png";
import Ticket from "@/assets/image/block/ticket.png";
import Normal from "@/assets/image/block/normal.png";
import Active from "@/assets/image/block/active.png";
import NormalDark from "@/assets/image/block/normal-dark.png";
import NullDark from "@/assets/image/block/null-dark.png";
import GeneralTitle from "../../../components/GeneralTitle";
let chart;
export default {
  name: "TipsetChain",
  components: {
    GeneralTitle
  },
  data() {
    return {
      tipsets: [],
      startHeight: 0,
      hashList: [],
      loading: false,
      typeStyle: {},
      jumpSafeHeight: 0
    };
  },
  props: {
    hash: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    layoutClass() {
      return this.atIndex ? '' : 'chart-con-width-nav';
    },
    ...mapState(["defaultHeight"]),
    normalSrc() {
      return this.theme === "light" ? Normal : NormalDark;
    },
    ticketSrc() {
      return this.theme === "light" ? Ticket : Active;
    },
    activeSrc() {
      return this.theme === "light" ? Active : Ticket;
    },
    nullSrc() {
      return this.theme === "light" ? Null : NullDark;
    }
  },
  watch: {
    height(v) {
      if ((v <= this.startHeight && v > this.startHeight - 15) || v == 0) {
        this.drawChart();
      } else {
        this.getTipset(v);
      }
    },
    async hash(v) {
      if (!v) {
        return;
      }
      if (this.hashList.includes(v)) {
        this.drawChart();
      } else {
        //for parent hash click
        let data = await getBlockByCid({
          cid: this.$route.query.hash
        });
        const height = data.blocks[0].block_header.height;
        this.getTipset(height);
      }
    },
    defaultHeight: {
      handler(h) {
        const { height, hash, jumpHeight } = this.$route.query;
        if ((height || hash || jumpHeight) && !this.atIndex) {
          return;
        }
        if (h != 0) {
          this.startHeight = h;
          this.getTipset(h);
        }
      }
    },
    theme() {
      this.drawChart();
    }
  },
  async mounted() {
    chart = this.$chart.init(this.$refs.chart);
    const height = this.height;
    let currentHeight;
    if (height) {
      currentHeight = height;
    } else if (this.hash) {
      let data = await getBlockByCid({
        cid: this.$route.query.hash
      });
      const height = data.blocks[0].block_header.height;
      currentHeight = height;
    } else {
      let data = await getLatestBlock(1);
      const height = data.block_header[0].block_header.height;
      currentHeight = height;
      this.jumpSafeHeight = height;
    }
    this.getTipset(currentHeight);
    chart.on("click", e => {
      if (e.data.originData) {
        this.$emit("hash-change", e.data.originData.cid);
      }
      if (e.componentType === "markLine") {
        this.$emit("height-change", String(this.startHeight - e.value));
      }
    });
  },
  methods: {
    async getTipset(height) {
      if (height == 0) {
        return;
      }
      if (height < 15) {
        height = 15;
      }
      try {
        this.loading = true;
        const res = await getTipset({
          end_height: height,
          count: 15
        });
        this.loading = false;
        let blocks = [];
        const reverse = res.tipsets.reverse();
        reverse.forEach(item => {
          if (item.tipset.length > 0) {
            blocks = blocks.concat(item.tipset);
          }
        });
        blocks = blocks.map(item => {
          const { size, cid, reward, block_header, msg_cids } = item;
          const {
            timestamp,
            height,
            miner,
            parent_weight,
            tickets,
            parents,
            parent_state_root
          } = block_header;

          return {
            height: this.formatNumber(height),
            hash: cid,
            timestamp: this.formatTime(timestamp),
            utcTime: this.getFormatTime(timestamp),
            size: this.formatNumber(size),
            mesLength: msg_cids.length,
            miner,
            reward,
            parents,
            parent_weight: this.formatNumber(parent_weight),
            tickets,
            state_root: parent_state_root
          };
        });
        const hashList = blocks.map(item => {
          return item.hash;
        });
        this.hashList = hashList;
        this.startHeight = height;
        this.tipsets = Object.freeze(reverse);
        this.$emit("get-blocks", blocks);
        this.drawChart();
      } catch (e) {
        this.loading = false;
      }
    },
    drawChart() {
      const height = this.height;
      const rate = this.rate;
      const {
        ticketNode,
        otherNode,
        link,
        seriesMarkLine,
        seriesMarkLineLabel,
        markArea,
        markAreaBorder,
        markAreaActiveBorder
      } = this.chartTheme.tipset;
      this.tipsets.forEach((item, index) => {
        item.tipset = getBlockCoord(item.tipset, index, item.min_ticket_block);
      }); //get coords
      const nodeList = this.tipsets.reduce((pre, cur) => {
        const coords = cur.tipset.map((item, index) => {
          if (!item.cid) {
            return {
              value: item.coord,
              symbol: `image://${this.nullSrc}`,
              symbolSize: [56 * rate, 17 * rate],
              isTicket: false,
              label: {
                show: false
              }
            };
          }
          const formatName = item.block_header.miner;
          let symbol;
          if (item.cid === this.hash) {
            symbol = `image://${this.activeSrc}`;
          } else if (index === 0) {
            symbol = `image://${this.ticketSrc}`;
          } else {
            symbol = `image://${this.normalSrc}`;
          }
          return {
            name: item.cid,
            originData: item,
            value: item.coord,
            symbol: symbol,
            symbolSize: [56 * rate, 17 * rate],
            symbolOffset: [10 * rate, 0],
            isTicket: index === 0,
            label: {
              color:
                index === 0 || item.cid === this.hash ? ticketNode : otherNode,
              formatter() {
                return formatName;
              },
              fontSize: 12 * rate
            }
          };
        });
        return pre.concat(coords);
      }, []); //generate echarts nodes
      const linkList = nodeList
        .map((item, index) => {
          if (!item.isTicket) {
            return null;
          }
          return index;
        })
        .filter(item => {
          return item !== null;
        })
        .map((item, index, arr) => {
          return {
            source: item,
            target: arr[index + 1],
            index: index,
            height: nodeList[item].originData.block_header.height,
            isNull: nodeList[item].isNull,
            blockCount: nodeList[item].originData.blockCount,
            x: nodeList[item].originData.coord[0],
            label: {
              normal: {
                show: false
              }
            },
            lineStyle: {
              normal: {
                color: link
              }
            }
          };
        }); //lines
      const startHeight = this.startHeight;

      //Change the height of a graph according to the number of blocks
      const maxCount = linkList
        .map(item => {
          return item.blockCount;
        })
        .sort((a, b) => a - b)
        .reverse()[0];
      this.typeStyle = {
        marginTop: `${maxCount * 1.25 - 12.5}rem`
      };
      let lineList = [];
      const format = this.formatNumber;
      for (let i = 0; i < 15; i++) {
        lineList.push({
          xAxis: i,
          label: {
            show: true,
            formatter() {
              return format(startHeight - i);
            }
          }
        });
      }
      let areaData = [];
      linkList.forEach(item => {
        let borderColor = markAreaBorder,
          borderWidth = 1;

        if (height && startHeight - height == item.x) {
          borderColor = markAreaActiveBorder;
          borderWidth = 2;
        }
        areaData.push([
          {
            coord: [item.x - 0.2, (item.blockCount + 1) * 5],
            itemStyle: {
              borderColor,
              borderWidth
            }
          },
          {
            coord: [item.x + 0.376, 1]
          }
          ]);
      });
      var option = {
        xAxis: {
          show: false,
          boundaryGap: false,
          min: -1,
          max: 15,
          axisLine: {
            show: false
          },
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          min: 0,
          max: 70,
          show: false,
          type: "value",
          inverse: true
        },
        grid: {
          top: 40 * rate,
          left: -40,
          right: 0,
          bottom: 0
        },
        series: [
          {
            type: "graph",
            layout: "none",
            id: "a",
            coordinateSystem: "cartesian2d",
            edgeSymbol: ["", "arrow"],
            label: {
              show: true,
              position: "inside"
            },
            lineStyle: {
              normal: {
                width: 2,
                shadowColor: "none"
              }
            },
            markLine: {
              symbol: ["none", "none"],
              silent: false,
              lineStyle: {
                color: seriesMarkLine,
                width: 1,
                type: "solid"
              },
              data: lineList,
              label: {
                position: "start",
                color: seriesMarkLineLabel,
                fontSize: 12 * rate
              }
            },
            markArea: {
              data: areaData,
              itemStyle: {
                color: markArea,
                borderColor: markAreaBorder,
                borderWidth: 1,
                borderType: "dotted"
              }
            },
            data: nodeList,
            links: linkList,
            z: 0,
            zlevel: 4
          }
        ]
      };
      chart.setOption(option);
    },
    async goRight() {
      let jumpHeight = Math.max(this.startHeight - 15, 15);
      await this.getTipset(jumpHeight);
      this.goTo("tipset", {
        query: {
          jumpHeight
        }
      });
    },
    async goLeft() {
      let jumpHeight = 0;
      if (this.startHeight === this.jumpSafeHeight) {
        return;
      }
      if (this.jumpSafeHeight === 0) {
        let data = await getLatestBlock(1);
        this.jumpSafeHeight = Number(data.block_header[0].block_header.height);
      }
      if (Number(this.startHeight) + 15 >= this.jumpSafeHeight) {
        jumpHeight = this.jumpSafeHeight;
      } else {
        jumpHeight = Number(this.startHeight) + 15;
      }
      await this.getTipset(jumpHeight);
      this.goTo("tipset", {
        query: {
          jumpHeight: jumpHeight
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ticket-chain {
  $canvas-height: 10rem;
  @include panel;

  max-width: 100%;
  display: flex;
  position: relative;
  padding-top: 0;
  margin-bottom: 0;

  .block-title {
    @include chartInfo(red, 768px);
  }

  .chart-con {
    width: 100%;
    padding-bottom: 2 * $vertical-space;
    &.chart-con-width-nav  {
      padding-bottom: 3 * $vertical-space;
    }


    .chart-scroll-wrap {
      width: inherit;
      max-width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      height: $canvas-height;
      padding-bottom: 2 * $vertical-space;
      // Start scroll from right
      direction:rtl;

      .chart {
        // height/width must be defined for chart rendering.
        width: 120rem;
        height: $canvas-height + 4rem;
      }
    }
  }

  .block-type {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $horizontal-space $vertical-space;
    width: inherit;
    z-index: 10;

    .arrow {
      display: inline-block;
      color: var(--main-text-color);
      cursor: pointer;
      line-height: 2rem;
      position: absolute;
      bottom: $vertical-space;

      // Icon prev/next size.
      [class^='el-icon-']:before {
        font-size: 2rem;
        font-weight: bold;
        vertical-align: middle;
      }
      &.left {
        left: $horizontal-space;
      }
      &.right {
        right: $horizontal-space;
      }
    }
  }

  .block-type div.type-list {
    width: 100%;
    text-align: center;
    color: var(--main-text-color);
    span {
      margin-left: $horizontal-space / 2;
    }
    vertical-align: middle;

    i {
      display: inline-block;
      width: .625rem;
      height: .625rem;
      border-radius: 50%;
      margin-right: .3rem;
      &.null {
        background: var(--null-block-bg-color);
      }
      &.ticket {
        background: var(--ticket-block-bg-color);
      }
      &.normal {
        border: 1px solid var(--other-block-border-color);
        width: .625rem;
        height: .625rem;
      }
    }
  }
}
</style>
