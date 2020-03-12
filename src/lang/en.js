const en = {
  component: {
    mesList: {
      label: [
        "Type",
        "Message ID",
        "Height",
        "Time",
        "From",
        "To",
        "Value",
        "Receipt",
        // "Fee",
        "Method"
      ],
      total: "Total of <i>{total}</i> Messages",
      method: [
        { label: "All", value: "" },
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" }
      ],
      placeholder: "Method"
    },
    blockList: {
      label: [
        "Height",
        "Block Hash",
        "Time",
        "Messages",
        "BlockSize",
        "Miner",
        "Reward"
      ],
      total: "Total of <i>{total}</i> Blocks(<i>{fil}</i>FIL)",
      height: "Tipset Height # {height}"
    }
  },
  header: {
    title: "Filecoin Explorer",
    tab: ["Home", "Tipset", "Stats"],
    placeholder: "Search by Address/Message ID/Height/Block Hash/Peer ID ",
    filter: [
      {
        label: "All filters",
        value: 0
      },
      {
        label: "Address",
        value: 1
      },
      {
        label: "Message ID",
        value: 2
      },
      {
        label: "Height",
        value: 3
      },
      {
        label: "Block Hash",
        value: 4
      },
      {
        label: "Peer ID",
        value: 5
      }
    ],
    nav: {
      home: {
        label: "Home",
        index: "/"
      },
      tipset: {
        label: "Tipset",
        index: "tipset",
        items: [
          {
            label: "Tipset",
            index: "/tipset"
          },
          {
            label: "View All Messages",
            index: "/message"
          },
          {
            label: "View All Accounts",
            index: "/address/list"
          }
        ]
      },
      stats: {
        label: "Stats",
        index: "Stats",
        items: [
          {
            label: "Mining",
            index: "/stats/mining"
          },
          {
            label: "Token Metrics",
            index: "/stats/metrics"
          },
          {
            label: "Peer Map",
            index: "/stats/map"
          }
        ]
      }
    },
    mb: {
      title: "Filecoin Search",
      search: "Search"
    }
  },
  footer: {
    peer: "Active Peers {count}",
    nav: [
      {
        label: "Github",
        href: ""
      },
      {
        label: "API",
        href: ""
      },
      {
        label: "Documentation",
        href: ""
      }
    ]
  },
  home: {
    blockTime: {
      label: "Avg Blocktime",
      min: "Min",
      max: "Max",
      tips: "Avg blocktime in latest 24H"
    },
    blockSize: {
      label: "Avg Blockheader Size",
      size: "{avg} bytes",
      tips: "Avg blockheader size in latest 24H"
    },
    totalPower: {
      power: "Total Power",
      capacity: "Storage Capacity"
    },
    baseTable: {
      more: "Show all"
    },
    blockTable: {
      title: "Recent Blocks",
      label: ["Height", "Hash", "Blocktime", "Miner", "Reward"]
    },
    messageTable: {
      title: "Recent Messages",
      label: ["Message ID", "Time", "From", "To", "Value"]
    },
    board: {
      height: {
        label: "Tipset Height",
        tips: "The Latest Tipset Height"
      },
      reward: {
        label: "Block Reward",
        tips: "The Latest Block Reward"
      },
      blockTime: {
        label: "Last BlockTime",
        tips: "Time since a miner last created a block"
      },
      avgMsgTipset: {
        label: "Avg Messages",
        tips: "Avg Number of Messages per Tipset Height"
      },
      avgGas: {
        label: "Avg Gas Price",
        tips: "Avg Gas Price over the Last 24h"
      },
      avgMsg: {
        label: "Avg Message Size",
        tips: "Avg Message Size of Total Network"
      },
      pledge: {
        label: "Pledge Collateral",
        tips: "Total Fil in Pledge Collateral"
      },
      number: {
        label: "Blocks In Tipset",
        tips:
          "Number of blocks in the current best tipset. A tipset is a set of blocks at the same height that share the same parent set"
      },
      size: {
        label: "Block Size",
        tips: "The Latest Block Size"
      },

      power: {
        label: "Total Power",
        tips: "Total Storage Power"
      },

      avgBlockTime: {
        label: "Avg BlockTime",
        tips: ""
      },
      avgBlockSize: {
        label: "Avg Blcokheader Size",
        tips: "Avg Blockheader Size of Total Block"
      }
    },
    filType: {
      floating: "Floating ",
      pledge: "Pledge Collateral",
      outstanding: "Outstanding"
    }
  },
  stats: {
    mining: {
      activeMiner: {
        title: "Active Storage Miners",
        count: "Miner Count"
      },
      provenPower: {
        title: "Evolution of Top Miners for Miners For Proven Power"
      },
      minerList: {
        title: "Miner List",
        label: [
          "Miner",
          "Peer ID",
          "Storage Power",
          "Power %",
          "Blocks Mined",
          "% of Blocks Mined"
        ],
        detail: ["Peer ID", "IP", "Location"],
        placeholder: "Search by Miner Address/Peer ID"
      }
    },
    metrics: {
      blockReward: {
        title: "Cumulative Block Rewards"
      },
      filecoin: {
        title: "Filecoin Network Block Reward Curve"
      },
      filVested: {
        title: "FIL Vested"
      }
    },
    peer: {
      title: "Peer ID:",
      label: ["Peer ID", "Miner Address", "IP", "Location"]
    }
  },
  address: {
    list: {
      label: ["Address", "Type", "Balance", "Messages"],
      total: "Total of <i>{num}</i> Accounts Found ({filNum}FIL)"
    },
    detail: {
      overview: ["Address", "Type", "Balance", "Code Cid", "Nonce"],
      worker: "Worker List",
      ownerOverview: [
        "Owner Account",
        "Peer ID",
        "Power",
        "Sector Size",
        "Sector Number",
        "Proving Sector Number",
        "Fault Number"
      ]
    },
    type: {
      account: "Account",
      owner: "Account(Owner)",
      wallet: "Account",
      miner: "StorageMiner",
      actor: "Account"
    },
    radio: ["Message", "Blocks Mined"]
  },
  message: {
    detail: {
      overview: [
        "Message ID",
        "Height",
        "Block",
        "Time",
        "From",
        "To",
        "Value",
        "Receipt",
        //"Fee",
        "Method",
        "Nonce",
        "Params"
      ],
      paramTip: "Raw data in Base64",
      confirm: "Confirmations"
    }
  },
  tipset: {
    label: "Latest blocks",
    height: "Height",
    block: {
      overview: [
        "Hash",
        "Height",
        "TimeStamp",
        "Block Size",
        "Messages",
        "Miner",
        "Reward",
        "Parent Hash",
        "Parent Weight",
        "Ticket",
        "State Root"
      ]
    },
    blockType: ["Null Block", "Min Ticket Block", "Other Block"]
  },
  noResult: {
    res: "Search Not Found",
    404: "Page Not Found",
    key: "Oops!The search string you enterd was:",
    invalid: "Sorry! This is an invalid search string",
    back: "Back Home"
  },
  routeName: {
    blockDetail: "Block Detail",
    messageDetail: "Message Detail",
    addressDetail: "Address Detail",
    messageList: "View All Messages",
    addressList: "View All Accounts",
    tipset: "Tipset",
    mining: "Mining",
    metrics: "Metrics",
    map: "Peer Map",
    peer: "Peer Detail"
  },
  chart: {
    blockTime:
      "<div style='margin-bottom:5px'>Avg Block Time: {value}s</div><div>Time: {name}</div>",
    blockSize:
      "<div style='margin-bottom:5px'>Avg BlockHeader Size: {value}bytes</div><div>Time: {name}</div>",
    totalPower:
      "<div style='margin-bottom:5px'>Total Power: {value}</div><div>Time: {name}</div>",
    filOutstanding: ["Floating", "Pledge"],
    blockReward: ["# Of Miners", "Cumulative Block Reward"],
    filecoin: "Block Reward(FIL)",
    filVested: ["Cumulative FIL Vested", "FIL Vested Daily"],
    map:
      "<div style='margin-bottom:5px'><a href='/#/stats/peer?peer_id={pid}'><span>Peer ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><span>Location : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>"
  }
};
export default en;
