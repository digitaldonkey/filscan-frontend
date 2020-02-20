import { fetch } from "./fetch";
/*
param:{
  count number
  end_height number
}
*/
export function getTipset(data) {
  return fetch({
    url: "tipset/TipSetTree",
    method: "post",
    data
  });
}
/*
param:{
  height number
}
*/
export function getBlockByHeight(data) {
  return fetch({
    url: "tipset/BlockByHeight",
    method: "post",
    data
  });
}
/*
param:{
  cid number
}
*/
export function getBlockByCid(data) {
  return fetch({
    url: "tipset/BlockByCid",
    method: "post",
    data
  });
}
