import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as DeleteSvg } from "newassets/icons/delete.svg";
import { ReactComponent as Plus } from "newassets/icons/plus.svg";
import { ReactComponent as Close } from "newassets/icons/close.svg";

export const CloseIcon = styled(Close)`
  & path {
    fill: #3492ff;
  }
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(96, 110, 234, 0.1);
`;

export const DeleteIcon = styled(DeleteSvg)`
  & path {
    fill: #ff5e68;
  }
  width: 32px;
  height: 34px;
`;
export const LittlePlus = styled(Plus)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(96, 110, 234, 0.1);
`;
export const Container = styled.div`
  padding: 10px 0px;
  display: flex;
  height: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
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
export const ContentGroup = styled.div`
  display: flex;
  justify-content: "flex-start";
  align-items: "center";
`;
export const ContentVariant = styled.div`
  background: #f0f1fd;
  border-radius: 12px;
  max-width: 350px;
  min-width:300px;
  padding: 20px;
  margin: 20px 50px 0px 0px;
  h5 {
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    color: #c7c7c7;
  }
  p {
    margin: 5px 0px;
    color: #223367;
    font-weight: 300;
    font-size: 16px;
  }
  span {
    margin: 5px 0px;
    color: #223367;
    font-weight: 400;
    font-size: 16px;
  }
`;
export const RightSide = styled.div`
  display: flex;
  margin: 10px 20px;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  padding: 20px 40px 40px 40px;
  height: 100%;
  overflow-y: auto;
  overflow-x:hidden;
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
export const LeftSide = styled.div`
  padding: 10px 10px;
  border-right: 3px solid rgba(96, 110, 234, 0.3);
  min-width: 400px;
  height: 100%;
`;
export const GroupToggle = styled.div`
  display: flex;
  padding: 10px 0px;
`;
export const ToggleInfo = styled.div`
  padding: 0px 20px;

  h5 {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #223367;
    text-align: center;
    display: flex;
  }
  p {
    padding: 5px 0px;
    display: flex;
    max-width: 400px;
    justify-content: center;

    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #223367;
  }
`;
export const Form = styled.form`
  display: flex;

  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;

  border-radius: 14px;
`;
export const Title = styled.div`
  padding: 10px 0px;
  h5 {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #223367;
    display: flex;
  }
  p {
    padding: 5px 0px;
    display: flex;
    max-width: 400px;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #223367;
  }
`;
export const TitleForm = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;
export const TitleFormChild = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  height: 100%;
`;
export const TitleInsideFormChild = styled.div`
  padding: 10px 0px;
  display: flex;

  justify-content: baseline;
  align-items: center;
  height: 100%;
`;
export const TitleInsideFormChildMore = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: baseline;
  align-items: center;
  height: 100%;
`;
export const PercentDiv = styled.div`
  padding-right: 10px;
`;
export const IconStyle = styled.div`
  margin: 20px 0px 0px 30px;
  cursor: pointer;
`;
export const LocalyPayment = styled.div`
  padding: 10px 0px;
`;
export const SubmitButton = styled.div`
  padding-top: 25px;
`;
export const MainDynamicGroup = styled.div`
  padding-left: 80px;
  display: flex;
  justify-content: center;
  align-content: "center";
`;
export const DynamicGroup = styled.div`
  display: flex;
  justify-content: center;
  align-content: "center";
`;
export const DynamicLabel = styled.div`
  font-size: 16px;
  color: #a5a5a5;
  padding: 15px 10px 0px 10px;
`;
