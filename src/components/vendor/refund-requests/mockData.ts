import { VendorRefundRequest } from "./types";

export const initialVendorRefundRequests: VendorRefundRequest[] = [
  {
    id: "3",
    orderId: "10007",
    productTitle: "#10007 - Animal colorful digital prints",
    total: "$31.90",
    buyer: "Peter Jones",
    buyerAvatar: "/images/peter-avatar.jpg",
    status: "Processing",
    updated: "1 month ago",
    date: "2026-09-09 / 11:12",
    messages: [
      {
        id: "msg-1",
        sender: "Peter Jones",
        avatar: "/images/peter-avatar.jpg",
        time: "1 month ago",
        text: "Us",
      },
    ],
  },
  {
    id: "2",
    orderId: "10018",
    productTitle: "#10018 - Navy polka dot dress",
    total: "$143",
    buyer: "Trendshop",
    buyerAvatar: "/assets/img/trendshop-avatar.jpg",
    status: "Processing",
    updated: "1 month ago",
    date: "2026-09-08 / 06:01",
    messages: [
      {
        id: "msg-2",
        sender: "Trendshop",
        avatar: "/assets/img/trendshop-avatar.jpg",
        time: "1 month ago",
        text: "Requested refund for incorrect size delivered.",
      },
    ],
  },
];
