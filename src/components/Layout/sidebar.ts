import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { permissionList } from "services/atoms/permissions";
import {
  StatisticsIcon,
  ClientIcon,
  ConversationIcon,
  BasketIcon,
  NewsIcon,
  WorkersIcon,
  PrizeIcon,
  CoinIcon,
  NotificationIcon,
  InformationIcon,
} from "./style";

const sidebar: any = [
  {
    Icon: StatisticsIcon,
    text: "statistics",
    path: "statistics/clients",
    permission: [],
  },
  {
    Icon: ClientIcon,
    text: "clients",
    path: "clients",
    permission: [],
  },
  {
    Icon: ConversationIcon,
    text: "feedbackPage",
    path: "feedback/reviews",
    permission: [],
  },
  {
    Icon: BasketIcon,
    text: "services",
    path: "services",
    permission: [],
  },
  {
    Icon: NewsIcon,
    text: "News",
    path: "news/active",
    permission: [],
  },
  {
    Icon: WorkersIcon,
    text: "staff",
    path: "staff",
    permission: [],
  },
  {
    Icon: PrizeIcon,
    text: "proposals",
    path: "proposals/drafts",
    permission: [],
  },
  {
    Icon: CoinIcon,
    text: "finances",
    path: "finances/suggestions",
    permission: [],
  },
  {
    Icon: NotificationIcon,
    text: "notifications",
    path: "notifications",
    permission: [],
  },
  {
    Icon: InformationIcon,
    text: "info",
    path: "info/about",
    permission: [],
  },
];

export const useSideBar = () => {
  const { permissions } = useRecoilValue(permissionList);

  const handlePermision = () => {
    for (let i in permissions) {
      console.log(i, "setting");
      for (let j of sidebar) {
        if (i === j.text) {
          j.permission = permissions[i];
        }
      }
    }

    return sidebar;
  };

  // console.log(handlePermision(), "permit");
  const sideList = useMemo(() => handlePermision(), [sidebar]);

  return {
    sideList,
  };
};

//orders
// {
//   Icon: OrderIcon,
//   text: 'orders',
//   path: 'orders',
// },
