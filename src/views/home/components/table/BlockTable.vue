<template>
  <div class="block-table">
    <base-table
      :dataSource="blockTable.dataSource"
      :columns="blockTable.columns"
      :loadMore="true"
      @load="loadBlockData"
      :showLoading="blockTable.loading"
      :showAppend="blockTable.append && !isMobile"
      @click-append="goTo('tipset')"
      :span-map="blockTable.heightMap"
      :span="blockTable.span"
      :max-height="isMobile ? 200 : 400 * rate"
      :labels="$t('home.blockTable.label')"
      radius
      :stripe="false"
    ></base-table>
  </div>
</template>
<script>
import { getLatestBlock } from "@/api/home";
import { mapState } from "vuex";
export default {
  name: "BlockTable",
  data() {
    return {
      blockTable: {
        dataSource: [],
        span: true,
        columns: [
          {
            key: "height",
            isLink: true,
            target: "tipset"
          },
          {
            key: "hash",
            isLink: true,
            target: "tipset",
            ellipsis: true
          },
          {
            key: "time"
          },
          {
            key: "miner",
            isLink: true,
            target: "address/detail",
            paramKey: "address"
          },
          {
            key: "reward",
            unit: "FIL"
          }
        ],
        loadCount: 0,
        loading: false,
        append: false,
        heightMap: {},
        timer: null
      }
    };
  },
  methods: {
    initBlockTimer() {
      this.blockTable.timer = setInterval(() => {
        this.blockTable.heightMap = {};
        const heightMap = {};
        this.blockTable.dataSource = this.blockTable.dataSource.map(
          (item, index) => {
            if (heightMap[item.height]) {
              heightMap[item.height].span++;
            } else {
              heightMap[item.height] = {
                span: 1,
                index: index
              };
            } //表头合并
            return {
              ...item,
              time: this.formatTime(item.originTime, item.current),
              current: item.current + 1000
            };
          }
        );
        Object.values(heightMap).forEach(item => {
          this.blockTable.heightMap[item.index] = item.span;
        });
      }, 1000);
    },
    async getBlockData(num) {
      if (num > 30) {
        return;
      }
      this.blockTable.heightMap = {};
      this.blockTable.loading = true;
      this.blockTable.span = false;
      try {
        const data = await getLatestBlock(num);
        const heightMap = {};
        const dataSource = data.block_header.map((item, index) => {
          const { height, miner, timestamp } = item.block_header;
          if (heightMap[height]) {
            heightMap[height].span++;
          } else {
            heightMap[height] = {
              span: 1,
              index
            };
          } //表头合并
          const current = new Date().getTime();
          const realTime =
            timestamp > current / 1000 ? current / 1000 : timestamp;
          return {
            height: this.formatNumber(height),
            hash: item.cid,
            time: this.formatTime(realTime),
            originTime: realTime,
            miner: miner,
            reward: Number(item.reward).toFixed(5),
            current: current
          };
        });
        this.blockTable.dataSource = dataSource;
        Object.values(heightMap).forEach(item => {
          this.blockTable.heightMap[item.index] = item.span;
        });
        this.blockTable.loading = false;
        this.blockTable.span = true;
        return Promise.resolve();
      } catch (e) {
        this.blockTable.loading = false;
      }
    },
    async loadBlockData() {
      if (this.blockTable.loading) {
        return;
      }
      if (this.blockTable.loadCount == 3) {
        this.blockTable.append = true;
        return;
      } else {
        clearInterval(this.blockTable.timer);
        try {
          this.blockTable.loading = true;
          await this.getBlockData(10 * (this.blockTable.loadCount + 1));
          this.blockTable.loadCount++;
          this.blockTable.loading = false;
          this.initBlockTimer();
        } catch (e) {
          this.blockTable.loading = false;
        }
      }
    }
  },
  watch: {
    async latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      clearInterval(this.blockTable.timer);
      await this.getBlockData(this.blockTable.loadCount * 10);
      this.initBlockTimer();
    }
  },
  beforeDestroy() {
    clearInterval(this.blockTable.timer);
  },
  computed: {
    ...mapState(["rate"])
  }
};
</script>
<style lang="scss" scoped>
.block-miner-table {
  display: flex;
  & > div {
    flex: 1;
    max-width: 50%;
    background: var(--main-bg-color);
  }
  & > div:first-child {
    margin-right: 10px;
  }
  .table-title {
    padding: 15px;
    background: var(--main-bg-color);
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    img {
      width: 20px;
      margin-right: 15px;
    }
  }
}
</style>
