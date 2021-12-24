import Modal from "components/Custom/Modal";
import { Buttons, ClientsInfo, ModalWindow, SubInfo } from "./style";
import Input from "components/Custom/Input";
import { TextArea } from "components/Custom/TextArea";
import Button from "components/Custom/Button";
import {
  CancelIcon,
  CoinsIconWhite,
  MinusCoinsIconWhite,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import { useMutation } from "react-query";
import { changeVipPercent } from "../../../../../services/queries/clientsQuery";
import React from "react";
interface IProps {
  open: boolean;
  handleOpen?: any;
  clients: any;
  refetch: any;
  modalContent: {
    title: string;
    subtitle: string;
    info?: string;
    btn?: string;
    vip?: boolean;
    action: string;
  };
}

export const MModal = ({
  open,
  handleOpen,
  modalContent,
  clients,
  refetch,
}: IProps) => {
  const client = clients[0];
  const [percent, setPercent] = React.useState<number>(0);

  const getIcon = (action: string) => {
    switch (action) {
      case "addCoins": {
        return <CoinsIconWhite />;
      }
      case "removeCoins": {
        return <MinusCoinsIconWhite />;
      }
      default:
        return null;
    }
  };

  const handleClose = () => {
    handleOpen(false);
  };



  React.useEffect(() => {
    if (client) {
      setPercent(client?.personalLoyaltyInfo?.percent);
    }
  }, [client]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleOpen(false);
    // await refetch();
  };

  return (
    <Modal open={open} width={{ maxwidth: 520, width: "100%" }}>
      <ModalWindow onSubmit={handleSubmit}>
        <h3>{modalContent.title}</h3>
        {modalContent.info && <SubInfo>{modalContent.info}</SubInfo>}
        <ClientsInfo>
          {clients.length > 1
            ? "Выбрано клиентов: " + clients.length
            : clients[0]?.firstName + " " + clients[0]?.lastName}
        </ClientsInfo>
        <Input
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          required
          type="number"
          label={modalContent.subtitle}
          margin={{ laptop: "30px 0 25px 0" }}
        />
        {modalContent.action !== "vip" && (
          <TextArea
            title="Комментарий"
            container={{ margin: "0 0 25px 0" }}
            textarea={{ height: "125px" }}
            label={{ fontSize: "14px" }}
          />
        )}
        <Buttons>
          <Button
            onClick={handleClose}
            margin={{ desktop: "0 20px 0 0" }}
            buttonStyle={{
              bgcolor: "#ffffff",
              color: "#223367",
              weight: "700",
            }}
            startIcon={<CancelIcon />}
          >
            Отменить
          </Button>
          <Button type="submit" startIcon={getIcon(modalContent.action)}>
            {modalContent.btn}
          </Button>
        </Buttons>
      </ModalWindow>
    </Modal>
  );
};
