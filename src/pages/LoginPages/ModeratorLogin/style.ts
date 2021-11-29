import styled from "styled-components";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Box = styled.div`
  border: none;
  width: 35%;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 14px;
  background-color: #fff;
  padding: 15px 25px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.h2`
  color: #223367;
  font-size: 18px;
  text-align: center;
`;
