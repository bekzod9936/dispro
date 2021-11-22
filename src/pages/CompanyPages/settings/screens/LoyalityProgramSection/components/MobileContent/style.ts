import styled from "styled-components";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/deleteword.svg";

export const Container = styled.div`
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  padding: 15px 25px;
`;

interface IRow {
  aItems?:
    | "space-between"
    | "center"
    | "space-around"
    | "flex-start"
    | "flex-end";
}

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: ${({ aItems }: IRow) => aItems};
  width: 100%;
`;
export const Col = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #223367;
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #223367;
`;

export const EText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ff5e68;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  background-color: #fff;
`;

export const Body = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Htext = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  margin-top: 20px;
`;

interface IModal {
  gap?: number;
}

export const ModalContent = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: ${({ gap = 20 }: IModal) => gap + "px"};
  padding: 20px 15px;
`;

interface IContent {
  jContent?: "flex-start" | "flex-end" | "center";
  aContent?: "flex-start" | "flex-end" | "center";
  direction?: "row" | "column";
}

export const MRow = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  flex-direction: ${({ direction = "row" }: IContent) => direction};
  justify-content: ${({ jContent }: IContent) => jContent};
  align-items: ${({ aContent }: IContent) => aContent};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const SubText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.5px;
  color: #c7c7c7;
`;

export const LabelLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0;
`;

export const RightLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: #ff5e68;
  }
`;

interface IText {
  disabled?: boolean;
}

export const MainText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: ${({ disabled }: IText) => (disabled ? "bold" : 300)};
  font-size: 14px;
  line-height: 16px;
  color: ${({ disabled = false }: IText) => (disabled ? "#c7c7c7" : "#3492ff")};
`;
