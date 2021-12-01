import useSupportChat from "pages/CompanyPages/feedback/screens/Support/useSupportChat";
import { useEffect, useRef } from "react";
import { SOCKET_EVENT } from "services/constants/chat";
import { useAppSelector, useAppDispatch } from "services/redux/hooks";
import { setSocket } from "services/redux/Slices/feedback";
import useLayout from "../useLayout";
import { io } from "socket.io-client";
// const io = require("socket.io-client");

const useSocket = () => {
  const dispatch = useAppDispatch();
  let socket: any = useRef();
  const companyId = localStorage.getItem("companyId");
  const companyToken = localStorage.getItem("companyToken");
  const infoData = useAppSelector((state) => state.info.data);
  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });
  const { resChatSupportHistory } = useSupportChat();
  const { resBadge } = useLayout({ id: companyId });

  const fill =
    (infoData?.filled && infoData?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  useEffect(() => {
    if (fill && !socket?.current?.connected) {
      if (socket?.current?.connected) {
        console.log("already connected", socket.current.connected);
      } else {
        socket.current = io(
          `${process.env.REACT_APP_WEBSOCKET_URL}/nsp_staff_svdfv8732f5rycf76f8732rvuy23cfi77c3u6fr2387frv8237vfidu23vf2vdd7324df4`,
          {
            path: "/",
            auth: {
              token: `Bearer ${companyToken}`,
            },
          }
        );
      }

      socket.current.on(
        SOCKET_EVENT.CHAT_MODERATOR_TO_PARTNER,
        function (data: any) {
          resChatSupportHistory.refetch();
          resBadge.refetch();
        }
      );

      socket.current.on(
        SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER,
        function (data: any) {
          console.log(data, "p");
          resBadge.refetch();
        }
      );
      dispatch(setSocket(socket?.current));
    }

    return () => {
      socket.current?.disconnect();
    };
  }, [fill, companyToken]);

  // infoData?.filled,
  //   infoData?.filledAddress,
  //   regFilled?.filled,
  //   regFilled?.filledAddress,

  console.log(socket?.current?.connected, "socket");

  return {};
};

export default useSocket;
