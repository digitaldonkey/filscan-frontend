<template>
  <el-link
    :href="`./#/${target}${!param ? '' : '?' + param.key + '=' + param.value}`"
    :underline="false"
    type="primary"
    :class="{ underline: underline }"
    >{{ label }}</el-link
  >
</template>
<script>
export default {
  name: "BaseLink",
  props: {
    target: {
      type: String,
      default: ""
    },
    param: {
      type: Object,
      default() {
        return null;
      }
    },
    label: {
      type: String,
      default: ""
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.el-link.underline {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .el-link {
    font-size: 12px;
  }
}
</style>
