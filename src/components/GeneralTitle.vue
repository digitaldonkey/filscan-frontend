<template>
  <div class="general-title border-bottom">
    <span class="title">{{ title }}</span>
    <span class="detail">{{ detail }}</span>
  </div>
</template>
<script>
export default {
  name: "GeneralTitle",
  props: {
    title: {
      type: String
    },
    detail: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.general-title {
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  background: var(--general-title-bg-color);
  .title {
    margin-left: 90px;
  }
  .detail {
    color: var(--general-title-text-color);
  }
}
</style>
