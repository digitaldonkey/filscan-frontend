<template>
  <div
    class="address-con bottom-10"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="total-number border-bottom">
      <span
        v-html="
          $t('address.list.total', {
            num: formatNumber(total),
            filNum: filNum
          })
        "
      ></span>
    </div>
    <div class="address-list" v-if="!isMobile">
      <div class="table-con">
        <base-table
          :dataSource="addressData"
          :columns="columns"
          showPagination
          :total="total"
          @size-change="handleSizeChange"
          @page-change="handlePageChange"
          :labels="$t('address.list.label')"
        ></base-table>
      </div>
    </div>
    <mb-board
      v-for="item in addressData"
      :key="item.cid"
      :dataSource="item"
      :columns="mbColumns"
      v-else
    />
    <mb-page v-if="isMobile" @page-change="handlePageChange" :total="total" />
  </div>
</template>
<script>
import { getAccountList } from "@/api/account";
import mixin from "./mixin";
export default {
  name: "AddressList",
  mixins: [mixin],
  data() {
    return {
      addressData: [],
      loading: false,
      total: 0,
      filNum: 0,
      columns: [
        {
          key: "address",
          isLink: true,
          target: "address/detail"
        },
        {
          key: "type"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "mes"
        }
      ],
      option: {
        begindex: "0",
        count: "25"
      }
    };
  },
  methods: {
    handleSizeChange(v) {
      this.option.count = v;
    },
    handlePageChange(v) {
      this.option.begindex = (v - 1) * this.option.count;
    },
    async getAddressList() {
      this.loading = true;
      try {
        let res = await getAccountList(this.option);
        this.loading = false;
        const { total, total_fil, accounts } = res;
        const data = accounts.map(item => {
          const detail = this.parseAddress(item);
          return {
            ...detail,
            mes: this.formatNumber(item.Messages)
          };
        });
        this.total = Number(total);
        this.filNum = Number(total_fil);
        this.addressData = Object.freeze(data);
      } catch (e) {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getAddressList();
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.getAddressList();
      }
    }
  },
  computed: {
    mbColumns() {
      const labels = this.$t("address.list.label");
      return this.columns.map((item, index) => {
        return {
          ...item,
          title: labels[index]
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.address-con {
  .total-number {
    height: 80px;
    align-items: center;
    padding: 0 56px;
    display: flex;
    background: var(--board-bg-color);
    color: var(--main-text-color);
    & ::v-deep > span {
      margin-right: auto;
      i {
        color: var(--link-color);
        font-size: 22px;
      }
    }
  }
  & ::v-deep .el-table {
    height: calc(100vh - 300px) !important;
  }
  @media (max-width: 768px) {
    .total-number {
      height: 30px;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    min-height: calc(100vh - 90px);
  }
}
</style>
