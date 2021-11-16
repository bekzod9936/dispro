import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 13px 14px;
  border-radius: 14px;
  background: white;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeadText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;

  color: #223367;
`;
