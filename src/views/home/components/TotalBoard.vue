<template>
  <div
    class="total-board"
    v-loading="loading"
    element-loading-background="transparent"
  >
    <div v-for="item in info" :key="item.key" class="info-item">
      <div class="info-item--label">
        {{ $t(`home.board.${item.labelKey}.label`) }}
        <el-popover
          placement="bottom-start"
          width="200"
          trigger="hover"
          :content="$t(`home.board.${item.labelKey}.tips`)"
          v-if="!isMobile"
        >
          <i
            class="el-icon-question"
            slot="reference"
            style="margin-left:3px"
          ></i>
        </el-popover>
      </div>
      <div class="info-item--value" v-show="!loading">{{ `${item.value || ""} ${item.unit}` }}</div>
    </div>
  </div>
</template>
<script>
import { getBoardInfo } from "@/api/home";
import { mapMutations } from "vuex";
export default {
  name: "TotalBoard",
  data() {
    return {
      info: [
        {
          labelKey: "height",
          key: "tipset_height",
          class: "blue",
          unit: ""
        },
        {
          labelKey: "reward",
          key: "block_reward",
          class: "blue",
          unit: "FIL"
        },
        {
          labelKey: "avgMsgTipset",
          key: "avg_messages_tipset",
          class: "purple",
          unit: ""
        },
        {
          labelKey: "avgGas",
          key: "avg_gas_price",
          class: "purple",
          unit: ""
        },
        {
          labelKey: "avgMsg",
          key: "avg_message_size",
          class: "yellow",
          unit: "bytes"
        },
        {
          labelKey: "pledge",
          key: "pledge_collateral",
          class: "yellow",
          unit: "FIL"
        }
      ],
      timer: null,
      loading: false
    };
  },
  async mounted() {
    this.loading = true;
    await this.getBoardInfo();
    this.loading = false;
    this.timer = setInterval(() => {
      this.getBoardInfo();
    }, 30000);
  },
  methods: {
    ...mapMutations(["setHeight", "increaseLoadCount"]),
    async getBoardInfo() {
      try {
        const info = await getBoardInfo();
        this.loading = false;
        info.avg_message_size = parseInt(info.avg_message_size);
        this.info = this.info.map(item => {
          return {
            ...item,
            value: this.formatNumber(
              item.key === "avg_gas_price"
                ? info[item.key].toFixed(2)
                : info[item.key]
            )
          };
        });
        this.setHeight(info.tipset_height);
        this.increaseLoadCount();
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.total-board {
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 980px) {
    flex-wrap: nowrap;
  }

  .info-item {
    @include panel;
    flex: 1;
    margin-right: $horizontal-space;
    margin-bottom: $vertical-space;
    min-width: 45%;
    &:nth-child(2n + 2) {
      margin-right: 0;
    }
    // 3 Items per Row
    @media (min-width: 500px) {
      min-width: 28%;
      &:nth-child(2n + 2) {
        margin-right: $horizontal-space;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    // 6 Items per row
    @media (min-width: 980px) {
      min-width: 15%;
      &:nth-child(2n + 2),
      &:nth-child(3n) {
        margin-right: $horizontal-space;
      }
      &:nth-child(6) {
        margin-right: 0;
      }
    }

    .info-item--label {
      text-align: center;
      color: var(--total-board-top-color);
      margin-bottom: 5px;
      font-weight: bold;
      padding-right: .75rem;

      @media (min-width: 500px) {
        font-size: .75rem;
        white-space: pre;
      }

      span {
        position: relative;
        i {
          position: absolute;
          top: 4px;
          font-size: .75rem;
        }
      }
    }

    .info-item--value {
      text-align: center;
      color: var(--total-board-bottom-color);
      font-size: 1.25rem;
      line-height: 1.8rem;
      @media (min-width: 500px) {
        font-size: 1rem;
      }
    }
  }
}
</style>
