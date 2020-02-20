<template>
  <div class="message-table">
    <base-table
      :dataSource="messageTable.dataSource"
      :columns="messageTable.columns"
      :loadMore="true"
      @load="loadMessageData"
      :showLoading="messageTable.loading"
      :showAppend="messageTable.append && !isMobile"
      :max-height="isMobile ? 200 : 400 * rate"
      @click-append="goTo('messageList')"
      :labels="$t('home.messageTable.label')"
      radius
    ></base-table>
  </div>
</template>
<script>
import { getLatestMessage } from "@/api/home";
import { mapState } from "vuex";
export default {
  name: "MessageTable",
  data() {
    return {
      messageTable: {
        dataSource: [],
        columns: [
          {
            key: "id",
            target: "message/detail",
            paramKey: "cid",
            isLink: true,
            ellipsis: true
          },
          {
            key: "time"
          },
          {
            key: "from",
            isLink: true,
            target: "address/detail",
            paramKey: "address",
            ellipsis: true
          },
          {
            key: "to",
            isLink: true,
            target: "address/detail",
            paramKey: "address",
            ellipsis: true
          },
          {
            key: "value"
          }
        ],
        loadCount: 0,
        loading: false,
        append: false,
        timer: null
      }
    };
  },
  methods: {
    initMesTimer() {
      this.messageTable.timer = setInterval(() => {
        this.messageTable.dataSource = this.messageTable.dataSource.map(
          item => {
            return {
              ...item,
              time: this.formatTime(item.originTime, item.current),
              current: item.current + 1000
            };
          }
        );
      }, 1000);
    },
    async getMessageData(num) {
      if (num > 30) {
        return;
      }
      this.messageTable.loading = true;
      try {
        const data = await getLatestMessage(num);

        const dataSource = data.msg.map(item => {
          const { from, to, value } = item.msg;
          const current = new Date().getTime();
          const realTime =
            item.msgcreate > current / 1000 ? current / 1000 : item.msgcreate;
          return {
            from,
            to,
            value: this.formatFilNumber(value),
            time: this.formatTime(realTime),
            originTime: realTime,
            current: current,
            id: item.cid
          };
        });
        this.messageTable.dataSource = dataSource;
        this.messageTable.loading = false;
        return Promise.resolve();
      } catch (e) {
        this.messageTable.loading = false;
      }
    },
    async loadMessageData() {
      if (this.messageTable.loading) {
        return;
      }
      if (this.messageTable.loadCount == 3) {
        this.messageTable.append = true;
        return;
      } else {
        clearInterval(this.messageTable.timer);
        try {
          this.messageTable.loading = true;
          await this.getMessageData(10 * (this.messageTable.loadCount + 1));
          this.messageTable.loadCount++;
          this.messageTable.loading = false;
          this.initMesTimer();
        } catch (e) {
          if (e) {
            this.messageTable.loading = false;
          }
        }
      }
    }
  },
  watch: {
    async latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      clearInterval(this.messageTable.timer);
      await this.getMessageData(this.messageTable.loadCount * 10);
      this.initMesTimer();
    }
  },
  computed: {
    ...mapState(["rate"])
  },
  beforeDestroy() {
    clearInterval(this.messageTable.timer);
  }
};
</script>
<style lang="scss" scoped>
.message-table {
  div {
    background: var(--main-bg-color);
  }
}
</style>
