<template>
  <div class="message-list-con bottom-10">
    <message-list :withType="false" />
  </div>
</template>
<script>
export default {
  name: "MessageListCon"
};
</script>
<style lang="scss" scoped>
.message-list-con {
  & ::v-deep .el-table {
    height: calc(100vh - 300px) !important;
  }
}
</style>
