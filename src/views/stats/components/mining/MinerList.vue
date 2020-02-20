<template>
  <div class="miner-list">
    <div class="title bottom-10">{{ $t("stats.mining.minerList.title") }}</div>
    <time-selector
      @time-select="handleTimeChange"
      :activeIndex.sync="activeIndex"
    >
      <el-input
        :placeholder="$t('stats.mining.minerList.placeholder')"
        slot="left"
        @keyup.native="handleSearch"
        v-model="key"
        clearable
        :suffix-icon="searchLoading ? 'el-icon-loading' : ''"
        @clear="handleClear"
        :class="['search', theme === 'light' ? 'light' : 'dark']"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click.native="handleSearch"
        ></el-button>
      </el-input>
    </time-selector>
    <base-table
      :dataSource="dataSource"
      :columns="columns"
      :labels="$t('stats.mining.minerList.label')"
      :expand="!isMobile"
      :total="total"
      :showLoading="loading"
      showPagination
      @size-change="handleSizeChange"
      @page-change="handlePageChange"
      @sort-change="handleSortChange"
      :defaultSort="{ prop: 'block', order: 'descending' }"
    ></base-table>
  </div>
</template>
<script>
import { searchMiner, getMinerList } from "@/api/stats";
export default {
  name: "MinerList",
  data() {
    return {
      dataSource: [],
      columns: [
        {
          key: "miner",
          isLink: true,
          ellipsis: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "pid",
          isLink: true,
          ellipsis: true,
          target: "stats/peer",
          paramKey: "peer_id"
        },
        {
          key: "power",
          sortable: true
        },
        {
          key: "prate"
        },
        {
          key: "block",
          sortable: true
        },
        {
          key: "brate"
        }
      ],
      offset: 0,
      limit: 25,
      total: 0,
      loading: false,
      searchLoading: false,
      sortKey: "block",
      sortType: -1,
      key: "",
      start: null,
      activeIndex: 4
    };
  },
  mounted() {
    this.start = 0;
    this.getSortedMiner(0);
  },
  methods: {
    handleSizeChange(v) {
      this.limit = v;
    },
    handlePageChange(v) {
      this.offset = (v - 1) * this.limit;
    },
    async getSortedMiner(time_start) {
      try {
        this.loading = true;
        const dataLabel = this.$t("stats.mining.minerList.detail");
        let res;
        if (time_start == undefined) {
          time_start = this.now - 86400;
        }
        let param = {
          time_end: this.now,
          time_start,
          offset: this.offset,
          limit: this.limit,
          sort: this.sortKey,
          sort_type: this.sortType
        };
        res = await getMinerList(param);
        this.loading = false;
        this.total = Number(res.mienr_count);
        const dataSource = res.miners.map((item, index) => {
          const {
            increased_power,
            increased_block,
            power_percent,
            block_percent,
            peer_id,
            miner
          } = item;
          return {
            miner,
            pid: peer_id,
            power: this.unitConversion(increased_power),
            block: increased_block || "",
            brate: block_percent,
            prate: power_percent,
            index,
            dataList: [
              {
                value: peer_id
              },
              { value: "" },
              { value: "" }
            ],
            dataLabel: dataLabel
          };
        });
        this.dataSource = Object.freeze(dataSource);
      } catch (e) {
        this.loading = false;
      }
    },
    async searchMiner() {
      try {
        const dataLabel = this.$t("stats.mining.minerList.detail");
        this.searchLoading = true;
        let res = await searchMiner({
          miner: this.key
        });
        this.searchLoading = false;
        if (!res.miners) {
          this.dataSource = [];
          this.total = 0;
          return;
        }
        this.dataSource = res.miners.map(item => {
          const {
            increased_power,
            increased_block,
            power_percent,
            block_percent,
            peer_id,
            miner
          } = item;
          return {
            miner,
            pid: peer_id,
            power: this.unitConversion(increased_power),
            block: increased_block || "",
            brate: block_percent,
            prate: power_percent,
            dataList: [
              {
                value: peer_id
              },
              { value: "" },
              { value: "" }
            ],
            dataLabel: dataLabel
          };
        });
        this.total = 1;
      } catch (e) {
        this.searchLoading = false;
      }
    },
    handleTimeChange(v) {
      this.offset = 0;
      this.limit = 25;
      this.start = v.time_start;
    },
    handleSearch(e) {
      /* eslint-disable */
      this.key = this.key.replace(/[^0-9a-zA-Z]/g, "");
      if ((e.type === "keyup" && e.keyCode !== 13) || !this.key) {
        return;
      }
      this.searchMiner();
    },
    handleClear() {
      this.getSortedMiner();
    },
    handleSortChange(p) {
      const { prop, order } = p;
      this.sortKey = prop;
      this.sortType = order === "descending" ? -1 : 1;
    }
  },
  watch: {
    offset() {
      this.getSortedMiner(this.start);
    },
    limit() {
      this.getSortedMiner(this.start);
    },
    start(v) {
      this.getSortedMiner(v);
    },
    sortKey() {
      this.getSortedMiner(this.start);
    },
    sortType() {
      this.getSortedMiner(this.start);
    }
  }
};
</script>
<style lang="scss" scoped>
.miner-list {
  background: var(--board-bg-color);
  .title {
    padding-left: 30px;
    font-weight: bold;
    padding-top: 20px;
    font-size: 20px;
    color: var(--main-text-color);
  }
  & ::v-deep .el-input.search {
    width: 400px;
    input {
      background: var(--board-bg-color);
      color: var(--main-text-color);
    }
    .el-input-group__append {
      background: var(--board-bg-color) !important;
      color: var(--main-text-color) !important;
    }
    &.dark input {
      background: var(--main-bg-color);
      border-color: transparent;
      border-right-color: var(--board-bg-color)

    }
    &.dark .el-input-group__append {
      background: var(--main-bg-color) !important;
      border-color: transparent;
    }
  }
  @media (max-width: 768px) {
    & ::v-deep .el-table {
      .cell {
        height: 20px !important;
        line-height: 20px !important;
        font-size: 12px;
      }
      .el-table__expand-icon i {
        font-size: 12px;
        line-height: 20px !important;
      }
    }
    & ::v-deep .el-input.search input {
      font-size: 12px;
      height: 20px;
      width: 45vw;
      border-radius: 4px;
    }
  }
}
</style>
