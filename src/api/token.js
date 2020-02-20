import { fetch } from "./fetch";
/*
param:{
  time_start number,
  time_diff number
  repeate_time number
}
*/
export function getFilOutstanding(data) {
  return fetch({
    url: "/token/FilOutStanding",
    method: "post",
    data
  });
}

/*
param:{
  time_diff number
  repeate number
}
*/
export function getBlockReward(data) {
  return fetch({
    url: "/token/FilNetworkBlockReward",
    method: "post",
    data
  });
}

/*
param:{
  time_start number,
  time_diff number
  repeate_time number
}
*/
export function getCumulativeBlock(data) {
  return fetch({
    url: "/token/CumulativeBlockRewardsOverTime",
    method: "post",
    data
  });
}
