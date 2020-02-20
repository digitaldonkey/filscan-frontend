import Mining from "@/views/stats/Mining";
import Metrics from "@/views/stats/Metrics";
import NodeMap from "@/views/stats/Map";
import PeerId from "@/views/stats/PeerId";
const route = [
  {
    path: "/stats",
    name: "stats",
    component: () => import(/* webpackChunkName: "Stats" */ "@/views/stats"),
    redirect: "/stats/mining",
    children: [
      {
        path: "mining",
        name: "mining",
        component: Mining
      },
      {
        path: "metrics",
        name: "metrics",
        component: Metrics
      },
      {
        path: "map",
        name: "map",
        component: NodeMap
      },
      {
        path: "peer",
        name: "peer",
        component: PeerId
      }
    ]
  }
];
export default route;
