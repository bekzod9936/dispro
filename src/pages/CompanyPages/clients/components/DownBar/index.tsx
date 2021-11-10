import {
  CloseIcon,
  CoinsIcon,
  MiniCloseIcon,
} from "assets/icons/ClientsPageIcons/ClientIcons";
import Button from "components/Custom/Button";
import CustomToggle from "components/Custom/CustomToggleSwitch";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { selectAll, setClient } from "services/redux/Slices/clients";
import { Content, Footer, Header, Main, Wrapper } from "./style";
interface IProps {
  setForm: any;
}
export const DownBar = ({ setForm }: IProps) => {
  const { selectedClients } = useAppSelector((state) => state.clients);
  const client = selectedClients[0];
  const barRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<"hide" | "show" | "fullShow">("hide");
  const dispatch = useAppDispatch();
  const handleRemoveClient = (id: number) => {
    dispatch(setClient(id));
  };

  useEffect(() => {
    if (selectedClients.length === 0) {
      setOpen("hide");
      setTimeout(() => {
        if (barRef.current) {
          barRef.current.style.visibility = "hidden";
        }
      }, 1000);
    } else if (open === "hide") {
      if (barRef.current) {
        barRef.current.style.visibility = "visible";
      }
      setOpen("show");
    }
  }, [selectedClients]);

  const handleClick = (e: any) => {
    dispatch(selectAll(e.target.value === "true"));
  };

  const handleChange = (e: any) => {
    setForm({
      action: 3,
      isOpen: e.target.checked,
    });
  };
  return (
    <Wrapper ref={barRef} border={open === "fullShow"} isOpen={open}>
      <Header>
        {open !== "fullShow" ? (
          <>
            <p>Выбрано: {selectedClients.length}</p>
            <Button
              onClick={() => setOpen("fullShow")}
              buttonStyle={{
                color: "#3492FF",
                bgcolor: "rgba(96, 110, 234, 0.1)",
              }}
            >
              Посмотреть
            </Button>
          </>
        ) : (
          <>
            <h5>Выбранно клиентов: {selectedClients.length}</h5>
            <CloseIcon onClick={() => setOpen("show")} />
          </>
        )}
      </Header>
      <Main>
        <Content>
          {selectedClients.map((client) => (
            <div
              onClick={() => handleRemoveClient(client.id)}
              className="client"
            >
              <p>{client.firstName + " " + client.lastName}</p>
              <MiniCloseIcon />
            </div>
          ))}
        </Content>
        <Footer>
          <div className="vipProcent">
            <h6>Индивидуальный статус</h6>
            <CustomToggle onChange={handleChange} />
          </div>
          <Button
            onClick={() =>
              setForm({
                isOpen: true,
                action: 1,
              })
            }
            endIcon={<CoinsIcon />}
            margin={{ mobile: "0 0 20px 0" }}
            buttonStyle={{
              color: "#606EEA",
              bgcolor: "rgba(96, 110, 234, 0.1)",
            }}
          >
            Начислить баллы
          </Button>
          <Button
            onClick={() =>
              setForm({
                isOpen: true,
                action: 2,
              })
            }
            endIcon={<CoinsIcon />}
            margin={{ mobile: "0 0 20px 0" }}
            buttonStyle={{
              color: "#606EEA",
              bgcolor: "rgba(96, 110, 234, 0.1)",
            }}
          >
            Списать баллы
          </Button>
          <button value="true" onClick={handleClick} className="customButton">
            Выбрать всех клиентов
          </button>
          <button value="false" onClick={handleClick} className="customButton">
            Снять выделение
          </button>
        </Footer>
      </Main>
    </Wrapper>
  );
};
