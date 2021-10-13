import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrap = styled.div`
  overflow-y: auto;
  padding-right: 25px;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
    height: 150px; //for vertical scrollbar
  }
  ::-webkit-scrollbar-button {
    height: 150px; //for vertical scrollbar
  }
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;
