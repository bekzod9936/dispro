import styled from 'styled-components';
import { ReactComponent as Up } from 'assets/icons/up.svg';

interface Props {
  up?: boolean;
  active?: boolean;
}

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  height: fit-content;
  padding-bottom: 15px;
  width: 100%;
`;

export const MTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
  overflow-x: scroll;

  &:hover {
    ::-webkit-scrollbar-thumb {
      background: #606eea;
    }
  }
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0 0 14px 14px;
  }
`;

export const Thead = styled.thead`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0 0;

  & > tr {
    height: 65px;
  }
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  font-weight: normal;
  font-size: 16px;
  color: ${({ active }: Props) => (active ? '#223367' : '#a5a5a5')}!important;
  border-radius: 14px 14px 0 0;
  :hover {
    color: ${({ active }: Props) => (active ? null : '#3492FF')}!important;
    & > svg {
      & > path {
        fill: ${({ active }: Props) =>
          active ? '#223367' : '#8f8f8f'}!important;
      }
    }
  }
`;

export const Tbody = styled.tbody`
  & > tr:nth-child(odd) {
    background-color: rgba(96, 110, 234, 0.1);
  }

  & > tr:nth-child(even) {
    background-color: white;
  }
  background-color: white;
  & > tr {
    height: 60px;
  }
`;

export const Td = styled.td`
  padding: 15px;
  text-align: center;
  text-transform: capitalize;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const UpIcon = styled(Up)`
  transform: ${({ up }: Props) => (up ? 'rotate(-180deg)' : 'rotate(0)')};
  margin-left: 5px;
  & > path {
    fill: ${({ active }: Props) => (active ? '#223367' : 'transparent')};
  }
`;
