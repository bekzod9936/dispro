import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { blockClient } from "services/queries/clientsQuery";
import { useAppSelector } from "services/redux/hooks";
import { Modal } from "./style";
interface IProps {
  handleClose: () => void;
  array?: string[];
  modalContent: "points" | "other";
  onClick: (e: 1 | 2 | 3 | 4) => void;
  isBlocked: boolean;
  id: number;
  onClose: any;
  refetch: () => void;
}

const modals: any = {
  points: [
    { label: "Начислить баллы", action: 1 },
    { label: "Списать баллы", action: 2 },
  ],
  other: [
    { label: "Индивидуальный статус", action: 3 },
    { label: "Заблокировать", action: 4 },
  ],
};
export const DownModal = ({
  handleClose,
  modalContent,
  onClick,
  isBlocked,
  id,
  refetch,
  onClose,
}: IProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<null | HTMLDivElement>(null);
  const { disableSpecStatus } = useAppSelector((state) => state.clients);

  function handleClick(e: any) {
    if (!e.path?.includes(modalRef.current)) {
      handleClose();
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const { mutate, isLoading } = useMutation((data: any) => blockClient(data));

  const handleBlock = (action: 1 | 2 | 3 | 4) => {
    if (isBlocked) {
      mutate({
        clientId: id,
        isPlBlocked: false,
        reason: "",
      });
      refetch();
      onClose();
    } else {
      onClick(action);
    }
  };

  return (
    <Modal ref={modalRef}>
      {modalContent === "other"
        ? modals[modalContent]?.map((el: any, index: number) => {
            if (index === 0) {
              return (
                <p
                  className={isBlocked || disableSpecStatus ? "disabled" : ""}
                  key={el.action}
                  onClick={
                    isBlocked || disableSpecStatus
                      ? undefined
                      : () => onClick(el.action)
                  }
                >
                  {el.label}
                </p>
              );
            } else {
              return (
                <p
                  className={isLoading ? "disabled" : ""}
                  key={el.action}
                  onClick={() => handleBlock(el.action)}
                >
                  {isBlocked ? t("unBlocking") : el.label}
                </p>
              );
            }
          })
        : modals[modalContent]?.map((el: any) => (
            <p
              className={isBlocked || disableSpecStatus ? "disabled" : ""}
              key={el.action}
              onClick={
                isBlocked || disableSpecStatus
                  ? undefined
                  : () => onClick(el.action)
              }
            >
              {el.label}
            </p>
          ))}
    </Modal>
  );
};
