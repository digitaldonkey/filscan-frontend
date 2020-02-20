<template>
  <div class="message-detail bottom-10">
    <overview
      :dataList="dataList"
      :dataLabel="$t('message.detail.overview')"
      :showLoading="loading"
    />
  </div>
</template>
<script>
import { getBlockConfirmCount, getMessageDetail } from "@/api/message";
export default {
  name: "MessageDetail",
  data() {
    return {
      cid: "",
      loading: false,
      dataList: [
        {
          key: "cid",
          style: {
            fontWeight: "bold"
          }
        },
        {
          key: "height",
          isLink: true,
          target: "tipset",
          isComponent: true
        },
        {
          key: "blockHash",
          isLink: true,
          target: "tipset",
          paramKey: "hash"
        },
        {
          key: "time"
        },
        {
          key: "from",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "to",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "value",
          unit: "FIL"
        },
        // {
        //   key: "fee",
        //   unit: "FIL"
        // },
        {
          key: "code"
        },
        {
          key: "method"
        },
        {
          key: "nonce"
        },
        {
          key: "params",
          isComponent: true
        }
      ],
      title: {
        label: "Message",
        detail: `# ${this.$route.query.cid}`
      }
    };
  },
  methods: {
    async getMessageDetail() {
      try {
        this.loading = true;
        let data = await getMessageDetail({
          msg_cid: this.cid
        });
        const {
          height,
          cid,
          msgcreate,
          msg,
          block_cid,
          method_name,
          exit_code
        } = data.msg;
        const { from, to, nonce, params, value, gaslimit } = msg;
        let blockRes = await getBlockConfirmCount({
          cid: block_cid
        });

        const paramTip = this.$t("message.detail.paramTip");
        const confirm = this.$t("message.detail.confirm");
        const sourceMap = {
          height: this.formatNumber(height),
          cid,
          confirm: this.formatNumber(blockRes.count),
          time: this.getFormatTime(msgcreate),
          from,
          to,
          method: method_name,
          nonce,
          params: params.length > 256 ? `${params.slice(0, 256)} ...` : params,
          value,
          fee: this.formatNumber(gaslimit),
          blockHash: block_cid,
          code: exit_code
        };

        this.dataList = this.dataList.map(item => {
          let linkList;
          if (item.isLink) {
            linkList = [sourceMap[item.key]];
          } else {
            linkList = sourceMap[item.key];
          }
          let res = {
            ...item,
            value: sourceMap[item.key],
            linkList
          };
          if (item.key === "height") {
            res.component = {
              render() {
                return (
                  <div class="height-link">
                    <a href={`./#/tipset?height=${res.value}`}>
                      {sourceMap.height}
                    </a>
                    <span>
                      {" "}
                      ({sourceMap.confirm} {confirm})
                    </span>
                  </div>
                );
              }
            };
          }
          if (item.key === "params") {
            res.component = {
              render() {
                return (
                  <div class="top-10 params-con">
                    <el-popover
                      placement="bottom-start"
                      width="200"
                      trigger="hover"
                      content={paramTip}
                    >
                      <i class="el-icon-warning-outline" slot="reference"></i>
                    </el-popover>
                    <span class="params-value">{sourceMap[item.key]}</span>
                  </div>
                );
              }
            };
          }
          return res;
        });
        this.loading = false;
      } catch (e) {
        if (e) {
          this.loading = false;
        }
      }
    }
  },
  watch: {
    cid: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getMessageDetail();
        }
      }
    }
  },
  mounted() {
    this.cid = this.$route.query.cid;
  }
};
</script>
<style lang="scss" scoped>
.message-detail {
  & ::v-deep .height-link {
    width: 100%;
    display: flex;
    align-items: center;
    a {
      color: var(--link-color);
      margin-right: 5px;
    }
  }
  & ::v-deep .params-con {
    margin-right: 10px;
    .params-value {
      line-height: 1.5;
      word-break: break-all;
      margin-left: 3px;
    }
  }
}
</style>
