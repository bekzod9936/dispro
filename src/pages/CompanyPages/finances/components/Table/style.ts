import styled from 'styled-components';
import { ReactComponent as Up } from 'assets/icons/up.svg';

interface Props {
  up?: boolean;
  active?: boolean;
}

interface TbProps {
  bgcolor?: string;
  cursorRow?: string;
}

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;

  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  & > div {
    overflow-x: auto;
    padding-bottom: 7px;
    ::-webkit-scrollbar {
      height: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #cfd3f9;
      border-radius: 14px 14px 0 0;
    }
  }
`;

export const MTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;

interface Props {
  header2?: boolean;
}

export const Thead = styled.thead`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0 0;
  & > tr:last-child {
    border-top: ${({ header2 }: Props) =>
      header2 ? '1px solid rgba(96, 110, 234, 0.3)' : null};
    & > th:first-child {
      border-right: ${({ header2 }: Props) =>
        header2 ? '1px solid rgba(96, 110, 234, 0.3)' : null};
    }
  }
  & > tr {
    height: 65px;
  }
`;

export const Tr = styled.tr`
  background-color: ${({ bgcolor }: TbProps) => (bgcolor ? bgcolor : 'white')};
  cursor: ${({ cursorRow }: TbProps) => (cursorRow ? cursorRow : 'default')};
`;

export const Th = styled.th`
  padding: 0 10px;
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
