import { fetch } from "./fetch";
export function getLatestBlock(num) {
  return fetch({
    method: "post",
    url: "LatestBlock",
    data: {
      num
    }
  });
}
export function getLatestMessage(num) {
  return fetch({
    method: "post",
    url: "LatestMsg",
    data: {
      num
    }
  });
}
export function getBoardInfo() {
  return fetch({
    method: "post",
    url: "BaseInformation"
  });
}
/*
param:{
  start_time timestamp
  end_time timestamp
}
*/
export function getBlockTimeData(data) {
  return fetch({
    method: "post",
    url: "BlocktimeGraphical",
    data
  });
}
/*
param:{
  start_time timestamp
  end_time timestamp
}
*/
export function getBlocSizeData(data) {
  return fetch({
    method: "post",
    url: "AvgBlockheaderSizeGraphical",
    data
  });
}
/*
param:{
  time timestamp
}
*/
export function getTotalPowerData(data) {
  return fetch({
    method: "post",
    url: "/TotalPowerGraphical",
    data
  });
}
/*
param:{
  key string
  filter number
}
*/
export function search(data) {
  return fetch({
    method: "post",
    url: "SearchIndex",
    data
  });
}

export function getActivePeerCount() {
  return fetch({
    method: "post",
    url: "/peer/ActivePeerCount"
  });
}
