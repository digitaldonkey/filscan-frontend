<template>
  <div class="general-overview">
    <general-title
      :title="title.label"
      :detail="title.detail"
      v-if="title.label && !isMobile"
    />
    <div class="overview-label" v-if="label && !isMobile">{{ label }}</div>
    <div
      class="detail-info-con"
      v-loading="showLoading"
      element-loading-background="var(--board-bg-color)"
    >
      <div
        class="info-item"
        v-for="item in realList"
        :key="item.title"
        :class="{ stripe: stripe }"
      >
        <span class="info-title">{{ item.title }}:</span>
        <div
          v-if="
            !item.isComponent &&
              item.isLink &&
              item.linkList &&
              item.linkList[0]
          "
          class="link-list"
        >
          <base-link
            :target="item.target"
            :param="{
              key: item.paramKey || item.key,
              value: link
            }"
            :underline="item.underline"
            :label="link"
            v-for="link in item.linkList"
            :key="link"
          ></base-link>
        </div>
        <span
          v-if="!item.isComponent && !item.isLink"
          :class="{ [item.class || '']: true }"
          :style="item.style"
          >{{
            `${item.value != undefined ? item.value : ""} ${item.unit || ""}`
          }}</span
        >
        <component :is="item.component" v-if="item.isComponent" />
      </div>
    </div>
  </div>
</template>
<script>
import GeneralTitle from "./GeneralTitle";
export default {
  name: "Overview",
  data() {
    return {
      activeName: "overview"
    };
  },
  props: {
    title: {
      type: Object,
      default: () => {
        return {
          label: "",
          detail: ""
        };
      }
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    dataLabel: {
      type: Array,
      default: () => {
        return [];
      }
    },
    label: {
      type: String,
      default: ""
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    }
  },
  components: {
    GeneralTitle
  },
  computed: {
    realList() {
      return this.dataList.map((item, index) => {
        return {
          ...item,
          title: this.dataLabel[index]
        };
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.general-overview {
  color: var(--overview-text-color);
  background: var(--overview-bg-color);
  box-shadow: 0px 1px 5px 7px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  .detail-info-con {
    .info-item {
      min-height: 60px;
      display: flex;
      &.stripe:nth-child(2n) {
        background: var(--overview-bg-dark-color);
      }
      &.params {
        height: auto;
        span:last-child {
          font-size: 12px;
          color: var(--white);
        }
      }
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
    }
    & ::v-deep .link-list {
      display: flex;
      align-items: center;
      line-height: 0;
      flex: 1;
      flex-wrap: wrap;
      a {
        display: block;
        min-width: 100%;
        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  .overview-label {
    color: var(--link-color);
    font-size: 24px;
    height: 80px;
    line-height: 80px;
    padding-left: 50px;
    background: var(--main-bg-color);
  }
  @media (max-width: 768px) {
    &.general-overview {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
      border-radius: 10px !important;
    }
    .detail-info-con {
      padding-bottom: 3vw;
      .info-item {
        display: block;
        padding: 0 6vw;
        &:nth-child(2n) {
          background: var(--board-bg-color);
        }
        span {
          display: block;
          padding-left: 0 !important;
          &:first-child {
            color: var(--main-text-color);
            height: 7vw;
            line-height: 7vw;
          }
        }
        & ::v-deep * {
          word-break: break-all;
        }
        & ::v-deep .link-list {
          a {
            span {
              min-height: 7vw;
              line-height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
