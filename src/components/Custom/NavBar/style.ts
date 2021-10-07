import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { device } from "../../../styles/device";

interface Props {
  listlength?: number;
  margin?: string;
  padding?: string;
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ listlength }: Props) =>
    `repeat(${listlength}, fit-content(100%) )`};
  width: fit-content;
  grid-column-gap: 10px;
  overflow: auto;

  padding: ${({ padding = "0 10px 10px 0" }: Props) => padding};
  margin: ${({ margin }: Props) => margin};
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
  }

  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;

export const Link = styled(NavLink)`
  text-decoration: none;
  color: rgba(34, 51, 103, 1);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  padding: 12px 25px;
  border-radius: 14px;
  width: fit-content;
  min-width: fit-content;
  max-width: fit-content;
  height: fit-content;
  min-height: fit-content;
  max-height: fit-content;
  white-space: nowrap;
  background: transparent;
  justify-self: center;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 12px;
    background: rgba(96, 110, 234, 0.1);
  }
  @media (min-width: ${device.mobile}) {
    :hover {
      background: rgba(96, 110, 234, 0.1);
    }
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;