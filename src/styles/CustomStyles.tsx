import { Select } from "@material-ui/core";
import styled from "styled-components";
import {
  ICustomButton,
  ICustomModal,
  IDropdownTitle,
  IFlexiblePanel,
  ISidebarMenuItem,
  IText,
  IUndersectionButton,
} from "../services/Types/Style";
import { device } from "./device";

export const CustomDrawer = styled.div`
  //width: 272px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;

  /* padding-left: 20px; */
  padding-top: 25px;
  padding-bottom: 25px;
  justify-content: space-between;
  box-shadow: 5px 0 20px 0 rgba(0, 0, 0, 0.06);
  position: relative;
`;
export const CustomMenu = styled.div`
  //width: 272px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;
export const SideBarMenuItem = styled.div<ISidebarMenuItem>`
  width: 100%;
  box-sizing: border-box;
  padding-left: ${(props: ISidebarMenuItem) =>
    props?.text === "Dis - count" ? "15px" : "25px"};
  height: 49px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover {
    background-color: rgba(96, 110, 234, 0.1);
  }
`;

export const Text = styled.span<IText>`
  font-size: ${(props: IText) =>
    props.fontSize ? props.fontSize : "16px"} !important;
  font-family: ${(props: IText) =>
    props.fontFamily ? props.fontFamily : "Roboto"};
  margin-right: ${(props: IText) =>
    props.marginRight ? props.marginRight : "0px"};
  color: ${(props: IText) => props.color || "#223367"};
  //position: relative;
  margin-left: ${(props: IText) => (props.marginLeft ? props.marginLeft : "0")};
  margin-bottom: ${(props: IText) =>
    props.marginBottom ? props.marginBottom : "0"};
  font-weight: ${(props: IText) => (props.fontWeight ? props.fontWeight : 700)};

  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
  @media (min-width: ${device.mobile}) {
    font-size: 15px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 25px;
  float: left;
  position: relative;
  height: 80px;
  box-sizing: border-box;
`;

export const CustomSearchInput = styled.input`
  outline: none;
  border: none;
  height: 54px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 35px;
  font-size: 16px;
  background: "#AAAAAA";
  padding-left: 25px;
  padding-right: 25px;
  &::placeholder {
    color: "#888888";
  }
`;

export const CustomSelect = styled(Select)`
  width: 100%;

  .MuiSelect-root {
    margin-left: 15px;
    width: 100%;
  }
  .MuiSelect-select {
    width: 100%;
    height: 50px;
    outline: none;
    border: 1px solid #f0f0f0;
    border-radius: 41px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .MuiSelect-icon {
    margin-right: 10px;
  }
`;
export const DropDownTitle = styled.div`
  height: 45px;
  padding: 10px 15px;
  background: ${(props: IDropdownTitle) =>
    props.index % 2 !== 0 ? "#F0F1FD" : "white"};
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto";
  color: rgb(34, 51, 103);
  width: 400px;
  box-sizing: border-box;
  z-index: 90;
`;
export const UnderSectionButton = styled.div`
  padding: 15px 20px;
  border-radius: 12px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: ${(props: IUndersectionButton) =>
    props.margin || "0px 20px 20px 0px"};
  height: 60px;
  box-sizing: border-box;
  width: content-fit;
  z-index: ${(props: IUndersectionButton) => props.zIndex || 10};
  position: ${(props: IUndersectionButton) =>
    props.zIndex ? "relative" : "static"};
  width: ${(props: IUndersectionButton) => props.width || "100%"};
`;
export const SectionWrapper = styled.div`
  position: relative;
  height: 100%;
  margin-bottom: 100px;

  overflow-x: hidden;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }
  margin-bottom: 100px;
`;
export const MessageContainer = styled.div`
  background: white;
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: start;
  border-radius: 14px;
  overflow: hidden;
  max-height: 100%;
`;

export const CustomInput = styled.input`
  padding: 12px 15px;
  width: 90%;
  align-self: center;
  border-radius: 12px;
  border: 1px solid #c2c2c2;
  box-sizing: border-box;
  outline: none;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 13px;
`;
export const UnderFilter = styled.div`
  height: 80px;
  padding: 20px 15px;
  width: 400px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
export const CustomButton = styled.button`
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: ${(props: ICustomButton) => props.background || "#606EEA"};
  border-radius: 12px;
  box-shadow: ${(props: ICustomButton) =>
    props.background ? "none" : "0px 4px 9px rgba(96, 110, 234, 0.46)"};
`;

export const InlineFilterWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 18px;
  /* position: absolute; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  padding-right: 4px;
`;

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding-left: 35px;
  padding-top: 30px;
  overflow-y: scroll;
`;

export const ClicableOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: 13px 23px;
  border-radius: 12px;
  margin-bottom: 20px;
  &:hover {
    background-color: rgba(96, 110, 234, 0.1);
    cursor: pointer;
  }
`;
export const ModalComponent = styled.div`
  padding: ${(props: ICustomModal) => props.padding || "30px 40px"};
  background: white;
  border-radius: 12px;
  outline: none;
  border: none;
  position: ${(props: ICustomModal) => props.position || "static"};
  display: flex;
  flex-direction: column;
  justify-content: ${(props: ICustomModal) =>
    props.justifyContent || "space-between"};
  height: ${(props: ICustomModal) => props.height || "auto"};
  box-sizing: border-box;
  align-items: flex-start;
  max-width: 500px;
  min-width: 200px;
  position: relative;
`;
export const Panel = styled.div`
  padding: 15px;
  box-sizing: border-box;
  width: 370px;
  height: 190px;
  background-color: white;
  border-radius: 14px;
  margin-right: 15px;
`;

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 0px;
  box-sizing: border-box;
  align-items: center;
  &:hover {
    background-color: rgba(96, 110, 234, 0.1);
  }
`;

export const SectionHead = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  color: #223367;
`;

export const FeedbackPanel = styled.div`
  padding: 16px 20px;
  border-radius: 14px;
  width: 90%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
export const FlexiblePanel = styled.div`
  padding: ${(props: IFlexiblePanel) => props.padding || "20px 30px"};
  width: ${(props: IFlexiblePanel) => props.width || "fit-content"};
  height: ${(props: IFlexiblePanel) => props.height || "fit-content"};
  background: white;
  border-radius: 14px;
  margin-top: 30px;
  boxshadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
`;

export const ChatSpace = styled.div`
  flex-grow: 2.84;
  background: white;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;
export const ChatList = styled.div`
  //flex-grow : 1;
  background: #aab1eb;
  min-height: 100%;
  overflow-y: scroll;
  max-width: 350px;
  border-bottom-left-radius: 14px;
  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
`;
export const ChatItem = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px solid #a3abeb;
  box-sizing: border-box;
  padding: 14px 27px;
`;
export const ChatWrapper = styled.div`
  height: 56%;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    appearance: none;
    display: none;
  }
  &::-webkit-scrollbar-track {
    appearance: none;
    display: none;
  }
`;

export const OptionsList = styled.div`
  height: fit-content;
  background-color: white;
  border-radius: 14px;
  padding: 15px 0px 0px 0px;
  box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12);
  width: 100%;
  &::before {
    content: "";
    display: block;

    background-color: white;
    // box-shadow:  0px 1px 28px rgba(0, 0, 0, 0.12);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;
export const OptionsListItem = styled.div`
  position: static;
  width: 100%;
  padding: 15px 24px;
  box-sizing: border-box;
  //justify-content: flex-start;
  &:hover {
    background-color: rgba(96, 110, 234, 0.1);
  }
`;

export const WholePageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  background: linear-gradient(to bottom, #606eea 50%, #f4f4f4 50%);
`;

export const LeftSide = styled.div`
  width: 50%;
  min-height: 100vh;
  background-color: #606eea;
  border-bottom-right-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const RightSide = styled.div`
  width: 50%;
  min-height: 100vh;
  background-color: #f4f4f4;
  border-top-left-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PageWrapperNoScroll = styled.div`
  padding: 20px 20px 0px 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PageWrapperFlex = styled.div`
  padding: 20px 30px 0 30px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;
