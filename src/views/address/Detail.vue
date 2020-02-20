<template>
  <div class="address-detail bottom-10">
    <overview
      :dataList="dataList"
      :dataLabel="$t('address.detail.overview')"
      class="bottom-20"
    />
    <div class="worker-list bottom-20" v-if="workers.length">
      <span>{{ $t("address.detail.worker") }}</span>
      <span>
        <base-link
          v-for="link in workers"
          :key="link"
          :label="link"
          target="address/detail"
          :param="{
            key: 'address',
            value: link
          }"
        ></base-link>
      </span>
    </div>
    <overview
      :dataList="accountList"
      :dataLabel="$t('address.detail.ownerOverview')"
      class="bottom-20"
      v-if="isMiner"
    />
    <el-radio-group
      v-model="showMessage"
      style="margin-bottom: 20px;"
      v-if="isMiner || workers.length"
    >
      <el-radio-button :label="true">
        {{ $t("address.radio")[0] }}
      </el-radio-button>
      <el-radio-button :label="false">
        {{ $t("address.radio")[1] }}
      </el-radio-button>
    </el-radio-group>
    <message-list
      v-if="showMessage"
      :address="$route.query.address"
      type="address"
    />
    <block-list v-else :miners="address" />
  </div>
</template>
<script>
import { getActorById } from "@/api/account";
import mixin from "./mixin";
export default {
  name: "AddressDetail",
  mixins: [mixin],
  data() {
    return {
      showMessage: true,
      isMiner: false,
      isOwner: false,
      messageData: [],
      address: "",
      workers: [],
      dataList: [
        {
          key: "address"
        },
        {
          key: "type"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "code"
        },
        {
          key: "nonce"
        }
      ],
      accountList: [
        {
          key: "owner_address",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "peer_id",
          isLink: true,
          target: "stats/peer"
        },
        {
          key: "power"
        },
        {
          key: "sector_size",
          unit: "bytes"
        },
        {
          key: "sector_num"
        },
        {
          key: "proving_sector_num"
        },
        {
          key: "fault_num"
        }
      ]
    };
  },
  watch: {
    "$route.query.address": {
      immediate: true,
      handler(v) {
        if (!v) {
          return;
        }
        this.address = [v];
        this.getAddressInfo(v);
      }
    }
  },
  methods: {
    async getAddressInfo(a) {
      try {
        let res = await getActorById({
          actor_id: a
        });
        const detail = this.parseAddress(res.data);
        this.dataList = this.dataList.map(item => {
          return {
            ...item,
            value: detail[item.key]
          };
        });
        this.workers = res.work_list;
        if (res.data.is_miner && res.miner.owner_address != "") {
          this.isMiner = true;
        } else {
          this.isMiner = false;
        }
        if (res.work_list.length) {
          this.address = res.work_list;
        }
        this.accountList = this.accountList.map(item => {
          let linkList;
          const originValue = res.miner[item.key];
          if (item.key === "owner_address" || item.key === "peer_id") {
            linkList = [originValue];
          } else {
            linkList = originValue;
          }
          const isNumber = parseFloat(originValue) == originValue;
          let result = {
            ...item,
            value: isNumber ? this.formatNumber(originValue, 18) : originValue,
            linkList: linkList
          };
          if (item.key === "power") {
            result.value = `${originValue} bytes (${this.unitConversion(
              originValue
            )})`;
          }
          return result;
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.address-detail {
  & ::v-deep .el-radio-group label {
    display: inline-block;
    width: 150px;
    span {
      width: 100%;
    }
  }
  .worker-list {
    min-height: 60px;
    display: flex;
    background: var(--board-bg-color);
    box-shadow: 0px 1px 5px 7px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    color: var(--main-text-color);
    span {
      line-height: 60px;
    }
    span:first-child {
      padding-left: 100px;
      min-width: 200px;
    }
    span:last-child {
      flex: 1;
      word-break: break-all;
    }
    & ::v-deep a span {
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    .worker-list {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
      border-radius: 4px;
      margin: 10px 0;
      span {
        height: 30px;
        line-height: 30px;
        &:first-child {
          margin-right: 10px;
        }
        a {
          margin-right: 5px;
        }
      }
    }
    & ::v-deep .el-radio-group {
      display: flex !important;
      border-radius: 4px !important;
      label {
        flex: 1;
        height: 30px !important;
        &:first-child span {
          border-radius: 4px 0 0 4px;
        }
        &:last-child span {
          border-radius: 0 4px 4px 0;
        }
        span {
          height: 100% !important;
          line-height: 30px !important;
          padding: 0;
        }
      }
    }
    & ::v-deep > div:nth-child(2).general-overview {
      margin: 10px 0 !important;
    }
  }
}
</style>
