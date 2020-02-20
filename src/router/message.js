import MessageListCon from "@/views/message/List";
import MessageDetail from "@/views/message/Detail";
const route = [
  {
    path: "/message",
    name: "message",
    component: () =>
      import(/* webpackChunkName: "Message" */ "@/views/message"),
    redirect: "/message/list",
    children: [
      {
        path: "list",
        name: "messageList",
        component: MessageListCon
      },
      {
        path: "detail",
        name: "messageDetail",
        component: MessageDetail
      }
    ]
  }
];
export default route;
