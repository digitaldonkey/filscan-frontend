<template>
  <div class="general-title border-bottom">
    <h1 class="title">{{ title }}</h1>
    <p class="detail" v-if="detail">{{ detail }}</p>
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
  padding: $vertical-space 0;
  .title {
    @include title;
  }
  .detail {
    color: var(--total-board-top-color);
    line-height: initial;
    font-size: $--font-size-base;
    padding-top: $vertical-space /2;
  }
}
</style>
