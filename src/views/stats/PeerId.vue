<template>
  <div class="peer-id bottom-10">
    <overview
      :dataList="dataList"
      class="bottom-40"
      :dataLabel="$t('stats.peer.label')"
    />
  </div>
</template>
<script>
import { getPeerById } from "@/api/stats";
export default {
  name: "PeerId",
  data() {
    return {
      dataList: [
        {
          key: "peer_id",
          style: {
            fontWeight: "bold"
          }
        },
        {
          key: "miner_address",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "ip"
        },
        {
          key: "location_en"
        }
      ]
    };
  },
  methods: {
    async getPeerById(peer) {
      try {
        let res = await getPeerById({
          peer_id: peer
        });
        this.dataList = this.dataList.map(item => {
          let linkList;
          if (item.key === "miner_address") {
            linkList = [res.peer[item.key]];
          } else {
            linkList = res.peer[item.key];
          }
          return {
            ...item,
            value: res.peer[item.key],
            linkList
          };
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    "$route.query.peer_id": {
      immediate: true,
      handler(v) {
        if (!v) {
          return;
        } else {
          this.getPeerById(v);
        }
      }
    }
  }
};
</script>
