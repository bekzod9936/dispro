import styled from "styled-components";

export const LargePanel = styled.div`
  padding: 30px 40px;
  border-radius: 14px;
  width: 90%;
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  //width: max-content;
`;
export const SmallPanel = styled.div`
  width: 85%;
  box-sizing: border-box;
  padding: 15px 20px;
  background-color: white;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const SettingsWrapper = styled.div`
  width: 98%;
  height: 97%;
  padding: 15px;
  border-radius: 14px;
  background-color: white;
`;

export const ReferalScroll = styled.div`
  overflow-y: scroll;
  max-height: 60vh;
  padding-bottom: 100px;

  scroll-behavior: auto;

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
`;
