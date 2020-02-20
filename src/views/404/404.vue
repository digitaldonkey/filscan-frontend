<template>
  <div class="no-result">
    <div class="photo-con">
      <div class="des">{{ $t("noResult.404") }}</div>
    </div>
    <el-button class="back" @click="goTo('home')" type="primary">{{
      $t("noResult.back")
    }}</el-button>
  </div>
</template>
<script>
export default {
  name: "NotFound"
};
</script>
<style lang="scss" scoped>
.no-result {
  height: 100%;
  .photo-con {
    background: url("~@/assets/image/404.png");
    width: 795px;
    height: 737px;
    margin: 0 auto;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    div.des {
      font-size: 44px;
      color: var(--main-text-color);
    }
  }
  & ::v-deep .back.el-button {
    width: 300px;
    height: 60px;
    border-radius: 4px;
    font-size: 16px;
    margin: 100px auto 0;
    display: block;
  }
  @media (max-width: 768px) {
    .photo-con {
      width: 82vw;
      height: 76vw;
    }
    & ::v-deep .back.el-button {
      width: 36.4vw;
      height: 8vw;
      border-radius: 4vw;
      box-shadow: 0px 2px 4px 0px var(--link-color);
    }
  }
}
</style>
