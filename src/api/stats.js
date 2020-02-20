import { fetch } from "./fetch";
/*
param:{
  num number
}
*/
export function getTopMiner(data) {
  return fetch({
    url: "/mining/TopnPowerMiners",
    method: "post",
    data
  });
}

/*
param:{
  time_at number,
  time_diff number
  repeate_time number
}
*/
export function getActiveMinerCount(data) {
  return fetch({
    url: "/mining/ActiveStorageMinerCountAtTime",
    method: "post",
    data
  });
}

/*
param:{
  time_at number,
  time_diff number
  repeate_time number
  miners string []
}
*/
export function getMinerPowerByTime(data) {
  return fetch({
    url: "/mining/MinerPowerAtTime",
    method: "post",
    data
  });
}

/*
param:{
  peer_id string
}
*/
export function getPeerById(data) {
  return fetch({
    url: "/peer/PeerById",
    method: "post",
    data
  });
}

/*
param:{
  peer_id string
  miner_address string
}
*/
export function searchMiner(data) {
  return fetch({
    url: "/mining/MinerSearch",
    method: "post",
    data
  });
}

/*
param:{
  time_start number
  time_at number
  offset number
  limit number
  sort string
  sort_type number 1 | -1
}
*/
export function getMinerList(data) {
  return fetch({
    url: "mining/MinerList",
    method: "post",
    data
  });
}
export function getMapData(data) {
  return fetch({
    url: "/peer/PeerMap",
    method: "post",
    data
  });
}
