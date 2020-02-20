import echarts from "../index";
const lightTheme = {
  blockTime: {
    axisLine: "#0091FF",
    seriesItem: "#0091FF",
    seriesMarkLine: "#0091FF"
  },
  blockSize: {
    axisLine: "#6A0CE0",
    seriesItem: "#6A0CE0",
    seriesMarkLine: "#6A0CE0"
  },
  totalPower: {
    axisLine: "#F7B500",
    seriesItem: "#F7B500",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#F7B500"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  tipset: {
    ticketNode: "white",
    otherNode: "#0091FF",
    nullNode: "",
    link: "#0091FF",
    seriesMarkLine: "transparent",
    seriesMarkLineLabel: "#333",
    markArea: "white",
    markAreaBorder: "#0091FF",
    markAreaActiveBorder: "#F7B500"
  },
  filOutstanding: {
    splitLine: "#F5F5F5",
    seriesItem: ["#0031F7", "#F7B500"],
    floatArea: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#0031F7"
      },
      {
        offset: 1,
        color: "white"
      }
    ]),
    pledgeArea: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#F7B500"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  blockReward: {
    splitLine: "#F5F5F5",
    seriesItem: ["#F7B500", "#0062FF"]
  },
  filecoin: {
    seriesItem: "#44D7B6",
    splitLine: "#F5F5F5",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#2774FF"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  filVested: {
    splitLine: "#F5F5F5",
    seriesItem: ["#0062FF", "#F7B500"]
  },
  activeMiner: {
    splitLine: "#F5F5F5",
    seriesItem: "#44D7B6",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#2774FF"
      },
      {
        offset: 1,
        color: "white"
      }
    ])
  },
  provenPower: {
    splitLine: "#F5F5F5",
    items: [
      {
        item: "#704FFF",
        area: "#704FFF"
      },
      {
        item: "#4F8EFF",
        area: "#4F8EFF"
      },
      {
        item: "#FFAD54",
        area: "#FFAD54"
      },
      {
        item: "#FF9300",
        area: "#FF9300"
      },
      {
        item: "#FFED00",
        area: "#FFED00"
      },
      {
        item: "#3CD3A8",
        area: "#3CD3A8"
      },
      {
        item: "#FF8685",
        area: "#FF8685"
      }
    ]
  },
  map: {
    bg: "white",
    tooltip: "#007AFF",
    scatter: "#00A8E6",
    geo: {
      item: "#AAABAB",
      border: "transparent",
      emphasis: "#AAABAB"
    }
  }
};
export default lightTheme;
