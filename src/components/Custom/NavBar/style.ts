import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { device } from '../../../styles/device';

interface Props {
  listlength?: number;
  margin?: string;
  padding?: string;
  vertical?: boolean;
}

export const Container = styled.div`
  display: grid;
  @media (min-width: ${device.planshet}) {
    grid-template-rows: ${({ vertical, listlength }: Props) =>
    vertical ? `repeat(${listlength}), fit-content(100%)` : ''};
  }
  @media (max-width: ${device.planshet}) {
    grid-template-columns: ${({ listlength, vertical }: Props) =>
    `repeat(${listlength}, fit-content(100%) )`};
    grid-column-gap: 15px;
  }
  @media (max-width: ${device.mobile}) {
    grid-column-gap: 10px;
  }

  grid-template-columns: ${({ listlength, vertical }: Props) =>
    !vertical && `repeat(${listlength}, fit-content(100%) )`};
  width: 100%;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  overflow: auto;
  overflow-y: scroll;

  padding: ${({ padding = '0 10px 10px 0' }: Props) => padding};
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
  scrollbar-width: none;
  overflow-y: hidden;
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
  margin: 0 0 10px;
  @media (max-width: ${device.planshet}) {
    background: rgba(96, 110, 234, 0.1);
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 12px;
    background: rgba(96, 110, 234, 0.1);
  }
  @media (min-width: ${device.mobile}) {
    :hover {
      background: rgba(96, 110, 234, 0.1);
    }
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 18px;
    padding: 13px 20px;
    line-height: 117%;
  }
`;
