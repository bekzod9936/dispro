import styled from "styled-components";

export const QrDiv = styled.div`
  padding-top: 30px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const UpSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const DownSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const QrRow = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QrText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
`;

export const CodeText = styled.p`
	font-family: Roboto;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 21px;
	margin-top: 27px;
`;
