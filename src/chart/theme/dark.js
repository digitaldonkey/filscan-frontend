import echarts from "../index";
const darkTheme = {
  blockTime: {
    axisLine: "#0091FF",
    seriesItem: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#00E5FF"
      },
      {
        offset: 1,
        color: "#008EE7"
      }
    ]),
    seriesMarkLine: "#0091FF"
  },
  blockSize: {
    axisLine: "#F7B500",
    seriesItem: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#FFD300"
      },
      {
        offset: 1,
        color: "#FFA800"
      }
    ]),
    seriesMarkLine: "#F7B500"
  },
  totalPower: {
    axisLine: "#F93C53",
    seriesItem: "#F93C53",
    area: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: "#F93C53"
      },
      {
        offset: 1,
        color: "#402A38"
      }
    ])
  },
  tipset: {
    ticketNode: "white",
    otherNode: "#F7B500",
    nullNode: "black",
    link: "#F7B500",
    seriesMarkLine: "transparent",
    seriesMarkLineLabel: "white",
    markArea: "transparent",
    markAreaBorder: "#F7B500",
    markAreaActiveBorder: "#F7B500"
  },
  filOutstanding: {
    splitLine: "#0A0D13",
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
    splitLine: "#0A0D13",
    seriesItem: ["#F7B500", "#0062FF"]
  },
  filecoin: {
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
  filVested: {
    splitLine: "#0A0D13",
    seriesItem: ["#0062FF", "#F7B500"]
  },
  activeMiner: {
    splitLine: "#0A0D13",
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
    splitLine: "#0A0D13",
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
    bg: "#182232",
    tooltip: "#007AFF",
    scatter: "#00A8E6",
    geo: {
      item: "#AAABAB",
      border: "transparent",
      emphasis: "#AAABAB"
    }
  }
};
export default darkTheme;
