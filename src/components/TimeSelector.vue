<template>
  <div class="time-selector">
    <slot name="left" class="left"></slot>
    <div class="time-con">
      <span
        v-for="(item, index) in times"
        :key="item.label"
        :class="{ active: currentIndex === index }"
        @click="handleTabClick(item.label, index)"
        >{{ item.label }}</span
      >
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "TimeSelector",
  data() {
    return {
      times: [
        { label: "24h" },
        { label: "1w" },
        { label: "1m" },
        { label: "1y" },
        { label: "all" }
      ],
      currentIndex: 0
    };
  },
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleTabClick(v, index) {
      this.currentIndex = index;
      let time_diff, repeate_time, time_start, format;
      const now = dayjs();
      switch (v) {
        case "24h":
          time_diff = 3600;
          repeate_time = 24;
          time_start = now.subtract(24, "hour");
          format = "MMM Do HH:mm";
          break;
        case "1w":
          time_diff = 3600 * 24;
          repeate_time = 7;
          time_start = now.subtract(7, "day");
          format = "MMM Do";
          break;
        case "1m":
          time_diff = 3600 * 24;
          repeate_time = 30;
          time_start = now.subtract(30, "day");
          format = "MMM Do YYYY";
          break;
        case "1y":
          time_diff = 3600 * 24;
          repeate_time = 365;
          time_start = now.subtract(1, "year");
          format = "MMM Do YYYY";
          break;
        case "all":
          time_diff = 3600 * 24;
          repeate_time = 365;
          time_start = 0;
          format = "MMM Do YYYY";
          break;
      }
      this.$emit("update:activeIndex", index);
      this.$emit("time-select", {
        time_start: time_start === 0 ? 0 : dayjs(time_start).unix(),
        time_diff,
        repeate_time,
        format
      });
    }
  },
  mounted() {
    this.currentIndex = this.activeIndex;
  }
};
</script>
<style lang="scss" scoped>
.time-selector {
  display: flex;
  height: 60px;
  background: var(--board-bg-color);
  border-radius: 8px;
  padding-left: 30px;
  align-items: center;
  .time-con {
    display: flex;
    margin-left: auto;
    width: 250px;
    height: 25px;
    border: 1px solid #999;
    align-items: center;
    margin-right: 20px;
    border-radius: 5px;
    span {
      flex: 1;
      height: 25px;
      cursor: pointer;
      line-height: 25px;
      text-align: center;
      border-radius: 5px;
      color: var(--main-text-color);
      &.active {
        background: #0062ff;
        color: white;
      }
    }
  }
  @media (max-width: 768px) {
    display: block;
    height: auto;
    padding: 3.3vw;
    border-radius: 10px;
    .time-con {
      margin-left: 0;
      height: 7.2vw;
      width: 66.7vw;
      margin: 0 auto;
      border-radius: 3.6vw;
      margin-top: 6vw;
      span {
        height: 100%;
        line-height: 7.2vw;
        border-radius: 3.6vw;
      }
    }
  }
}
</style>
