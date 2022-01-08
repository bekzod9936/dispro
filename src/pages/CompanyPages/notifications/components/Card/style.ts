import styled from "styled-components";
import { device } from "styles/device";

interface Props {
  open?: boolean;
}

export const CardWrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  height: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  &:hover {
    box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.08);
  }
`;

export const CardImg = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 20px;
  background-color: ${({ open }: Props) => (open ? "#eff0fd" : "white")};
  border-radius: 0 0 14px 14px;
  @media (max-width: ${device.mobile}) {
    padding: 10px;
  }
`;

export const TitleCard = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #223367;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Text = styled.p`
  font-weight: normal;
  font-size: 12px;
  color: #223367;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
`;
