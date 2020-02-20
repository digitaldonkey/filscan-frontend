const mixin = {
  methods: {
    parseAddress(account) {
      const types = this.$t("address.type");
      const {
        address,
        is_miner,
        is_owner,
        is_wallet,
        is_storage_miner,
        actor
      } = account;
      const { Balance, code, nonce } = actor;
      let typeKey = "";
      if (is_miner) {
        typeKey = "miner";
      } else if (is_owner) {
        typeKey = "owner";
      } else if (is_wallet) {
        typeKey = "wallet";
      } else if (is_storage_miner) {
        typeKey = "miner";
      } else {
        typeKey = "account";
      }
      return {
        address,
        type: types[typeKey],
        balance: this.formatNumber(Balance, this.isMobile ? 5 : 18),
        code,
        nonce
      };
    }
  }
};
export default mixin;
