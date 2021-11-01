import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const ContentHead = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  padding: 21px 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const ContentBody = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 21px 35px;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

export const HeadText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  color: #a5a5a5;
`;

export const BallText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #606eea;
`;

export const SecondText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const ActDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding-bottom: 5px;
  margin-left: 15px;
`;

export const FormCol = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
`;
