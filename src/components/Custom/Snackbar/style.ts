import styled from "styled-components";

export const AlertDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

export const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 17px;
  height: 17px;
  border-radius: 30px;
  background-color: rgba(96, 110, 234, 0.1);
  margin-bottom: 3px;
`;

export const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  color: #223367;
  white-space: nowrap;
  color: white;
`;
