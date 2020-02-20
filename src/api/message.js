import { fetch } from "./fetch";
/*
param:{
  count number
  method ? string
  begindex number
  block_cid ? string
}
*/
export function getMessage(data) {
  return fetch({
    url: "messages/BlockMessages",
    method: "post",
    data
  });
}
/*
param:{
  cids Array<String>
}
*/
export function getMessageMethods() {
  return fetch({
    url: "/messages/MessagesMethods",
    method: "post",
    data: {
      cids: []
    }
  });
}

/*
param:{
  msg_cid String
}
*/
export function getMessageDetail(data) {
  return fetch({
    url: "messages/MessageDetails",
    method: "post",
    data
  });
}

/*
param:{
  address String
  beginindex number
  count number
  method string
  from_to string
}
*/
export function getMessageByAddress(data) {
  return fetch({
    url: "messages/MessageByAddress",
    method: "post",
    data
  });
}

/*
param:{
  cid String
}
*/
export function getBlockConfirmCount(data) {
  return fetch({
    url: "/tipset/BlockConfirmCount",
    method: "post",
    data
  });
}
