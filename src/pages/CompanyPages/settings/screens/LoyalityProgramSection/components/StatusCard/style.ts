import styled from "styled-components";

export const Container = styled.div`
  background: #f0f1fd;
  border-radius: 12px;
  padding: 15px 20px;
  flex: 1;
  gap: 10px;
`;

export const SubTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  color: #c7c7c7;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const LevelDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const LRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const LText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const LValue = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;
