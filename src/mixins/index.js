import dayjs from "dayjs";
import light from "../chart/theme/light";
import dark from "../chart/theme/dark";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import resize from 'vue-resize-directive'

const mixin = {
  computed: {
    atIndex() {
      return this.$route.path === "/";
    },
    latestBlockHeight() {
      return this.$store.state.defaultHeight;
    },
    loadCount() {
      return this.$store.state.loadCount;
    },
    isMobile() {
      return this.$store.state.isMobile;
    },
    routeName() {
      return this.$t("routeName")[this.$route.name];
    },
    theme() {
      return this.$store.state.theme;
    },
    chartTheme() {
      return this.theme === "dark" ? dark : light;
    },
    now() {
      return dayjs().unix();
    },
    rate() {
      return this.isMobile ? 1 : this.$store.state.rate;
    }
  },
  directives: {
    resize,
  },
  methods: {
    windowResize() {
      this.$store.commit('setIsMobile', window.innerWidth < 768);
    },
    goTo(name = "/", { params, query } = {}) {
      this.$router.push({
        name,
        params,
        query
      });
    },
    formatNumber(v, len = 5) {
      return Number(v).toLocaleString("en", { maximumFractionDigits: len });
    },
    parseFormatNumber(v) {
      return typeof v === "number" ? v : Number(v.replace(/,/g, ""));
    },
    formatTime(from, to) {
      const current = new Date(to || new Date()).getTime();
      let interval = Math.abs(current / 1000 - from);
      const secUnit = 1;
      const minUnit = 60;
      const hrUnit = 60 * 60;
      const dayUnit = 24 * hrUnit;
      const arr = [];
      const unit = [dayUnit, hrUnit, minUnit, secUnit];
      const suffix = ["day", "hr", "min", "s"];
      let n = 0;
      while (n < 4) {
        arr.push(Math.floor(interval / unit[n]));
        interval = interval - unit[n] * arr[n];
        n++;
      }
      const strMap = arr
        .map((item, index) => {
          return `${item}${suffix[index]}${item > 1 && index !== 3 ? "s" : ""}`;
        })
        .filter(item => {
          return item[0] !== "0";
        })
        .slice(0, 2);
      return strMap.join(" ");
    },
    formatFloat(v, l = 9) {
      const [int, dot] = Number(v)
        .toString()
        .split(".");
      let length;
      if (dot) {
        length = Math.max(0, l - int.length);
      }
      return Number(`${int}.${dot.slice(0, length)}`).toLocaleString();
    },
    ellipsisByLength(str, length = 6, flag = true) {
      return str.length > 2 * length && flag
        ? `${str.slice(0, length)}...${str.slice(-length)}`
        : str;
    },
    getFormatTime(time) {
      return dayjs(time * 1000).format("MMM Do YYYY HH:mm:ss (UTCZ)");
    },
    formatTimeByStr(time, str) {
      return dayjs(time).format(str || "MMM Do YYYY");
    },
    formatFilNumber(value) {
      value = Number(value);
      if (value === 0) {
        return "0 FIL";
      } else {
        return value >= 0.00001
          ? `${value.toFixed(3)} FIL`
          : `${(value * Math.pow(10, 18)).toLocaleString()} AttoFIL`;
      }
    },
    unitConversion(item, len) {
      let positive = true;
      if (item == 0) {
        return "0bytes";
      }
      if (item < 0) {
        positive = false;
        item = Math.abs(item);
      }
      let k = 1024;
      let sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let c = Math.floor(Math.log(item) / Math.log(k));
      if (c < 0) {
        item = 0;
      } else {
        item = (item / Math.pow(k, c)).toFixed(len) + " " + sizes[c];
      }

      return positive ? item : `-${item}`;
    },
    numberConversion(num, len) {
      if (num == 0) {
        return 0;
      }
      let k = 1000;
      let units = ["", "K", "M", "B"];
      let c = Math.floor(Math.log(num) / Math.log(k));
      num = (num / Math.pow(k, c)).toFixed(len) + " " + units[c];
      return num;
    },
  },
  filters: {
    formatNumber(v) {
      return this.formatNumber(v);
    }
  }
};
export default mixin;
