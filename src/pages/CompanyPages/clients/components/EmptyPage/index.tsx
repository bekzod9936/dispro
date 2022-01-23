import React from "react";
import { ReactComponent as EmptyPageImg } from "assets/images/clientsStar.svg";
import styled from "styled-components";
import { device } from "styles/device";

const text = {
  1: "Приглашайте к себе в компанию новых клиентов и проводите операции с помощью кассира",
  2: "По вашему запросу ничего не найдено...",
};
interface IProps {
  textId: keyof typeof text;
}

export const EmptyPage = ({ textId }: IProps) => {
  return (
    <Wrapper>
      <EmptyPageImg />
      <TextContent>
        <h4>Клиенты не найдены</h4>
        <p>{text[textId]}</p>
      </TextContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const TextContent = styled.div`
  margin-top: 25px;
  h4 {
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    color: #223367;
    text-align: center;
    margin-bottom: 15px;
  }
  p {
    text-align: center;
    max-width: 485px;
    width: 100%;
    color: #223367;
    font-size: 16px;
    font-weight: 400;
  }
  @media (max-width: ${device.planshet}) {
    p {
      max-width: 348px;
      font-size: 18px;
      line-height: 21px;
    }
  }
`;
