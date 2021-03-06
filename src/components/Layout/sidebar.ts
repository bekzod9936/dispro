import { useCallback, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { permissionList } from "services/atoms/permissions";
import { useAppSelector } from "services/redux/hooks";
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
  SettingIcon,
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
    text: "feedback",
    path: "feedback/reviews",
    permission: [],
  },
  {
    Icon: BasketIcon,
    text: "services",
    path: "services/main",
    permission: [],
  },
  {
    Icon: NewsIcon,
    text: "News",
    path: "news/waiting",
    permission: [],
  },
  {
    Icon: WorkersIcon,
    text: "staff",
    path: "staff/cashiers",
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
  const isPark = useAppSelector((state) => state.info.data?.type);
  const sideList: any = useRef(sidebar);

  const sideMe: any = useCallback(() => {
    for (let i in permissions) {
      for (let j of sidebar) {
        if (i.toLowerCase() === j.text.toLowerCase()) {
          j.permission = permissions[i];
        }
      }
    }

    sideList.current = sidebar;
    return sidebar;
  }, [permissions]);

  useEffect(() => {
    sideMe();
  }, [sideMe]);

  // // console.log(handlePermision(), "permit");
  // const sideList = useMemo(() => handlePermision(), [handlePermision]);

  return {
    sideList:
      Number(isPark) === 2
        ? sideList.current.filter((el: any) => el.text !== "proposals")
        : sideList.current,
  };
};

//orders
// {
//   Icon: OrderIcon,
//   text: 'orders',
//   path: 'orders',
// },
